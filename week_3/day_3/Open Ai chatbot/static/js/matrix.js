// Matrix Rain Animation
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-rain');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.init());
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = new Array(this.columns).fill(1);
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            // Create gradient effect
            const gradient = this.ctx.createLinearGradient(0, y - this.fontSize, 0, y);
            gradient.addColorStop(0, 'rgba(0, 255, 0, 0)');
            gradient.addColorStop(0.5, 'rgba(0, 255, 0, 0.5)');
            gradient.addColorStop(1, 'rgba(0, 255, 0, 1)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillText(text, x, y);
            
            // Reset drop to top randomly
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Loading Animation
class LoadingAnimation {
    constructor() {
        this.overlay = document.getElementById('loading-overlay');
        this.progressBar = document.querySelector('.progress-bar');
        this.loaderText = document.querySelector('.loader-text');
        this.texts = [
            'INITIALIZING MATRIX...',
            'CONNECTING TO AI...',
            'LOADING MEMORY...',
            'SYSTEM READY'
        ];
        this.currentTextIndex = 0;
        
        this.start();
    }
    
    start() {
        this.showText();
        this.animateProgress();
        
        // Hide loading overlay after 3 seconds
        setTimeout(() => {
            this.hide();
        }, 3000);
    }
    
    showText() {
        this.loaderText.textContent = this.texts[this.currentTextIndex];
        
        setTimeout(() => {
            this.currentTextIndex++;
            if (this.currentTextIndex < this.texts.length) {
                this.showText();
            }
        }, 750);
    }
    
    animateProgress() {
        this.progressBar.style.width = '0%';
        
        setTimeout(() => {
            this.progressBar.style.width = '100%';
        }, 100);
    }
    
    hide() {
        this.overlay.classList.add('hidden');
        setTimeout(() => {
            this.overlay.style.display = 'none';
        }, 500);
    }
}

// Typing Animation
class TypingAnimation {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
        this.isComplete = false;
        
        this.start();
    }
    
    start() {
        this.element.textContent = '';
        this.type();
    }
    
    type() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        } else {
            this.isComplete = true;
            // Add blinking cursor
            this.addCursor();
        }
    }
    
    addCursor() {
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '█';
        this.element.appendChild(cursor);
    }
    
    removeCursor() {
        const cursor = this.element.querySelector('.typing-cursor');
        if (cursor) {
            cursor.remove();
        }
    }
}

// Glitch Effect
class GlitchEffect {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        this.start();
    }
    
    start() {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance to glitch
                this.glitch();
            }
        }, 2000);
    }
    
    glitch() {
        const glitchText = this.originalText.split('').map(char => {
            if (Math.random() < 0.3) {
                return this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
            }
            return char;
        }).join('');
        
        this.element.textContent = glitchText;
        
        setTimeout(() => {
            this.element.textContent = this.originalText;
        }, 100);
    }
}

// Particle System for enhanced effects
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '2';
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    addParticle(x, y) {
        this.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            decay: Math.random() * 0.02 + 0.01
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            
            if (particle.life <= 0) {
                this.particles.splice(index, 1);
                return;
            }
            
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = '#00ff00';
            this.ctx.fillRect(particle.x, particle.y, 2, 2);
        });
        
        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start Matrix Rain
    new MatrixRain();
    
    // Start Loading Animation
    new LoadingAnimation();
    
    // Initialize Particle System
    window.particleSystem = new ParticleSystem();
    
    // Add glitch effect to title
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        new GlitchEffect(glitchElement);
    }
    
    // Update system time
    updateSystemTime();
    setInterval(updateSystemTime, 1000);
});

// System time display
function updateSystemTime() {
    const timeElement = document.getElementById('system-time');
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeElement.textContent = `[${timeString}]`;
    }
}

// Export classes for use in other scripts
window.MatrixRain = MatrixRain;
window.LoadingAnimation = LoadingAnimation;
window.TypingAnimation = TypingAnimation;
window.GlitchEffect = GlitchEffect;
window.ParticleSystem = ParticleSystem;
