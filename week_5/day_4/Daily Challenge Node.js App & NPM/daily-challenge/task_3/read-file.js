// read-file.js - Module for reading file contents

// Require the fs (File System) module
const fs = require('fs');
const path = require('path');

/**
 * Read and display the content from file-data.txt
 */
function readFileContent() {
    try {
        // Construct the path to the file
        const filePath = path.join(__dirname, 'files', 'file-data.txt');
        
        // Read the file content synchronously
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Display the content
        console.log('\n' + '='.repeat(60));
        console.log('📄 File Content from file-data.txt:');
        console.log('='.repeat(60));
        console.log(content);
        console.log('='.repeat(60) + '\n');
        
        return content;
    } catch (error) {
        console.error('Error reading file:', error.message);
        return null;
    }
}

// Export the function
module.exports = readFileContent;

