// Global variables
let selectedColor = '#ff0000'; // Default to red
let isDrawing = false;
let gridSize = 20; // 20x20 grid

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeColorPalette();
    initializeDrawingGrid();
    initializeClearButton();
});

// Color Palette Functions
function initializeColorPalette() {
    const colors = document.querySelectorAll('.color');
    
    // Set default selected color
    colors[0].classList.add('selected');
    
    colors.forEach(color => {
        color.addEventListener('click', function() {
            // Remove selected class from all colors
            colors.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked color
            this.classList.add('selected');
            
            // Update selected color
            selectedColor = this.getAttribute('data-color');
        });
    });
}

// Drawing Grid Functions
function initializeDrawingGrid() {
    const grid = document.getElementById('drawingGrid');
    
    // Clear existing grid
    grid.innerHTML = '';
    
    // Create grid squares
    for (let i = 0; i < gridSize * gridSize; i++) {
        const square = document.createElement('div');
        square.className = 'grid-square';
        square.style.backgroundColor = 'white';
        
        // Add event listeners for drawing
        square.addEventListener('mousedown', startDrawing);
        square.addEventListener('mouseover', draw);
        square.addEventListener('mouseup', stopDrawing);
        
        // Prevent context menu on right click
        square.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
        
        grid.appendChild(square);
    }
}

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (isDrawing) {
        e.target.style.backgroundColor = selectedColor;
    }
}

function stopDrawing() {
    isDrawing = false;
}

// Clear Button Functions
function initializeClearButton() {
    const clearButton = document.getElementById('clearButton');
    
    clearButton.addEventListener('click', function() {
        const squares = document.querySelectorAll('.grid-square');
        squares.forEach(square => {
            square.style.backgroundColor = 'white';
        });
    });
}

// Touch events for mobile devices
function initializeTouchEvents() {
    const grid = document.getElementById('drawingGrid');
    
    grid.addEventListener('touchstart', function(e) {
        e.preventDefault();
        isDrawing = true;
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.classList.contains('grid-square')) {
            element.style.backgroundColor = selectedColor;
        }
    });
    
    grid.addEventListener('touchmove', function(e) {
        e.preventDefault();
        if (isDrawing) {
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (element && element.classList.contains('grid-square')) {
                element.style.backgroundColor = selectedColor;
            }
        }
    });
    
    grid.addEventListener('touchend', function(e) {
        e.preventDefault();
        isDrawing = false;
    });
}

// Initialize touch events for mobile support
document.addEventListener('DOMContentLoaded', function() {
    initializeTouchEvents();
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'C' to clear
    if (e.key.toLowerCase() === 'c') {
        const clearButton = document.getElementById('clearButton');
        clearButton.click();
    }
    
    // Press 'Escape' to stop drawing
    if (e.key === 'Escape') {
        isDrawing = false;
    }
});

// Prevent drawing when mouse leaves the grid
document.addEventListener('mouseup', function() {
    isDrawing = false;
});

// Add some fun animations and effects
function addDrawingEffects() {
    const squares = document.querySelectorAll('.grid-square');
    
    squares.forEach(square => {
        square.addEventListener('mouseenter', function() {
            if (isDrawing) {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            }
        });
    });
}

// Initialize drawing effects
document.addEventListener('DOMContentLoaded', function() {
    addDrawingEffects();
});
