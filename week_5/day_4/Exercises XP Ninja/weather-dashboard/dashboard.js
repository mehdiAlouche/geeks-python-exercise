const readline = require('readline');
const chalk = require('chalk');
const getWeather = require('./weather');

/**
 * Start the weather dashboard and prompt user for city names
 */
function startDashboard() {
  // Create readline interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log(chalk.bgCyan.white.bold('\n' + ' '.repeat(25) + 'WEATHER DASHBOARD' + ' '.repeat(25)));
  console.log(chalk.cyan('Welcome to the Weather Dashboard! 🌍\n'));
  console.log(chalk.white('Get real-time weather information for any city in the world.'));
  console.log(chalk.gray('Type "exit" or "quit" to close the dashboard.\n'));

  // Function to prompt for city name
  const promptCity = () => {
    rl.question(chalk.yellow.bold('\nEnter city name: '), async (city) => {
      // Trim whitespace
      city = city.trim();

      // Check if user wants to exit
      if (city.toLowerCase() === 'exit' || city.toLowerCase() === 'quit') {
        console.log(chalk.green.bold('\nThank you for using Weather Dashboard! 👋\n'));
        rl.close();
        return;
      }

      // Check if input is empty
      if (!city) {
        console.log(chalk.red('Please enter a valid city name.'));
        promptCity();
        return;
      }

      // Fetch and display weather data
      await getWeather(city);

      // Prompt again for another city
      promptCity();
    });
  };

  // Start prompting
  promptCity();

  // Handle readline close event
  rl.on('close', () => {
    console.log(chalk.gray('Dashboard closed.\n'));
    process.exit(0);
  });
}

module.exports = startDashboard;

