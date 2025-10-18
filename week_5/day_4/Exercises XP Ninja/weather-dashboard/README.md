# Weather Dashboard

A Node.js weather dashboard that allows users to get weather information for different cities around the world.

## Installation

```bash
npm install
```

## Usage

Start the weather dashboard:
```bash
npm start
```

Or:
```bash
node index.js
```

### How to Use

1. Run the application
2. Enter a city name when prompted
3. View the weather information displayed in the terminal
4. Enter another city name to get more weather data
5. Type "exit" or "quit" to close the dashboard

### Example

```
Enter city name: London
Enter city name: Paris
Enter city name: New York
Enter city name: exit
```

## Features

- **Real-time Weather Data**: Fetches current weather conditions from wttr.in API
- **Colorful Display**: Uses chalk to display weather information with colors
- **Interactive Interface**: Uses readline module for user input
- **Comprehensive Information**: Shows temperature, humidity, wind speed, pressure, and more
- **User-friendly**: Easy-to-use interface with helpful error messages

## Weather Information Provided

- Location (City, Country, Region)
- Current Temperature (°C and °F)
- Feels Like Temperature
- Weather Description
- Humidity
- Wind Speed and Direction
- Atmospheric Pressure
- Visibility
- Cloud Cover

## API Used

This application uses the [wttr.in](https://wttr.in) weather API, which is free and doesn't require an API key for basic usage.

If you want to use OpenWeatherMap instead:
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your API key
3. Modify the `weather.js` file to use the OpenWeatherMap API

## Dependencies

- **axios**: For making HTTP requests to the weather API
- **chalk**: For colorful terminal output
- **readline**: For interactive user input (built-in Node.js module)

## Notes

- Make sure you have an active internet connection
- City names should be spelled correctly
- The API provides weather data for cities worldwide

