const axios = require('axios');
const chalk = require('chalk');

/**
 * Fetch data from a public API and display it
 * @param {string} type - The type of data to fetch (default: 'quotes')
 */
async function fetch(type = 'quotes') {
  try {
    console.log(chalk.blue.bold('\n📡 Fetching data from API...\n'));

    let response;
    let displayData;

    // Using a public quotes API as an example
    if (type === 'quotes' || type === 'quote') {
      response = await axios.get('https://api.quotable.io/random');
      displayData = {
        quote: response.data.content,
        author: response.data.author,
        tags: response.data.tags.join(', ')
      };

      console.log(chalk.bgGreen.white.bold('  Random Quote  '));
      console.log('');
      console.log(chalk.italic.cyan(`"${displayData.quote}"`));
      console.log(chalk.yellow(`\n  — ${displayData.author}`));
      console.log(chalk.gray(`\nTags: ${displayData.tags}`));
      console.log('');
    } 
    // Using JSONPlaceholder for demo data
    else if (type === 'user' || type === 'users') {
      response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
      displayData = response.data;

      console.log(chalk.bgGreen.white.bold('  User Data  '));
      console.log('');
      console.log(chalk.cyan('Name: ') + chalk.white(displayData.name));
      console.log(chalk.cyan('Email: ') + chalk.white(displayData.email));
      console.log(chalk.cyan('City: ') + chalk.white(displayData.address.city));
      console.log(chalk.cyan('Company: ') + chalk.white(displayData.company.name));
      console.log('');
    } 
    else {
      response = await axios.get('https://api.quotable.io/random');
      displayData = response.data;
      
      console.log(chalk.bgGreen.white.bold('  API Response  '));
      console.log('');
      console.log(chalk.white(JSON.stringify(displayData, null, 2)));
      console.log('');
    }

    console.log(chalk.green('✓ Data fetched successfully!\n'));
  } catch (error) {
    console.log(chalk.red.bold('\n✗ Error fetching data:'));
    console.log(chalk.red(error.message));
    console.log('');
  }
}

module.exports = fetch;

