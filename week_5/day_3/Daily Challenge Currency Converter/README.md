# Currency Converter - Binance Style

A modern currency converter with Binance-style dark theme that uses real-time exchange rates.

## 🚀 Quick Start

### Step 1: Get API Key
1. Visit [ExchangeRate-API](https://exchangerate-api.com/)
2. Sign up for a free account
3. Get your API key from the dashboard

### Step 2: Setup Backend Server
```bash
# Navigate to project directory
cd "Daily Challenge Currency Converter"

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env and add your API key
EXCHANGE_RATE_API_KEY=your_actual_api_key_here
```

### Step 3: Start Server
```bash
# Start the backend server
npm start

# Or for development with auto-restart
npm run dev

# Open browser to http://localhost:3000
```

## 🎯 Features

- **Real-time Exchange Rates**: Uses ExchangeRate-API for accurate conversion
- **Binance-Style Design**: Dark theme with orange accents
- **Currency Switching**: Switch between currencies with one click
- **Responsive Design**: Works on desktop and mobile
- **Error Handling**: Graceful error messages and loading states

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox
- **JavaScript ES6+**: Async/await, Fetch API
- **ExchangeRate-API**: Real-time currency data

## 📱 Usage

1. Enter the amount you want to convert
2. Select the source currency (From)
3. Select the target currency (To)
4. Click "Convert" to get the result
5. Use the switch button to swap currencies

## 🔧 Troubleshooting

### Server Not Starting
- Make sure you've installed dependencies: `npm install`
- Check that port 3000 is available
- Verify your API key is correct in the `.env` file

### API Key Error
If you see "Failed to load resource":
- Check that your API key is correct in the `.env` file
- Verify your API key is active on ExchangeRate-API
- Make sure the server is running

### Network Error
If you see "Failed to fetch":
- Check your internet connection
- Make sure the backend server is running on port 3000
- Try refreshing the page

## 📄 License

This project is for educational purposes. Please respect the ExchangeRate-API terms of service.
