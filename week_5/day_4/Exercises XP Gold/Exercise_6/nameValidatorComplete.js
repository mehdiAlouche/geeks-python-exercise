const readline = require('readline');

// Regular expression pattern for name validation
// ^[A-Z][a-z]+ [A-Z][a-z]+$
// ^ - start of string
// [A-Z] - first letter must be uppercase
// [a-z]+ - followed by one or more lowercase letters
//  - exactly one space
// [A-Z] - second name starts with uppercase
// [a-z]+ - followed by one or more lowercase letters
// $ - end of string
const namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

function validateName(fullName) {
    // Check if the name matches the pattern
    if (namePattern.test(fullName)) {
        return {
            isValid: true,
            message: "✓ Valid name format!"
        };
    } else {
        let errors = [];
        
        // Check for non-letter characters
        if (!/^[A-Za-z ]+$/.test(fullName)) {
            errors.push("Name should contain only letters and spaces");
        }
        
        // Check for proper space count
        const spaceCount = (fullName.match(/ /g) || []).length;
        if (spaceCount !== 1) {
            errors.push("Name should contain exactly one space");
        }
        
        // Check for proper capitalization
        const words = fullName.split(' ');
        if (words.length === 2) {
            if (!/^[A-Z]/.test(words[0]) || !/^[A-Z]/.test(words[1])) {
                errors.push("First letter of each name should be uppercase");
            }
            if (!/^[A-Z][a-z]+$/.test(words[0]) || !/^[A-Z][a-z]+$/.test(words[1])) {
                errors.push("Each name should start with uppercase followed by lowercase letters");
            }
        }
        
        return {
            isValid: false,
            message: "✗ Invalid name format: " + errors.join(", ")
        };
    }
}

// Interactive mode functions
function createReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

function askForName(rl) {
    rl.question('Please enter your full name (e.g., "Mehdi Idouallocuhe"): ', (input) => {
        const trimmedInput = input.trim();
        
        if (trimmedInput === '') {
            console.log('Please enter a valid name.');
            askForName(rl);
            return;
        }
        
        const result = validateName(trimmedInput);
        console.log(result.message);
        
        if (result.isValid) {
            console.log(`Welcome, ${trimmedInput}!`);
            rl.close();
        } else {
            console.log('\nPlease try again with a valid format.');
            askForName(rl);
        }
    });
}

function runInteractiveMode() {
    console.log('=== Interactive Name Validator ===');
    console.log('Rules:');
    console.log('1. Name should contain only letters');
    console.log('2. Name should contain exactly one space');
    console.log('3. First letter of each name should be uppercase');
    console.log('4. Each name should have at least one letter after the first uppercase letter');
    console.log('');
    
    const rl = createReadlineInterface();
    askForName(rl);
}

// Test mode functions
function runTestMode() {
    // Test cases
    const testCases = [
        "Mehdi Idouallocuhe",      // Valid
        "jane smith",    // Invalid: lowercase first letters
        "JANE SMITH",    // Invalid: all uppercase
        "MehdiIdouallocuhe",       // Invalid: no space
        "Mehdi  Idouallocuhe",     // Invalid: two spaces
        "Mehdi A Idouallocuhe",    // Invalid: three names
        "Mehdi123 Idouallocuhe",   // Invalid: contains numbers
        "Mehdi-Idouallocuhe",      // Invalid: contains hyphen
        "M Idouallocuhe",         // Invalid: single letter first name
        "Mehdi I",        // Invalid: single letter last name
        "mehdi idouallocuhe",      // Invalid: lowercase
        "MEHDI IDOUALLOCHUE",      // Invalid: all uppercase
        "Mehdi idouallocuhe",      // Invalid: second name lowercase
        "mehdi Idouallocuhe",      // Invalid: first name lowercase
    ];

    console.log("=== Name Validator Test Cases ===\n");

    testCases.forEach((testCase, index) => {
        const result = validateName(testCase);
        console.log(`Test ${index + 1}: "${testCase}"`);
        console.log(`Result: ${result.message}\n`);
    });
}

// Main program logic
function main() {
    const args = process.argv.slice(2);
    
    if (args.includes('--test') || args.includes('-t')) {
        runTestMode();
    } else {
        runInteractiveMode();
    }
}

// Export functions for potential module usage
module.exports = {
    validateName,
    namePattern,
    runTestMode,
    runInteractiveMode
};

// Run the program if this file is executed directly
if (require.main === module) {
    main();
}
