// Exercise 5: Regular Expression #1
// Use the regular expression module to extract numbers from a string

console.log("Exercise 5: Regular Expression #1 - Extract Numbers from String");
console.log("=" .repeat(70));

/**
 * Function to extract numbers from a string using regular expressions
 * @param {string} str - The input string containing mixed characters
 * @returns {string} - A string containing only the extracted numbers
 */
function returnNumbers(str) {
    // Use regular expression to match only digits (0-9)
    // The global flag 'g' ensures we find all digits, not just the first one
    const numbers = str.match(/\d/g);
    
    // If no numbers found, return empty string
    if (!numbers) {
        return '';
    }
    
    // Join all found digits into a single string
    return numbers.join('');
}

// Test the function with the example
console.log("Testing returnNumbers function:");
console.log("-" .repeat(40));

const testString = 'k5k3q2g5z6x9bn';
const result = returnNumbers(testString);

console.log(`Input string: "${testString}"`);
console.log(`Extracted numbers: "${result}"`);
console.log(`Expected output: "532569"`);
console.log(`Test ${result === '532569' ? 'PASSED' : 'FAILED'} ✓`);

// Additional test cases to demonstrate the function
console.log("\nAdditional Test Cases:");
console.log("-" .repeat(40));

const testCases = [
    'abc123def456',
    'hello987world',
    'no-numbers-here',
    '0a1b2c3d4e5f',
    '9x8y7z6w5v4u3t2s1r',
    'mixed123text456with789numbers'
];

testCases.forEach((testCase, index) => {
    const extracted = returnNumbers(testCase);
    console.log(`Test ${index + 1}: "${testCase}" → "${extracted}"`);
});

// Demonstration of different regex approaches
console.log("\nDifferent Regular Expression Approaches:");
console.log("-" .repeat(40));

const demoString = 'a1b2c3d4e5f6g7h8i9j0';

// Approach 1: Using match() with global flag
console.log("Approach 1 - Using match() with global flag:");
const approach1 = demoString.match(/\d/g);
console.log(`Result: ${approach1 ? approach1.join('') : 'No numbers found'}`);

// Approach 2: Using replace() to remove non-digits
console.log("Approach 2 - Using replace() to remove non-digits:");
const approach2 = demoString.replace(/\D/g, '');
console.log(`Result: ${approach2}`);

// Approach 3: Using split() and filter()
console.log("Approach 3 - Using split() and filter():");
const approach3 = demoString.split('').filter(char => /\d/.test(char)).join('');
console.log(`Result: ${approach3}`);

// Performance comparison
console.log("\nPerformance Comparison:");
console.log("-" .repeat(40));

const largeString = 'a'.repeat(1000) + '1'.repeat(1000) + 'b'.repeat(1000);

console.time('Match approach');
const matchResult = largeString.match(/\d/g)?.join('') || '';
console.timeEnd('Match approach');

console.time('Replace approach');
const replaceResult = largeString.replace(/\D/g, '');
console.timeEnd('Replace approach');

console.log(`Match approach result length: ${matchResult.length}`);
console.log(`Replace approach result length: ${replaceResult.length}`);

// Interactive demonstration
console.log("\nInteractive Demonstration:");
console.log("-" .repeat(40));

// Simulate user input scenarios
const userInputs = [
    'My phone number is 555-123-4567',
    'The year 2024 has 366 days',
    'Price: $19.99, Tax: $2.50',
    'Coordinates: 40.7128°N, 74.0060°W',
    'Version 1.2.3-beta.4'
];

userInputs.forEach((input, index) => {
    const numbers = returnNumbers(input);
    console.log(`${index + 1}. Input: "${input}"`);
    console.log(`   Numbers: "${numbers}"`);
    console.log();
});

// Error handling demonstration
console.log("Error Handling:");
console.log("-" .repeat(40));

try {
    // Test with null/undefined
    console.log(`returnNumbers(null): "${returnNumbers(null)}"`);
    console.log(`returnNumbers(undefined): "${returnNumbers(undefined)}"`);
    
    // Test with empty string
    console.log(`returnNumbers(''): "${returnNumbers('')}"`);
    
    // Test with numbers only
    console.log(`returnNumbers('12345'): "${returnNumbers('12345')}"`);
    
} catch (error) {
    console.error(`Error: ${error.message}`);
}

console.log("\n🎉 Exercise 5 completed successfully!");
console.log("Regular expressions are powerful tools for pattern matching!");
console.log("=" .repeat(70));