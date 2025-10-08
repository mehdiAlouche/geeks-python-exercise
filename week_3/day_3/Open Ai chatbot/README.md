# 🤖 Matrix AI Chatbot

A stunning web-based chatbot with conversation memory using GitHub Inference API and GPT-5-nano model.

## Features

- 🧠 **Conversation Memory**: Remembers recent conversations and important facts
- 🚀 **GitHub Inference API**: Uses GPT-5-nano model via GitHub's inference service
- 💾 **Persistent Memory**: Saves conversation history to JSON files
- 🎯 **Smart Context**: Uses conversation history for better responses
- 🎬 **Matrix Interface**: Beautiful web interface with Matrix-style animations
- ⚙️ **Configurable**: Easy to customize memory size and prompts

## Prerequisites

- Python 3.7+
- GitHub Personal Access Token (required for GitHub Inference API)

## Installation

1. **Clone or download this project**

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the project directory:
   ```bash
   # Copy the example file
   cp env_example.txt .env
   
   # Edit .env and add your GitHub token
   GITHUB_TOKEN=your_github_token_here
   ```

   **Getting GitHub Token:**
   - Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
   - Create a new token with appropriate permissions for model inference
   - Copy the token and paste it in your `.env` file

## Usage

1. **Start the web server:**
   ```bash
   python web_server.py
   ```

2. **Open your browser:**
   ```
   http://localhost:5000
   ```

3. **Chat with the bot:**
   - Type your messages in the Matrix interface
   - The bot will remember your conversation
   - Use special commands:
     - `memory` - View your conversation memory
     - `clear` - Clear all memory
     - Click the brain icon to view memory panel

## Web Interface Features

- **Matrix Rain Animation** - Falling digital characters background
- **Glitch Effects** - Text glitching animations
- **Particle System** - Interactive particles on message interactions
- **Loading Animation** - Futuristic loading sequence
- **Typing Animation** - Real-time typing effects for bot responses
- **Memory Panel** - Click brain icon to view memory statistics
- **Responsive Design** - Works on desktop, tablet, and mobile

## Example Interface

The web interface provides a stunning Matrix-themed experience with:
- Neon green color scheme
- Glassmorphism effects
- Smooth animations and transitions
- Real-time message updates
- Interactive memory management

## Memory Features

### Conversation History
- Maintains a sliding window of recent conversations
- Default: 10 conversation turns
- Automatically saves to JSON files

### User Preferences
- Automatically detects and stores user preferences
- Keywords: "prefer", "like", "dislike"

### Important Facts
- Extracts key information like names, preferences
- Keywords: "remember", "important", "name is", "i am"

### Persistent Storage
- Memory saved to `session_[timestamp]_memory.json`
- Automatically loaded on startup
- Survives application restarts

## Configuration

Edit `config.py` to customize:

```python
MAX_MEMORY_SIZE = 10  # Number of conversation turns to remember
SYSTEM_PROMPT = "Your custom system prompt here"
REQUEST_TIMEOUT = 30  # API request timeout
MAX_RETRIES = 3       # Number of retry attempts
```

## API Support

### GitHub Inference API
- Uses gpt-4o model via GitHub's inference service
- Requires GitHub Personal Access Token
- High performance and reliability
- Direct access to cutting-edge AI models

## File Structure

```
├── web_server.py        # Flask web server (main entry point)
├── chatbot.py           # Core chatbot logic
├── memory_manager.py    # Memory management system
├── config.py           # Configuration settings
├── requirements.txt    # Python dependencies
├── env_example.txt     # Environment variables example
├── templates/          # HTML templates
│   └── index.html      # Matrix interface
├── static/            # Static web assets
│   ├── css/
│   │   └── matrix.css  # Matrix styling and animations
│   └── js/
│       ├── matrix.js   # Matrix rain and visual effects
│       └── chat.js     # Chat functionality
└── README.md          # This file
```

## Troubleshooting

### Common Issues

1. **"GitHub token not found"**
   - Make sure you've created a `.env` file
   - Check that your GitHub token is correctly set

2. **"GitHub API Error"**
   - Verify your GitHub token has the correct permissions
   - Check if the GitHub Inference API is accessible
   - Ensure your token has model inference permissions

3. **Import errors**
   - Run `pip install -r requirements.txt`
   - Make sure you're using Python 3.7+

### Memory Issues

- Memory files are saved as `session_[timestamp]_memory.json`
- If memory isn't loading, check file permissions
- Use `clear` command to reset memory if needed

## Contributing

Feel free to submit issues, feature requests, or pull requests to improve this chatbot!

## License

This project is open source and available under the MIT License.
