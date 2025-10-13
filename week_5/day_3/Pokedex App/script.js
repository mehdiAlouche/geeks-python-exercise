// Global variables
let currentPokemonId = null;
const TOTAL_POKEMON = 1010; // Total number of Pokemon in the API

// DOM Elements
const pokemonContainer = document.getElementById('pokemonContainer');
const randomBtn = document.getElementById('randomBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    randomBtn.addEventListener('click', handleRandomPokemon);
    prevBtn.addEventListener('click', handlePreviousPokemon);
    nextBtn.addEventListener('click', handleNextPokemon);
});

// Function to get DOM elements (as requested in requirements)
function getDOMElements() {
    return {
        pokemonContainer: document.getElementById('pokemonContainer'),
        randomBtn: document.getElementById('randomBtn'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn')
    };
}

// Function to get data from API (as requested in requirements)
async function getDataFromAPI(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        throw error;
    }
}

// Function to display info on DOM (as requested in requirements)
function displayInfoOnDOM(pokemonData) {
    displayPokemon(pokemonData);
}

// Main function to handle random Pokemon
async function handleRandomPokemon() {
    try {
        setLoadingState(true);
        
        // Generate random Pokemon ID (1 to 1010)
        const randomId = Math.floor(Math.random() * TOTAL_POKEMON) + 1;
        
        // Fetch Pokemon data
        const pokemonData = await getDataFromAPI(randomId);
        
        // Update current Pokemon ID
        currentPokemonId = randomId;
        
        // Display Pokemon
        displayPokemon(pokemonData);
        
        // Update navigation buttons
        updateNavigationButtons();
        
    } catch (error) {
        console.error('Error fetching random Pokemon:', error);
        displayError('Oh no! That Pokemon isn\'t available...');
    } finally {
        setLoadingState(false);
    }
}

// Function to handle previous Pokemon
async function handlePreviousPokemon() {
    if (currentPokemonId === null || currentPokemonId <= 1) {
        return;
    }
    
    try {
        setLoadingState(true);
        
        const previousId = currentPokemonId - 1;
        const pokemonData = await getDataFromAPI(previousId);
        
        currentPokemonId = previousId;
        displayPokemon(pokemonData);
        updateNavigationButtons();
        
    } catch (error) {
        console.error('Error fetching previous Pokemon:', error);
        displayError('Oh no! That Pokemon isn\'t available...');
    } finally {
        setLoadingState(false);
    }
}

// Function to handle next Pokemon
async function handleNextPokemon() {
    if (currentPokemonId === null || currentPokemonId >= TOTAL_POKEMON) {
        return;
    }
    
    try {
        setLoadingState(true);
        
        const nextId = currentPokemonId + 1;
        const pokemonData = await getDataFromAPI(nextId);
        
        currentPokemonId = nextId;
        displayPokemon(pokemonData);
        updateNavigationButtons();
        
    } catch (error) {
        console.error('Error fetching next Pokemon:', error);
        displayError('Oh no! That Pokemon isn\'t available...');
    } finally {
        setLoadingState(false);
    }
}

// Function to display Pokemon information
function displayPokemon(pokemon) {
    const pokemonHTML = `
        <div class="pokemon-card">
            <div class="pokemon-image">
                <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
                     alt="${pokemon.name}" 
                     onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png'">
            </div>
            
            <h2 class="pokemon-name">${pokemon.name}</h2>
            <p class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</p>
            
            <div class="pokemon-details">
                <div class="detail-item">
                    <div class="detail-label">Height</div>
                    <div class="detail-value">${pokemon.height / 10} m</div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label">Weight</div>
                    <div class="detail-value">${pokemon.weight / 10} kg</div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label">Type</div>
                    <div class="detail-value">
                        ${pokemon.types.map(type => 
                            `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    pokemonContainer.innerHTML = pokemonHTML;
}

// Function to display loading state
function displayLoading() {
    const loadingHTML = `
        <div class="loading">
            <i class="fas fa-spinner"></i>
            <p>Loading Pokemon...</p>
        </div>
    `;
    
    pokemonContainer.innerHTML = loadingHTML;
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
    
    pokemonContainer.innerHTML = errorHTML;
}

// Function to set loading state
function setLoadingState(isLoading) {
    if (isLoading) {
        randomBtn.disabled = true;
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        randomBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        displayLoading();
    } else {
        randomBtn.disabled = false;
        randomBtn.innerHTML = '<i class="fas fa-random"></i> Random Pokémon';
        updateNavigationButtons();
    }
}

// Function to update navigation buttons
function updateNavigationButtons() {
    if (currentPokemonId === null) {
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    } else {
        prevBtn.disabled = currentPokemonId <= 1;
        nextBtn.disabled = currentPokemonId >= TOTAL_POKEMON;
    }
}

// Console log for debugging (as requested in requirements)
function logCurrentPokemon() {
    console.log('Current Pokemon ID:', currentPokemonId);
}
