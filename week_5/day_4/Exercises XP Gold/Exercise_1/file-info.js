const path = require('path');
const fs = require('fs');

function getFileInfo() {
    // Use path.join to create a file path to the example.txt file within the data directory
    const filePath = path.join(__dirname, 'data', 'example.txt');
    
    // Use fs.existsSync to check if the file exists
    const fileExists = fs.existsSync(filePath);
    
    console.log('File path:', filePath);
    console.log('File exists:', fileExists);
    
    if (fileExists) {
        // Use fs.statSync to get information about the file
        const stats = fs.statSync(filePath);
        
        console.log('File size:', stats.size, 'bytes');
        console.log('Creation time:', stats.birthtime);
        console.log('Last modified:', stats.mtime);
    } else {
        console.log('File does not exist!');
    }
}

module.exports = { getFileInfo };
