// colorful-message.js - Module for displaying colorful messages using chalk

// Require the chalk package
const chalk = require('chalk');

/**
 * Display a colorful message in the terminal
 */
function displayColorfulMessage() {
    console.log(chalk.blue.bold('='.repeat(50)));
    console.log(chalk.green.bold('🎨 Welcome to the Colorful Message Module! 🎨'));
    console.log(chalk.yellow('This message is brought to you by ') + chalk.red.bold('Chalk!'));
    console.log(chalk.magenta('Node.js is ') + chalk.cyan.italic('awesome!'));
    console.log(chalk.blue.bold('='.repeat(50)));
}

// Export the function
module.exports = displayColorfulMessage;

