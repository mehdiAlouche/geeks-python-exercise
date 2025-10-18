// Import the fs module for file operations
const fs = require('fs');

// Function to read content from a specified file
function readFile(filePath) {
    try {
        // Read file synchronously and return the content
        const content = fs.readFileSync(filePath, 'utf8');
        console.log(`Successfully read file: ${filePath}`);
        return content;
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return null;
    }
}

// Function to write content to a specified file
function writeFile(filePath, content) {
    try {
        // Write content to file synchronously
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully wrote to file: ${filePath}`);
        console.log(`Content written: "${content}"`);
        return true;
    } catch (error) {
        console.error(`Error writing to file ${filePath}:`, error.message);
        return false;
    }
}

// Export functions using CommonJS syntax
module.exports = {
    readFile,
    writeFile
};
