function returnNumbers(string) {
    /**
     * Extract all numbers from a string using regular expressions.
     * 
     * @param {string} string - Input string containing numbers and other characters
     * @returns {string} Concatenated string of all numbers found in the input
     */
    
    // Use regex to find all digits in the string
    const numbers = string.match(/\d/g);
    
    // Join all found digits into a single string, or return empty string if no digits found
    return numbers ? numbers.join('') : '';
}

// Test the function with the provided example
console.log(`returnNumbers('k5k3q2g5z6x9bn') = ${returnNumbers('k5k3q2g5z6x9bn')}`);

// Additional test cases
const testCases = [
    'abc123def456',
    'no_numbers_here',
    '1a2b3c4d5e',
    '987654321',
    'mixed123text456with789numbers'
];

console.log('\nAdditional test cases:');
testCases.forEach(test => {
    const result = returnNumbers(test);
    console.log(`returnNumbers('${test}') = ${result}`);
});

// Export the function for use in other modules
module.exports = returnNumbers;
