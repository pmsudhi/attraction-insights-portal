const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Import the functions from the other scripts
const { main: fixComponents } = require('./fix-components.js');
const { main: fixCharts } = require('./fix-charts.js');

console.log('=== Starting Component and Chart Fix Script ===');

// Create a backup directory instead of a Git branch
const backupDir = 'backup-' + new Date().toISOString().replace(/[:.]/g, '-');
try {
  console.log('Creating backup directory...');
  fs.mkdirSync(backupDir);
  
  // Copy all .tsx and .jsx files to the backup directory
  const files = fs.readdirSync('src');
  files.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      const content = fs.readFileSync(path.join('src', file));
      fs.writeFileSync(path.join(backupDir, file), content);
    }
  });
  
  console.log(`Backup created in directory: ${backupDir}`);
} catch (error) {
  console.error('Error creating backup:', error.message);
  console.log('Continuing without backup...');
}

// Run the component fix script
console.log('\n=== Running Component Fix Script ===');
fixComponents();

// Run the chart fix script
console.log('\n=== Running Chart Fix Script ===');
fixCharts();

console.log('\n=== All Fixes Completed ===');
console.log('Please review the changes and run your linter to check for any remaining errors.');
console.log('Then test the application to ensure everything works as expected.'); 