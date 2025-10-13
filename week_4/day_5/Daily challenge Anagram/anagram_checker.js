/**
 * Check if two strings are anagrams of each other.
 * 
 * @param {string} str1 - First string to compare
 * @param {string} str2 - Second string to compare
 * @returns {boolean} True if strings are anagrams, False otherwise
 * 
 * An anagram is a word or phrase formed by rearranging letters of another word or phrase.
 * This function ignores case and whitespace when comparing.
 */
function isAnagram(str1, str2) {
    // Trim whitespace and convert to lowercase for comparison
    const str1Clean = str1.replace(/\s/g, '').toLowerCase();
    const str2Clean = str2.replace(/\s/g, '').toLowerCase();
    
    // Check if lengths are the same after cleaning
    if (str1Clean.length !== str2Clean.length) {
        return false;
    }
    
    // Sort characters and compare
    return str1Clean.split('').sort().join('') === str2Clean.split('').sort().join('');
}

/**
 * Test the anagram function with various examples.
 */
function testAnagramFunction() {
    // Test cases from the challenge
    const testCases = [
        ["Astronomer", "Moon starer", true],
        ["School master", "The classroom", true],
        ["The Morse Code", "Here come dots", true],
        ["hello", "world", false],
        ["listen", "silent", true],
        ["debit card", "bad credit", true],
        ["eleven plus two", "twelve plus one", true],
        ["", "", true], // Edge case: empty strings
        ["a", "a", true], // Edge case: single character
        ["a", "b", false], // Edge case: different single characters
        ["Hello", "hello", true], // Case insensitive
        ["  hello  ", "world", false], // Whitespace handling
        ["hello world", "world hello", true], // Different word order
    ];
    
    console.log("Testing Anagram Function");
    console.log("=".repeat(50));
    
    let passed = 0;
    const total = testCases.length;
    
    testCases.forEach(([str1, str2, expected]) => {
        const result = isAnagram(str1, str2);
        const status = result === expected ? "✓ PASS" : "✗ FAIL";
        
        console.log(`${status} | '${str1}' <-> '${str2}' | Expected: ${expected}, Got: ${result}`);
        
        if (result === expected) {
            passed++;
        }
    });
    
    console.log("=".repeat(50));
    console.log(`Results: ${passed}/${total} tests passed`);
    
    if (passed === total) {
        console.log(" All tests passed!");
    } else {
        console.log(" Some tests failed!");
    }
}

// Run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
    testAnagramFunction();
} else if (typeof window !== 'undefined') {
    // If running in browser, expose functions globally
    window.isAnagram = isAnagram;
    window.testAnagramFunction = testAnagramFunction;
}

// Export for Node.js modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isAnagram, testAnagramFunction };
}
