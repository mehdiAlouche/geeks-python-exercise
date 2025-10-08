// Get all drum pads and audio elements
const drumPads = document.querySelectorAll('.drum-pad');
const audioElements = document.querySelectorAll('audio');

// Web Audio API context for fallback sounds
let audioContext;
let isAudioContextInitialized = false;

// Initialize audio context
function initAudioContext() {
    if (!isAudioContextInitialized) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        isAudioContextInitialized = true;
    }
    return audioContext;
}

// Generate fallback drum sounds using Web Audio API
function generateDrumSound(soundType) {
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Different frequencies for different drum sounds
    const frequencies = {
        'boom': 60,
        'clap': 1000,
        'hihat': 8000,
        'kick': 50,
        'openhat': 6000,
        'ride': 4000,
        'snare': 200,
        'tink': 3000,
        'tom': 120
    };
    
    oscillator.frequency.setValueAtTime(frequencies[soundType] || 440, ctx.currentTime);
    oscillator.type = soundType === 'hihat' || soundType === 'openhat' ? 'square' : 'sine';
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
}

// Function to play sound and add visual feedback
function playSound(keyCode) {
    // Find the audio element with matching data-key
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const drumPad = document.querySelector(`.drum-pad[data-key="${keyCode}"]`);
    
    if (!drumPad) return;
    
    // Try to play the audio file first
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.log('Audio file not found, using generated sound');
            // Fallback to generated sound
            const soundType = drumPad.getAttribute('data-sound');
            generateDrumSound(soundType);
        });
    } else {
        // No audio file, use generated sound
        const soundType = drumPad.getAttribute('data-sound');
        generateDrumSound(soundType);
    }
    
    // Add visual feedback
    drumPad.classList.add('playing');
    
    // Remove visual feedback after animation
    setTimeout(() => {
        drumPad.classList.remove('playing');
    }, 150);
}

// Keyboard event listener
document.addEventListener('keydown', function(event) {
    // Get the keyCode from the event object
    const keyCode = event.keyCode;
    
    // Check if the pressed key corresponds to a drum pad
    const validKeys = [65, 83, 68, 70, 71, 72, 74, 75, 76]; // A, S, D, F, G, H, J, K, L
    
    if (validKeys.includes(keyCode)) {
        playSound(keyCode);
    }
});

// Mouse click event listeners for each drum pad
drumPads.forEach(drumPad => {
    drumPad.addEventListener('click', function() {
        // Get the keyCode from the data-key attribute
        const keyCode = parseInt(this.getAttribute('data-key'));
        playSound(keyCode);
    });
});

// Optional: Add touch support for mobile devices
drumPads.forEach(drumPad => {
    drumPad.addEventListener('touchstart', function(event) {
        event.preventDefault(); // Prevent default touch behavior
        const keyCode = parseInt(this.getAttribute('data-key'));
        playSound(keyCode);
    });
});

// Optional: Add visual feedback for key presses
document.addEventListener('keydown', function(event) {
    const keyCode = event.keyCode;
    const validKeys = [65, 83, 68, 70, 71, 72, 74, 75, 76];
    
    if (validKeys.includes(keyCode)) {
        const drumPad = document.querySelector(`.drum-pad[data-key="${keyCode}"]`);
        if (drumPad) {
            drumPad.style.transform = 'scale(0.95)';
        }
    }
});

document.addEventListener('keyup', function(event) {
    const keyCode = event.keyCode;
    const validKeys = [65, 83, 68, 70, 71, 72, 74, 75, 76];
    
    if (validKeys.includes(keyCode)) {
        const drumPad = document.querySelector(`.drum-pad[data-key="${keyCode}"]`);
        if (drumPad) {
            drumPad.style.transform = '';
        }
    }
});

// Console log for debugging
console.log('Drumset loaded! Press keys A, S, D, F, G, H, J, K, L or click the pads to play sounds.');
