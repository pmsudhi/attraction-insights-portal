const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Fix CardHeader component usage
function fixCardHeader(content) {
  // Fix CardHeader with title and subtitle props
  let newContent = content.replace(
    /<CardHeader\s+title="([^"]+)"\s+subtitle="([^"]+)"\s*\/>/g,
    '<CardHeader>\n        <CardTitle>$1</CardTitle>\n        <CardDescription>$2</CardDescription>\n      </CardHeader>'
  );
  
  // Fix CardHeader with title, subtitle, and action props
  newContent = newContent.replace(
    /<CardHeader\s+title="([^"]+)"\s+subtitle="([^"]+)"\s+action=\{([^}]+)\}\s*\/>/g,
    '<CardHeader>\n        <CardTitle>$1</CardTitle>\n        <CardDescription>$2</CardDescription>\n        <div className="mt-4">$3</div>\n      </CardHeader>'
  );
  
  // Add imports if needed
  if (newContent !== content && !newContent.includes('import { Card, CardContent, CardHeader, CardTitle, CardDescription }')) {
    newContent = newContent.replace(
      /import { Card, CardContent, CardHeader }/g,
      'import { Card, CardContent, CardHeader, CardTitle, CardDescription }'
    );
  }
  
  return newContent;
}

// Fix Badge component usage
function fixBadge(content) {
  // Fix Badge with primary variant
  let newContent = content.replace(
    /<Badge\s+variant="primary"/g,
    '<Badge variant="default"'
  );
  
  // Fix Badge with success variant
  newContent = newContent.replace(
    /<Badge\s+variant="success"/g,
    '<Badge variant="default"'
  );
  
  // Fix Badge with danger variant
  newContent = newContent.replace(
    /<Badge\s+variant="danger"/g,
    '<Badge variant="destructive"'
  );
  
  // Fix Badge with warning variant
  newContent = newContent.replace(
    /<Badge\s+variant="warning"/g,
    '<Badge variant="secondary"'
  );
  
  // Remove size prop from Badge
  newContent = newContent.replace(
    /<Badge\s+variant="([^"]+)"\s+size="([^"]+)"/g,
    '<Badge variant="$1"'
  );
  
  return newContent;
}

// Fix Button component usage
function fixButton(content) {
  // Fix Button with primary variant
  let newContent = content.replace(
    /<Button\s+variant="primary"/g,
    '<Button variant="default"'
  );
  
  // Fix Button with icon prop
  newContent = newContent.replace(
    /<Button\s+variant="([^"]+)"\s+size="([^"]+)"\s+icon=\{([^}]+)\}/g,
    '<Button variant="$1" size="$2"><span className="flex items-center">$3</span>'
  );
  
  // Fix Button with icon and iconPosition props
  newContent = newContent.replace(
    /<Button\s+variant="([^"]+)"\s+size="([^"]+)"\s+icon=\{([^}]+)\}\s+iconPosition="([^"]+)"/g,
    '<Button variant="$1" size="$2"><span className="flex items-center">$3</span>'
  );
  
  // Fix Button with xs size
  newContent = newContent.replace(
    /<Button\s+variant="([^"]+)"\s+size="xs"/g,
    '<Button variant="$1" size="sm"'
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
    content = fixCardHeader(content);
    content = fixBadge(content);
    content = fixButton(content);
    
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
  fixCardHeader,
  fixBadge,
  fixButton,
  processFile
};

// Only run main if this is the main module
if (require.main === module) {
  main();
} 