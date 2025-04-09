const fs = require('fs');
const path = require('path');

// Configuration
const srcDir = './src';
const fileExtensions = ['.tsx', '.jsx'];

// Find all files recursively
function findFiles(dir, extensions) {
  let results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results = results.concat(findFiles(filePath, extensions));
    } else if (extensions.includes(path.extname(file))) {
      results.push(filePath);
    }
  }
  
  return results;
}

// Fix BarChart component usage
function fixBarChart(content) {
  // Fix BarChart with incorrect data structure
  let newContent = content.replace(
    /<BarChart\s+data=\{([^}]+)\}\s+xField="([^"]+)"\s+yField="([^"]+)"/g,
    (match, data, xField, yField) => {
      // Try to parse the data to convert it to the correct format
      try {
        // This is a simplified approach - in a real scenario, you'd need more robust parsing
        const dataMatch = data.match(/\[(.*?)\]/);
        if (dataMatch) {
          const items = dataMatch[1].split('},').map(item => item.trim());
          const labels = [];
          const values = [];
          
          items.forEach(item => {
            const nameMatch = item.match(/name:\s*"([^"]+)"/);
            const valueMatch = item.match(/value:\s*(\d+)/);
            
            if (nameMatch && valueMatch) {
              labels.push(nameMatch[1]);
              values.push(parseInt(valueMatch[1], 10));
            }
          });
          
          return `<BarChart
  data={{
    labels: ${JSON.stringify(labels)},
    datasets: [
      {
        label: "Value",
        data: ${JSON.stringify(values)},
        backgroundColor: "rgba(59, 130, 246, 0.8)"
      }
    ]
  }}
  options={{
    responsive: true,
    maintainAspectRatio: false
  }}`;
        }
      } catch (e) {
        console.error('Error parsing BarChart data:', e);
      }
      
      return match;
    }
  );
  
  return newContent;
}

// Fix LineChart component usage
function fixLineChart(content) {
  // Fix LineChart with incorrect data structure
  let newContent = content.replace(
    /<LineChart\s+data=\{([^}]+)\}\s+xField="([^"]+)"\s+yField="([^"]+)"/g,
    (match, data, xField, yField) => {
      // Try to parse the data to convert it to the correct format
      try {
        // This is a simplified approach - in a real scenario, you'd need more robust parsing
        const dataMatch = data.match(/\[(.*?)\]/);
        if (dataMatch) {
          const items = dataMatch[1].split('},').map(item => item.trim());
          const formattedData = items.map(item => {
            const nameMatch = item.match(/name:\s*"([^"]+)"/);
            const valueMatch = item.match(/value:\s*(\d+)/);
            
            if (nameMatch && valueMatch) {
              return `{ x: "${nameMatch[1]}", y: ${parseInt(valueMatch[1], 10)} }`;
            }
            return null;
          }).filter(Boolean);
          
          return `<LineChart
  data={${formattedData.join(',\n  ')}}
  xField="x"
  yField="y"`;
        }
      } catch (e) {
        console.error('Error parsing LineChart data:', e);
      }
      
      return match;
    }
  );
  
  return newContent;
}

// Process a file
function processFile(filePath) {
  console.log(`Processing ${filePath}...`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    // Apply fixes
    content = fixBarChart(content);
    content = fixLineChart(content);
    
    // Write back if changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  Fixed ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return false;
  }
}

// Main function
function main() {
  console.log('Finding files...');
  const files = findFiles(srcDir, fileExtensions);
  console.log(`Found ${files.length} files to process.`);
  
  let fixedCount = 0;
  
  for (const file of files) {
    if (processFile(file)) {
      fixedCount++;
    }
  }
  
  console.log(`Fixed ${fixedCount} files.`);
}

// Export the functions
module.exports = {
  main,
  findFiles,
  fixBarChart,
  fixLineChart,
  processFile
};

// Only run main if this is the main module
if (require.main === module) {
  main();
} 