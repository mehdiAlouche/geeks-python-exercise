
// For Node.js environment, we'll use readline to get user input
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function createWordFrame() {
    rl.question('Enter words separated by commas: ', (input) => {        const words = input.split(',').map(word => word.trim());
        
        const maxLength = Math.max(...words.map(word => word.length));
        
        console.log('\nWord Frame:');
        console.log('*'.repeat(maxLength + 4)); // Top border
        
        words.forEach(word => {
            const spaces = ' '.repeat(maxLength - word.length);
            console.log(`* ${word}${spaces} *`);
        });
        
        console.log('*'.repeat(maxLength + 4)); // Bottom border
        
        rl.close();
    });
}

// Alternative version for browser environment (commented out)
function createWordFrameBrowser() {
    const input = prompt('Enter words separated by commas: ');
    
    if (input) {
        // Split the input by commas and trim whitespace
        const words = input.split(',').map(word => word.trim());
        
        // Find the length of the longest word
        const maxLength = Math.max(...words.map(word => word.length));
        
        // Create the frame
        console.log('\nWord Frame:');
        console.log('*'.repeat(maxLength + 4)); // Top border
        
        // Print each word with proper spacing
        words.forEach(word => {
            const spaces = ' '.repeat(maxLength - word.length);
            console.log(`* ${word}${spaces} *`);
        });
        
        console.log('*'.repeat(maxLength + 4)); // Bottom border
    }
}

// Test with the example from the instructions
function testWithExample() {
    console.log('Testing with example: "Hello, World, in, a, frame"');
    const testWords = ["Hello", "World", "in", "a", "frame"];
    
    // Find the length of the longest word
    const maxLength = Math.max(...testWords.map(word => word.length));
    
    // Create the frame
    console.log('\nWord Frame:');
    console.log('*'.repeat(maxLength + 4)); // Top border
    
    // Print each word with proper spacing
    testWords.forEach(word => {
        const spaces = ' '.repeat(maxLength - word.length);
        console.log(`* ${word}${spaces} *`);
    });
    
    console.log('*'.repeat(maxLength + 4)); // Bottom border
}

// Run the test first
testWithExample();

console.log('\n' + '='.repeat(50));
console.log('Now you can enter your own words:');

// Start the interactive program
createWordFrame();
