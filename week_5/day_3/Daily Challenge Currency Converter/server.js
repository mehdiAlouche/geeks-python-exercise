// Backend server to hide API key
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Hide API key in environment variable
const API_KEY = process.env.EXCHANGE_RATE_API_KEY ;
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

// Route to get supported currencies
app.get('/api/currencies', async (req, res) => {
    try {
        const response = await fetch(`${BASE_URL}/${API_KEY}/codes`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching currencies:', error);
        res.status(500).json({ error: 'Failed to fetch currencies' });
    }
});

// Route to convert currencies
app.get('/api/convert/:from/:to/:amount', async (req, res) => {
    try {
        const { from, to, amount } = req.params;
        const response = await fetch(`${BASE_URL}/${API_KEY}/pair/${from}/${to}/${amount}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error converting currency:', error);
        res.status(500).json({ error: 'Failed to convert currency' });
    }
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('API key is hidden on the server side!');
});

// To run this server:
// 1. npm init -y
// 2. npm install express cors node-fetch
// 3. node server.js

