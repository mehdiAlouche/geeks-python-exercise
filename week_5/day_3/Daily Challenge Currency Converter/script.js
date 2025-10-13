// API Configuration - Backend server handles API calls
const API_BASE_URL = 'http://localhost:3000/api';

// DOM Elements
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const switchBtn = document.getElementById('switchBtn');
const resultContainer = document.getElementById('resultContainer');

// Global variables
let supportedCurrencies = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Function to initialize the application
async function initializeApp() {
    try {
        await loadSupportedCurrencies();
        setupEventListeners();
    } catch (error) {
        console.error('Error initializing app:', error);
        displayError('Failed to initialize the application. Please refresh the page.');
    }
}

// Function to get DOM elements (as requested in requirements)
function getDOMElements() {
    return {
        amountInput: document.getElementById('amount'),
        fromCurrencySelect: document.getElementById('fromCurrency'),
        toCurrencySelect: document.getElementById('toCurrency'),
        convertBtn: document.getElementById('convertBtn'),
        switchBtn: document.getElementById('switchBtn'),
        resultContainer: document.getElementById('resultContainer')
    };
}

// Function to setup event listeners
function setupEventListeners() {
    convertBtn.addEventListener('click', handleConvert);
    switchBtn.addEventListener('click', handleSwitch);
    
    // Enable/disable convert button based on form validity
    amountInput.addEventListener('input', validateForm);
    fromCurrencySelect.addEventListener('change', validateForm);
    toCurrencySelect.addEventListener('change', validateForm);
}

// Function to load supported currencies
async function loadSupportedCurrencies() {
    try {
        displayLoading('Loading currencies...');
        
        const response = await fetch(`${API_BASE_URL}/currencies`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.result === 'success') {
            supportedCurrencies = data.supported_codes;
            populateCurrencySelects();
        } else {
            throw new Error('Failed to fetch supported currencies');
        }
        
    } catch (error) {
        console.error('Error loading currencies:', error);
        displayError('Failed to load supported currencies. Please check your connection.');
    }
}

// Function to populate currency select elements
function populateCurrencySelects() {
    // Clear existing options
    fromCurrencySelect.innerHTML = '';
    toCurrencySelect.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select currency';
    fromCurrencySelect.appendChild(defaultOption.cloneNode(true));
    toCurrencySelect.appendChild(defaultOption.cloneNode(true));
    
    // Add currency options
    supportedCurrencies.forEach(currency => {
        const [code, name] = currency;
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${code} - ${name}`;
        
        fromCurrencySelect.appendChild(option.cloneNode(true));
        toCurrencySelect.appendChild(option.cloneNode(true));
    });
    
    // Set default currencies
    setDefaultCurrencies();
}

// Function to set default currencies
function setDefaultCurrencies() {
    const usdIndex = supportedCurrencies.findIndex(currency => currency[0] === 'USD');
    const eurIndex = supportedCurrencies.findIndex(currency => currency[0] === 'EUR');
    
    if (usdIndex !== -1) {
        fromCurrencySelect.selectedIndex = usdIndex + 1; // +1 for default option
    }
    
    if (eurIndex !== -1) {
        toCurrencySelect.selectedIndex = eurIndex + 1; // +1 for default option
    }
    
    validateForm();
}

// Function to validate form
function validateForm() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    
    const isValid = amount > 0 && fromCurrency && toCurrency && fromCurrency !== toCurrency;
    
    convertBtn.disabled = !isValid;
    switchBtn.disabled = !fromCurrency || !toCurrency;
}

// Function to handle currency conversion
async function handleConvert() {
    try {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        
        if (!amount || !fromCurrency || !toCurrency) {
            return;
        }
        
        displayLoading('Converting currencies...');
        
        const conversionData = await convertCurrency(fromCurrency, toCurrency, amount);
        displayConversionResult(conversionData, amount);
        
    } catch (error) {
        console.error('Error converting currency:', error);
        displayError('Failed to convert currency. Please try again.');
    }
}

// Function to convert currency using backend API
async function convertCurrency(fromCurrency, toCurrency, amount) {
    try {
        const response = await fetch(`${API_BASE_URL}/convert/${fromCurrency}/${toCurrency}/${amount}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.result === 'success') {
            return {
                fromCurrency: data.base_code,
                toCurrency: data.target_code,
                amount: data.amount,
                conversionRate: data.conversion_rate,
                conversionResult: data.conversion_result
            };
        } else {
            throw new Error(data.error || 'Conversion failed');
        }
        
    } catch (error) {
        console.error('Error in convertCurrency:', error);
        throw error;
    }
}

// Function to display conversion result
function displayConversionResult(conversionData, originalAmount) {
    const resultHTML = `
        <div class="conversion-result">
            <div class="result-amount">${conversionData.conversionResult.toFixed(2)} ${conversionData.toCurrency}</div>
            <div class="result-details">
                ${originalAmount.toFixed(2)} ${conversionData.fromCurrency} = ${conversionData.conversionResult.toFixed(2)} ${conversionData.toCurrency}
            </div>
            <div class="exchange-rate">
                1 ${conversionData.fromCurrency} = ${conversionData.conversionRate.toFixed(4)} ${conversionData.toCurrency}
            </div>
        </div>
    `;
    
    resultContainer.innerHTML = resultHTML;
}

// Function to handle currency switch
function handleSwitch() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    
    if (!fromCurrency || !toCurrency) {
        return;
    }
    
    // Switch the currencies
    fromCurrencySelect.value = toCurrency;
    toCurrencySelect.value = fromCurrency;
    
    // Clear the result
    resultContainer.innerHTML = `
        <div class="welcome-message">
            <i class="fas fa-coins"></i>
            <h3>Ready to Convert!</h3>
            <p>Enter an amount and select currencies to get started.</p>
        </div>
    `;
    
    validateForm();
}

// Function to display loading state
function displayLoading(message) {
    const loadingHTML = `
        <div class="loading">
            <i class="fas fa-spinner"></i>
            <p>${message}</p>
        </div>
    `;
    
    resultContainer.innerHTML = loadingHTML;
}

// Function to display error message
function displayError(message) {
    const errorHTML = `
        <div class="error">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Error</h3>
            <p>${message}</p>
        </div>
    `;
    
    resultContainer.innerHTML = errorHTML;
}

// Function to get data from API (as requested in requirements)
async function getDataFromAPI(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error fetching data from API:', error);
        throw error;
    }
}

// Function to display info on DOM (as requested in requirements)
function displayInfoOnDOM(data) {
    displayConversionResult(data, parseFloat(amountInput.value));
}
