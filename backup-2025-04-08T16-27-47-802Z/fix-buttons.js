const fs = require('fs');
const path = require('path');

function findFiles(dir, pattern) {
  let results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results = results.concat(findFiles(filePath, pattern));
    } else if (pattern.test(file)) {
      results.push(filePath);
    }
  }
  
  return results;
}

function fixButton(content) {
  // Fix buttons with icon spans that have an extra > character
  let newContent = content.replace(
    /<Button\s+variant="([^"]+)"\s+size="([^"]+)"\s*><span className="flex items-center"><([^>]+)Icon[^>]*><\/span>\s*([^>]*)\s*>/g,
    '<Button variant="$1" size="$2">\n            <span className="flex items-center">\n              <$3Icon className="h-4 w-4" />\n            </span>\n            $4\n          </Button>'
  );

  // Fix buttons with iconPosition prop
  newContent = newContent.replace(
    /<Button\s+variant="([^"]+)"\s+size="([^"]+)"\s*><span className="flex items-center"><([^>]+)Icon[^>]*><\/span>\s*iconPosition="([^"]+)"\s*>/g,
    '<Button variant="$1" size="$2" iconPosition="$4">\n            <span className="flex items-center">\n              <$3Icon className="h-4 w-4" />\n            </span>'
  );

  return newContent;
}

// Find all TypeScript/TSX files
const files = findFiles('./src', /\.(tsx|ts)$/);

// Process each file
files.forEach(file => {
  console.log(`Processing ${file}...`);
  let content = fs.readFileSync(file, 'utf8');
  const originalContent = content;
  
  content = fixButton(content);
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log(`Fixed buttons in ${file}`);
  }
}); 