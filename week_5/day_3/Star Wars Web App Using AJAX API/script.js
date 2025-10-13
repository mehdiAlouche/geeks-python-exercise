// DOM Elements
const getCharacterBtn = document.getElementById('getCharacter');
const characterContainer = document.getElementById('characterContainer');

// API Configuration
const API_BASE_URL = 'https://www.swapi.tech/api/people/';
const TOTAL_CHARACTERS = 83; // As mentioned in the requirements

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    getCharacterBtn.addEventListener('click', handleGetCharacter);
});

// Main function to handle character retrieval
async function handleGetCharacter() {
    try {
        // Disable button and show loading
        setLoadingState(true);
        
        // Get random character ID (1-83)
        const randomId = Math.floor(Math.random() * TOTAL_CHARACTERS) + 1;
        
        // Fetch character data
        const characterData = await fetchCharacterData(randomId);
        
        // Display character information
        displayCharacter(characterData);
        
    } catch (error) {
        console.error('Error fetching character:', error);
        displayError('Failed to fetch character data. Please try again.');
    } finally {
        // Re-enable button
        setLoadingState(false);
    }
}

// Function to fetch character data from API
async function fetchCharacterData(characterId) {
    try {
        const response = await fetch(`${API_BASE_URL}${characterId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.result) {
            throw new Error('Character data not found');
        }
        
        // Fetch homeworld data
        const homeworldData = await fetchHomeworldData(data.result.properties.homeworld);
        
        return {
            ...data.result.properties,
            homeworld: homeworldData
        };
        
    } catch (error) {
        console.error('Error in fetchCharacterData:', error);
        throw error;
    }
}

// Function to fetch homeworld data
async function fetchHomeworldData(homeworldUrl) {
    try {
        const response = await fetch(homeworldUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.result.properties.name;
        
    } catch (error) {
        console.error('Error fetching homeworld:', error);
        return 'Unknown';
    }
}

// Function to display character information
function displayCharacter(character) {
    const characterHTML = `
        <div class="character-card">
            <h2 class="character-name">${character.name}</h2>
            <div class="character-info">
                <div class="info-item">
                    <div class="info-label">Height</div>
                    <div class="info-value">${character.height} cm</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Gender</div>
                    <div class="info-value">${character.gender}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Birth Year</div>
                    <div class="info-value">${character.birth_year}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Home World</div>
                    <div class="info-value">${character.homeworld}</div>
                </div>
            </div>
        </div>
    `;
    
    characterContainer.innerHTML = characterHTML;
}

// Function to display loading state
function displayLoading() {
    const loadingHTML = `
        <div class="loading">
            <i class="fas fa-spinner"></i>
            <p>Loading character data...</p>
        </div>
    `;
    
    characterContainer.innerHTML = loadingHTML;
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
    
    characterContainer.innerHTML = errorHTML;
}

// Function to set loading state
function setLoadingState(isLoading) {
    if (isLoading) {
        getCharacterBtn.disabled = true;
        getCharacterBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        displayLoading();
    } else {
        getCharacterBtn.disabled = false;
        getCharacterBtn.innerHTML = '<i class="fas fa-rocket"></i> Get Random Character';
    }
}

// Function to get DOM elements (as requested in requirements)
function getDOMElements() {
    return {
        getCharacterBtn: document.getElementById('getCharacter'),
        characterContainer: document.getElementById('characterContainer')
    };
}

// Function to get data from API (as requested in requirements)
async function getDataFromAPI(characterId) {
    return await fetchCharacterData(characterId);
}

// Function to display info on DOM (as requested in requirements)
function displayInfoOnDOM(characterData) {
    displayCharacter(characterData);
}
