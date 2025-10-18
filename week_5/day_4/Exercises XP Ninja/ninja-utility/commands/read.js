const fs = require('fs');
const chalk = require('chalk');

/**
 * Read and display the content of a file
 * @param {string} filepath - The path to the file to read
 */
function read(filepath) {
  if (!filepath) {
    console.log(chalk.red.bold('\n✗ Error: Please provide a file path!'));
    console.log(chalk.yellow('Usage: node index.js read <filepath>\n'));
    return;
  }

  try {
    console.log(chalk.blue.bold(`\n📖 Reading file: ${filepath}\n`));

    // Check if file exists
    if (!fs.existsSync(filepath)) {
      console.log(chalk.red.bold(`✗ File not found: ${filepath}\n`));
      return;
    }

    // Read file content
    const content = fs.readFileSync(filepath, 'utf8');

    console.log(chalk.bgCyan.white.bold('  File Content  '));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(chalk.white(content));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(chalk.green(`\n✓ Successfully read ${filepath}\n`));

  } catch (error) {
    console.log(chalk.red.bold('\n✗ Error reading file:'));
    console.log(chalk.red(error.message));
    console.log('');
  }
}

module.exports = read;

