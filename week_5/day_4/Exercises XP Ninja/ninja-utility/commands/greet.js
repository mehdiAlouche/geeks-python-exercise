const chalk = require('chalk');

/**
 * Display a colorful greeting message
 * @param {string} name - The name to greet (optional)
 */
function greet(name = 'User') {
  console.log('\n' + chalk.bgBlue.white.bold('='.repeat(50)));
  console.log(chalk.cyan.bold('  🌟 Welcome to Ninja Utility! 🌟'));
  console.log(chalk.bgBlue.white.bold('='.repeat(50)));
  console.log('');
  console.log(chalk.green('Hello, ') + chalk.yellow.bold(name) + chalk.green('!'));
  console.log(chalk.magenta('Have a wonderful day! ✨'));
  console.log(chalk.gray('─'.repeat(50)));
  console.log('');
}

module.exports = greet;

