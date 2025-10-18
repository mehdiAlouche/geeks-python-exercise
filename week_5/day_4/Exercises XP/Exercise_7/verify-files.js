// Verification script to test file operations
const fs = require('fs');
const path = require('path');

console.log("File Explorer Verification");
console.log("=" .repeat(40));

// Check if source.txt exists
console.log("Checking source.txt...");
if (fs.existsSync('source.txt')) {
    console.log("✓ source.txt exists");
    const content = fs.readFileSync('source.txt', 'utf8');
    console.log(`  Content length: ${content.length} characters`);
} else {
    console.log("✗ source.txt not found");
}

// Check if destination.txt exists (after running copy-file.js)
console.log("\nChecking destination.txt...");
if (fs.existsSync('destination.txt')) {
    console.log("✓ destination.txt exists");
    const content = fs.readFileSync('destination.txt', 'utf8');
    console.log(`  Content length: ${content.length} characters`);
} else {
    console.log("✗ destination.txt not found (run copy-file.js first)");
}

// List directory contents
console.log("\nDirectory contents:");
try {
    const files = fs.readdirSync('.');
    files.forEach(file => {
        const stats = fs.statSync(file);
        const type = stats.isDirectory() ? '[DIR]' : '[FILE]';
        const size = stats.isFile() ? ` (${stats.size} bytes)` : '';
        console.log(`  ${type} ${file}${size}`);
    });
} catch (error) {
    console.log(`Error reading directory: ${error.message}`);
}

console.log("\nVerification complete!");
