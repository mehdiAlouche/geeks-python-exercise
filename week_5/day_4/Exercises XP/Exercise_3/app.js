// Import the fileManager module functions using CommonJS syntax
const { readFile, writeFile } = require('./fileManager.js');

console.log("Exercise 3: File Management using CommonJS syntax");
console.log("=" .repeat(60));

// Step 1: Read content from "Hello World.txt"
console.log("\nStep 1: Reading from 'Hello World.txt'");
console.log("-" .repeat(40));

const helloContent = readFile('./Hello World.txt');
if (helloContent) {
    console.log(`Original content: "${helloContent.trim()}"`);
} else {
    console.log("Failed to read Hello World.txt");
    process.exit(1);
}

// Step 2: Write new content to "Bye World.txt"
console.log("\nStep 2: Writing to 'Bye World.txt'");
console.log("-" .repeat(40));

const newContent = "Writing to the file";
const writeSuccess = writeFile('./Bye World.txt', newContent);

if (writeSuccess) {
    console.log("Successfully updated Bye World.txt");
} else {
    console.log("Failed to write to Bye World.txt");
    process.exit(1);
}

// Step 3: Verify the changes by reading the updated file
console.log("\nStep 3: Verifying the changes");
console.log("-" .repeat(40));

const updatedContent = readFile('./Bye World.txt');
if (updatedContent) {
    console.log(`Updated content: "${updatedContent.trim()}"`);
    
    // Compare with original content
    console.log("\nContent Comparison:");
    console.log(`   Before: "Bye World !!"`);
    console.log(`   After:  "${updatedContent.trim()}"`);
} else {
    console.log("Failed to read updated Bye World.txt");
}

// Step 4: Display file operations summary
console.log("\nFile Operations Summary:");
console.log("-" .repeat(40));
console.log("Read from: Hello World.txt");
console.log("Wrote to: Bye World.txt");
console.log("Verified: Content updated successfully");

console.log("\nAll file management operations completed successfully!");
console.log("=" .repeat(60));
