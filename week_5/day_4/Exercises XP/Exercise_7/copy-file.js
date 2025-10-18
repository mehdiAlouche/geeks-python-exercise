// Exercise 7: Reading and Copying Files
// This script reads content from source.txt and writes it to destination.txt

const fs = require('fs');
const path = require('path');

console.log("Exercise 7: Reading and Copying Files");
console.log("=" .repeat(50));

// Define file paths
const sourceFile = 'source.txt';
const destinationFile = 'destination.txt';

try {
    console.log(`Reading content from: ${sourceFile}`);
    
    // Read the content from source.txt
    const fileContent = fs.readFileSync(sourceFile, 'utf8');
    
    console.log("File content read successfully!");
    console.log(`Content length: ${fileContent.length} characters`);
    
    // Display a preview of the content
    const preview = fileContent.substring(0, 100) + (fileContent.length > 100 ? '...' : '');
    console.log(`Content preview: "${preview}"`);
    
    console.log(`\nWriting content to: ${destinationFile}`);
    
    // Write the content to destination.txt
    fs.writeFileSync(destinationFile, fileContent, 'utf8');
    
    console.log("File copied successfully!");
    
    // Verify the copy by reading the destination file
    console.log("\nVerifying the copy...");
    const copiedContent = fs.readFileSync(destinationFile, 'utf8');
    
    if (fileContent === copiedContent) {
        console.log("SUCCESS: Content matches perfectly!");
        console.log(`Copied file size: ${copiedContent.length} characters`);
    } else {
        console.log("ERROR: Content does not match!");
    }
    
    // Get file information
    const sourceStats = fs.statSync(sourceFile);
    const destStats = fs.statSync(destinationFile);
    
    console.log("\nFile Information:");
    console.log(`Source file created: ${sourceStats.birthtime}`);
    console.log(`Destination file created: ${destStats.birthtime}`);
    console.log(`Source file size: ${sourceStats.size} bytes`);
    console.log(`Destination file size: ${destStats.size} bytes`);
    
} catch (error) {
    console.error("Error occurred during file operations:");
    console.error(`Error type: ${error.name}`);
    console.error(`Error message: ${error.message}`);
    
    if (error.code === 'ENOENT') {
        console.error(`\nTroubleshooting:`);
        console.error(`- Make sure ${sourceFile} exists in the current directory`);
        console.error(`- Check that you're running the script from the correct directory`);
    }
    
    process.exit(1);
}

console.log("\nFile copy operation completed successfully!");
console.log("=" .repeat(50));
