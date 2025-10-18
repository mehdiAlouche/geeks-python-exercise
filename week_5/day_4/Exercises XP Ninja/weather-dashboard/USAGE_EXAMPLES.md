# Weather Dashboard - Usage Examples

## Quick Start Guide

### Starting the Application

```bash
npm start
```

Or:

```bash
node index.js
```

## How to Use

1. **Start the dashboard** - Run the command above
2. **Enter a city name** - Type the name of any city when prompted
3. **View weather data** - See detailed weather information
4. **Try another city** - Enter another city name
5. **Exit** - Type "exit" or "quit" to close

## Example Session

```
WEATHER DASHBOARD
Welcome to the Weather Dashboard! 🌍

Get real-time weather information for any city in the world.
Type "exit" or "quit" to close the dashboard.

Enter city name: London

===========================================================
  🌤️  Weather Information for London
===========================================================

Location:
  City: London
  Country: United Kingdom
  Region: City of London, Greater London

Current Conditions:
  Temperature: 15°C (59°F)
  Feels Like: 14°C (57°F)
  Description: Partly cloudy
  Humidity: 72%
  Wind Speed: 15 km/h
  Wind Direction: WSW
  Pressure: 1013 mb
  Visibility: 10 km
  Cloud Cover: 75%

────────────────────────────────────────────────────────────

Enter city name: Paris

[Weather data for Paris displayed...]

Enter city name: exit

Thank you for using Weather Dashboard! 👋
```

## Cities to Try

Here are some cities you can try:

### Major Cities
- London
- Paris
- New York
- Tokyo
- Sydney
- Moscow
- Dubai
- Singapore

### Your Local Area
- Try entering your city name
- Try entering nearby cities

### Special Locations
- Mumbai
- São Paulo
- Cairo
- Istanbul
- Los Angeles

## Weather Information Provided

The dashboard shows:

✅ **Location Details**
- City name
- Country
- Region

✅ **Current Weather**
- Temperature (Celsius and Fahrenheit)
- Feels like temperature
- Weather description
- Humidity percentage
- Wind speed and direction
- Atmospheric pressure
- Visibility
- Cloud cover

## Features

🌈 **Colorful Display**
- Blue headers
- Yellow labels
- Cyan city names
- Green temperature highlights
- Color-coded messages

🔄 **Interactive**
- Enter multiple cities
- Get instant weather updates
- User-friendly prompts

⚡ **Real-time Data**
- Current weather conditions
- Up-to-date information
- Worldwide coverage

## Common Issues

### "Error fetching weather data"

**Possible causes:**
1. **Misspelled city name** - Check spelling and try again
2. **No internet connection** - Ensure you're connected to the internet
3. **City not found** - Try using the full city name or a major city nearby

**Solutions:**
- Try: "New York" instead of "NYC"
- Try: "London" instead of "london bridge"
- Make sure you're connected to the internet

### Exit the Dashboard

Type one of these commands:
- `exit`
- `quit`

Or press `Ctrl+C` to force quit.

## API Information

This application uses the **wttr.in** API, which:
- ✅ Is completely free
- ✅ Doesn't require API key registration
- ✅ Provides comprehensive weather data
- ✅ Covers cities worldwide

## Tips for Best Results

1. **Use full city names** - "Los Angeles" works better than "LA"
2. **Check spelling** - Make sure the city name is spelled correctly
3. **Try variations** - If a city isn't found, try different variations
4. **Internet required** - Make sure you have an active internet connection

## Testing Commands

Quick test sequence:
```
node index.js
> London
> Paris
> Tokyo
> exit
```

This will show you weather for three major cities and then exit.

