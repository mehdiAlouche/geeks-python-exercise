// greeting.js - Module for personalized greetings

/**
 * Greet function that takes a name and returns a personalized greeting message
 * @param {string} name - The name of the person to greet
 * @returns {string} - A personalized greeting message
 */
function greet(name) {
    return `Hello, ${name}! Welcome to the Node.js Daily Challenge!`;
}

// Export the greet function using Node.js module system
module.exports = greet;

