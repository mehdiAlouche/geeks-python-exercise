// Exercise 6: Regular Expression #2
// Ask the user for his full name and validate it using regular expressions

// Import readline module for user input
const readline = require('readline');

console.log("Exercise 6: Regular Expression #2 - Validate Full Name");
console.log("=" .repeat(70));

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Function to validate full name using regular expressions
 * Rules:
 * 1. The name should contain only letters
 * 2. The name should contain only one space
 * 3. The first letter of each name should be upper cased
 * 
 * @param {string} fullName - The full name to validate
 * @returns {object} - Validation result with isValid and message
 */
function validateFullName(fullName) {
    // Trim whitespace from input
    const trimmedName = fullName.trim();
    
    // Check if input is empty
    if (!trimmedName) {
        return {
            isValid: false,
            message: "Name cannot be empty."
        };
    }
    
    // Regular expression pattern breakdown:
    // ^[A-Z]           - Must start with an uppercase letter
    // [a-z]+           - Followed by one or more lowercase letters
    // \s               - Exactly one space
    // [A-Z]            - Another uppercase letter
    // [a-z]+           - Followed by one or more lowercase letters
    // $                - End of string
    const namePattern = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
    
    if (namePattern.test(trimmedName)) {
        return {
            isValid: true,
            message: "Valid full name format!"
        };
    }
    
    // Provide specific error messages
    const parts = trimmedName.split(/\s+/);
    
    if (parts.length === 1) {
        return {
            isValid: false,
            message: "Name must contain exactly two parts (first name and last name) separated by one space."
        };
    }
    
    if (parts.length > 2) {
        return {
            isValid: false,
            message: "Name must contain exactly two parts (first name and last name) separated by one space."
        };
    }
    
    const [firstName, lastName] = parts;
    
    // Check if contains only letters
    if (!/^[A-Za-z]+$/.test(firstName) || !/^[A-Za-z]+$/.test(lastName)) {
        return {
            isValid: false,
            message: "Name should contain only letters (no numbers, special characters, or spaces)."
        };
    }
    
    // Check capitalization
    if (firstName[0] !== firstName[0].toUpperCase() || lastName[0] !== lastName[0].toUpperCase()) {
        return {
            isValid: false,
            message: "The first letter of each name should be uppercase."
        };
    }
    
    // Check if rest of letters are lowercase
    if (firstName.slice(1) !== firstName.slice(1).toLowerCase() || 
        lastName.slice(1) !== lastName.slice(1).toLowerCase()) {
        return {
            isValid: false,
            message: "All letters except the first should be lowercase."
        };
    }
    
    return {
        isValid: false,
        message: "Invalid name format. Please use format: 'FirstName LastName'"
    };
}

// Function to demonstrate validation with test cases
function demonstrateValidation() {
    console.log("\nValidation Examples:");
    console.log("-" .repeat(40));
    
    const testCases = [
        "John Doe",      // Valid
        "Mary Smith",    // Valid
        "jane doe",      // Invalid: lowercase first letters
        "JOHN DOE",      // Invalid: all uppercase
        "JohnDoe",       // Invalid: no space
        "John  Doe",     // Invalid: multiple spaces
        "John Doe Jr",   // Invalid: more than two parts
        "John",          // Invalid: only one part
        "John123",       // Invalid: contains numbers
        "John-Doe",      // Invalid: contains special character
        "John doe",      // Invalid: second name lowercase first letter
        "john Doe",      // Invalid: first name lowercase first letter
        "",              // Invalid: empty
        "   ",           // Invalid: only spaces
    ];
    
    testCases.forEach((testCase, index) => {
        const result = validateFullName(testCase);
        const status = result.isValid ? "✓ VALID" : "✗ INVALID";
        console.log(`${index + 1}. "${testCase}" - ${status}`);
        if (!result.isValid) {
            console.log(`   Reason: ${result.message}`);
        }
    });
}

// Function to get user input and validate
function getUserInput() {
    console.log("\nPlease enter your full name:");
    console.log("Format: FirstName LastName (e.g., 'John Doe')");
    console.log("Rules:");
    console.log("- Only letters allowed");
    console.log("- Exactly one space between names");
    console.log("- First letter of each name must be uppercase");
    console.log("- Type 'quit' to exit or 'demo' to see examples");
    console.log("-" .repeat(40));
    
    rl.question("Enter your full name: ", (input) => {
        const trimmedInput = input.trim();
        
        if (trimmedInput.toLowerCase() === 'quit') {
            console.log("\nGoodbye! 👋");
            rl.close();
            return;
        }
        
        if (trimmedInput.toLowerCase() === 'demo') {
            demonstrateValidation();
            getUserInput(); // Ask for input again
            return;
        }
        
        const validation = validateFullName(trimmedInput);
        
        if (validation.isValid) {
            console.log(`\n🎉 ${validation.message}`);
            console.log(`Welcome, ${trimmedInput}!`);
        } else {
            console.log(`\n❌ ${validation.message}`);
            console.log("Please try again with the correct format.");
        }
        
        console.log(); // Empty line for readability
        getUserInput(); // Ask for input again
    });
}

// Start the application
console.log("This application validates full names using regular expressions.");
console.log("The validation ensures:");
console.log("1. Names contain only letters");
console.log("2. Names contain exactly one space");
console.log("3. First letter of each name is uppercase");

// Run demonstration first
demonstrateValidation();

// Start interactive mode
getUserInput();

// Handle process termination
process.on('SIGINT', () => {
    console.log("\n\nGoodbye! 👋");
    rl.close();
    process.exit(0);
});

// Additional regex pattern explanations
console.log("\nRegular Expression Pattern Explanation:");
console.log("-" .repeat(40));
console.log("Pattern: /^[A-Z][a-z]+\\s[A-Z][a-z]+$/");
console.log("Breakdown:");
console.log("^          - Start of string");
console.log("[A-Z]      - First character must be uppercase letter");
console.log("[a-z]+     - One or more lowercase letters");
console.log("\\s         - Exactly one whitespace character");
console.log("[A-Z]      - First character of last name (uppercase)");
console.log("[a-z]+     - One or more lowercase letters");
console.log("$          - End of string");

console.log("\nAlternative patterns for different requirements:");
console.log("-" .repeat(40));
console.log("1. Allow multiple spaces: /^[A-Z][a-z]+\\s+[A-Z][a-z]+$/");
console.log("2. Case insensitive: /^[A-Za-z]+\\s[A-Za-z]+$/i");
console.log("3. Allow hyphens: /^[A-Z][a-z]+(-[A-Z][a-z]+)*\\s[A-Z][a-z]+(-[A-Z][a-z]+)*$/");
console.log("4. Allow apostrophes: /^[A-Z][a-z]+'?[a-z]*\\s[A-Z][a-z]+'?[a-z]*$/");

console.log("\n🎯 Exercise 6 is ready for interaction!");
console.log("=" .repeat(70));