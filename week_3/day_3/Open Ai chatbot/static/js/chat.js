// Chat functionality for Matrix Chatbot
class MatrixChat {
    constructor() {
        this.chatMessages = document.getElementById('chat-messages');
        this.messageInput = document.getElementById('message-input');
        this.sendBtn = document.getElementById('send-btn');
        this.clearMemoryBtn = document.getElementById('clear-memory');
        this.memoryInfoBtn = document.getElementById('memory-info');
        this.memoryPanel = document.getElementById('memory-panel');
        this.memoryContent = document.getElementById('memory-content');
        this.closeMemoryBtn = document.getElementById('close-memory');
        
        this.isTyping = false;
        this.conversationHistory = [];
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        this.sendBtn.addEventListener('click', () => {
            this.sendMessage();
        });
        
        this.clearMemoryBtn.addEventListener('click', () => {
            this.clearMemory();
        });
        
        this.memoryInfoBtn.addEventListener('click', () => {
            this.showMemoryInfo();
        });
        
        this.closeMemoryBtn.addEventListener('click', () => {
            this.hideMemoryPanel();
        });
        
        // Close memory panel when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target === this.memoryPanel) {
                this.hideMemoryPanel();
            }
        });
        
        // Focus input on load
        this.messageInput.focus();
        
        // Add initial welcome message with typing effect
        this.addWelcomeMessage();
    }
    
    addWelcomeMessage() {
        setTimeout(() => {
            const welcomeMessages = [
                "Welcome to the Matrix. I am your AI assistant with memory capabilities.",
                "I can remember our conversations and learn from our interactions.",
                "Type 'memory' to view my memory status, or 'clear' to reset my memory.",
                "What would you like to talk about?"
            ];
            
            welcomeMessages.forEach((message, index) => {
                setTimeout(() => {
                    this.addBotMessage(message, true);
                }, index * 2000);
            });
        }, 1000);
    }
    
    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isTyping) return;
        
        // Add user message to chat
        this.addUserMessage(message);
        
        // Clear input
        this.messageInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Send message to backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });
            
            const data = await response.json();
            
            // Hide typing indicator
            this.hideTypingIndicator();
            
            if (data.status === 'success') {
                // Add bot response with typing animation
                this.addBotMessage(data.response, true);
            } else {
                // Show error message
                this.addBotMessage(`Error: ${data.error}`, false);
            }
            
        } catch (error) {
            this.hideTypingIndicator();
            this.addBotMessage('Connection error. Please check your network connection.', false);
            console.error('Chat error:', error);
        }
    }
    
    addUserMessage(message) {
        const messageElement = this.createMessageElement('user', message, false);
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
        
        // Add particles effect
        this.addParticleEffect(messageElement);
    }
    
    addBotMessage(message, useTypingAnimation = false) {
        const messageElement = this.createMessageElement('bot', message, useTypingAnimation);
        this.chatMessages.appendChild(messageElement);
        this.scrollToBottom();
        
        // Add particles effect
        this.addParticleEffect(messageElement);
    }
    
    createMessageElement(sender, message, useTypingAnimation = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const timestamp = new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        messageDiv.innerHTML = `
            <div class="message-header">
                <span class="sender">${sender.toUpperCase()}</span>
                <span class="timestamp">[${timestamp}]</span>
            </div>
            <div class="message-content">
                <span class="matrix-text">${useTypingAnimation ? '' : message}</span>
            </div>
        `;
        
        const textElement = messageDiv.querySelector('.matrix-text');
        
        if (useTypingAnimation) {
            // Add typing animation
            this.isTyping = true;
            new TypingAnimation(textElement, message, 30);
            
            // Remove typing cursor when done
            setTimeout(() => {
                const cursor = textElement.querySelector('.typing-cursor');
                if (cursor) {
                    cursor.remove();
                }
                this.isTyping = false;
            }, message.length * 30 + 1000);
        }
        
        return messageDiv;
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-header">
                <span class="sender">SYSTEM</span>
                <span class="timestamp">[${new Date().toLocaleTimeString()}]</span>
            </div>
            <div class="message-content">
                <span class="matrix-text">Bot is typing</span>
                <span class="typing-dots">
                    <span class="dot">.</span>
                    <span class="dot">.</span>
                    <span class="dot">.</span>
                </span>
            </div>
        `;
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = this.chatMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    addParticleEffect(element) {
        if (window.particleSystem) {
            const rect = element.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    window.particleSystem.addParticle(x, y);
                }, i * 100);
            }
        }
    }
    
    async clearMemory() {
        if (!confirm('Are you sure you want to clear all memory? This action cannot be undone.')) {
            return;
        }
        
        try {
            const response = await fetch('/api/clear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const data = await response.json();
            
            if (data.status === 'success') {
                this.addBotMessage('Memory cleared successfully. I will start fresh.', true);
                // Clear chat messages except the first welcome message
                const messages = this.chatMessages.querySelectorAll('.message');
                messages.forEach((msg, index) => {
                    if (index > 0) { // Keep the first welcome message
                        msg.remove();
                    }
                });
            } else {
                this.addBotMessage(`Error clearing memory: ${data.error}`, false);
            }
            
        } catch (error) {
            this.addBotMessage('Error clearing memory. Please try again.', false);
            console.error('Clear memory error:', error);
        }
    }
    
    async showMemoryInfo() {
        this.memoryPanel.classList.add('show');
        this.memoryContent.innerHTML = `
            <div class="memory-loading">
                <div class="loading-spinner"></div>
                <span>Loading memory data...</span>
            </div>
        `;
        
        try {
            const response = await fetch('/api/memory');
            const data = await response.json();
            
            if (data.status === 'success') {
                this.displayMemoryInfo(data.memory);
            } else {
                this.memoryContent.innerHTML = `
                    <div class="memory-error">
                        <span>Error loading memory: ${data.error}</span>
                    </div>
                `;
            }
            
        } catch (error) {
            this.memoryContent.innerHTML = `
                <div class="memory-error">
                    <span>Error loading memory. Please try again.</span>
                </div>
            `;
            console.error('Memory info error:', error);
        }
    }
    
    displayMemoryInfo(memory) {
        const conversationCount = memory.recent_conversations.length;
        const factsCount = memory.important_facts.length;
        const preferencesCount = Object.keys(memory.user_preferences).length;
        
        let html = `
            <div class="memory-stats">
                <div class="stat-item">
                    <span class="stat-label">Conversation Turns:</span>
                    <span class="stat-value">${conversationCount}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Important Facts:</span>
                    <span class="stat-value">${factsCount}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">User Preferences:</span>
                    <span class="stat-value">${preferencesCount}</span>
                </div>
            </div>
        `;
        
        if (memory.important_facts.length > 0) {
            html += `
                <div class="memory-section">
                    <h4>Important Facts:</h4>
                    <ul class="facts-list">
                        ${memory.important_facts.map(fact => `<li>${fact}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        
        if (Object.keys(memory.user_preferences).length > 0) {
            html += `
                <div class="memory-section">
                    <h4>User Preferences:</h4>
                    <div class="preferences-list">
                        ${Object.entries(memory.user_preferences).map(([key, value]) => 
                            `<div class="preference-item">
                                <span class="preference-key">${key}:</span>
                                <span class="preference-value">${value}</span>
                            </div>`
                        ).join('')}
                    </div>
                </div>
            `;
        }
        
        if (memory.recent_conversations.length > 0) {
            html += `
                <div class="memory-section">
                    <h4>Recent Conversations:</h4>
                    <div class="conversations-list">
                        ${memory.recent_conversations.slice(-3).map(turn => `
                            <div class="conversation-item">
                                <div class="user-message">👤 ${turn.user}</div>
                                <div class="bot-message">🤖 ${turn.bot}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        this.memoryContent.innerHTML = html;
    }
    
    hideMemoryPanel() {
        this.memoryPanel.classList.remove('show');
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for loading animation to complete
    setTimeout(() => {
        new MatrixChat();
    }, 3500);
});

// Add CSS for memory panel content
const style = document.createElement('style');
style.textContent = `
    .typing-indicator .typing-dots {
        display: inline-block;
        margin-left: 5px;
    }
    
    .typing-indicator .dot {
        animation: typingDots 1.4s infinite;
        animation-delay: calc(var(--i) * 0.2s);
    }
    
    .typing-indicator .dot:nth-child(1) { --i: 0; }
    .typing-indicator .dot:nth-child(2) { --i: 1; }
    .typing-indicator .dot:nth-child(3) { --i: 2; }
    
    @keyframes typingDots {
        0%, 60%, 100% { opacity: 0.3; }
        30% { opacity: 1; }
    }
    
    .memory-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
        margin-bottom: 20px;
        padding: 15px;
        background: rgba(0, 255, 0, 0.05);
        border-radius: 5px;
        border: 1px solid rgba(0, 255, 0, 0.2);
    }
    
    .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    
    .stat-label {
        font-size: 0.8rem;
        color: #666;
        margin-bottom: 5px;
    }
    
    .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: #00ff00;
        text-shadow: 0 0 5px #00ff00;
    }
    
    .memory-section {
        margin-bottom: 20px;
        padding: 15px;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        border-left: 3px solid #00ff00;
    }
    
    .memory-section h4 {
        color: #00ff00;
        margin-bottom: 10px;
        font-family: 'Orbitron', monospace;
        font-size: 1rem;
    }
    
    .facts-list, .conversations-list {
        list-style: none;
        padding: 0;
    }
    
    .facts-list li {
        padding: 8px 0;
        border-bottom: 1px solid rgba(0, 255, 0, 0.1);
        color: #00ffff;
    }
    
    .facts-list li:last-child {
        border-bottom: none;
    }
    
    .preferences-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .preference-item {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
    }
    
    .preference-key {
        color: #00ff00;
        font-weight: 600;
    }
    
    .preference-value {
        color: #00ffff;
    }
    
    .conversation-item {
        margin-bottom: 15px;
        padding: 10px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
    }
    
    .conversation-item .user-message {
        color: #00ff00;
        margin-bottom: 5px;
        font-size: 0.9rem;
    }
    
    .conversation-item .bot-message {
        color: #00ffff;
        font-size: 0.9rem;
    }
    
    .memory-error {
        text-align: center;
        color: #ff0000;
        padding: 20px;
        font-size: 1.1rem;
    }
`;
document.head.appendChild(style);
