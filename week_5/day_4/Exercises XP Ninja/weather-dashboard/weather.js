const axios = require('axios');
const chalk = require('chalk');

/**
 * Fetch weather data for a given city
 * @param {string} city - The name of the city
 */
async function getWeather(city) {
  try {
    // OpenWeatherMap API key (you'll need to get your own from https://openweathermap.org/api)
    // For demo purposes, using a free weather API that doesn't require authentication
    const API_KEY = 'demo'; // Replace with your actual API key
    
    // Using wttr.in as a free alternative that doesn't require API key
    // This is a great API for demo purposes
    const response = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    
    const data = response.data;
    const current = data.current_condition[0];
    const location = data.nearest_area[0];
    
    // Display weather information with colors
    console.log('\n' + chalk.bgBlue.white.bold('='.repeat(60)));
    console.log(chalk.cyan.bold(`  🌤️  Weather Information for ${city}`));
    console.log(chalk.bgBlue.white.bold('='.repeat(60)) + '\n');
    
    console.log(chalk.yellow.bold('Location:'));
    console.log(chalk.white(`  City: ${location.areaName[0].value}`));
    console.log(chalk.white(`  Country: ${location.country[0].value}`));
    console.log(chalk.white(`  Region: ${location.region[0].value}\n`));
    
    console.log(chalk.yellow.bold('Current Conditions:'));
    console.log(chalk.white(`  Temperature: ${chalk.green.bold(current.temp_C + '°C')} (${current.temp_F}°F)`));
    console.log(chalk.white(`  Feels Like: ${current.FeelsLikeC}°C (${current.FeelsLikeF}°F)`));
    console.log(chalk.white(`  Description: ${chalk.cyan(current.weatherDesc[0].value)}`));
    console.log(chalk.white(`  Humidity: ${current.humidity}%`));
    console.log(chalk.white(`  Wind Speed: ${current.windspeedKmph} km/h`));
    console.log(chalk.white(`  Wind Direction: ${current.winddir16Point}`));
    console.log(chalk.white(`  Pressure: ${current.pressure} mb`));
    console.log(chalk.white(`  Visibility: ${current.visibility} km`));
    console.log(chalk.white(`  Cloud Cover: ${current.cloudcover}%\n`));
    
    console.log(chalk.gray('─'.repeat(60)) + '\n');
    
  } catch (error) {
    console.log(chalk.red.bold('\n✗ Error fetching weather data:'));
    
    if (error.response) {
      console.log(chalk.red(`Status: ${error.response.status}`));
      console.log(chalk.red(`Message: ${error.response.statusText}`));
    } else if (error.request) {
      console.log(chalk.red('No response received from the server.'));
      console.log(chalk.yellow('Please check your internet connection.'));
    } else {
      console.log(chalk.red(error.message));
    }
    
    console.log(chalk.yellow('\nTips:'));
    console.log(chalk.white('  - Make sure the city name is spelled correctly'));
    console.log(chalk.white('  - Try using the full city name'));
    console.log(chalk.white('  - Check your internet connection\n'));
  }
}

module.exports = getWeather;

