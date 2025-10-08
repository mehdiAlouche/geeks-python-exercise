"""
Flask web server for the Matrix-style chatbot interface
"""
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chatbot import Chatbot
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize chatbot
chatbot = Chatbot()

@app.route('/')
def index():
    """Serve the main Matrix interface"""
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """API endpoint for chat messages"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Empty message'}), 400
        
        # Generate response using the chatbot
        bot_response = chatbot.generate_response(user_message)
        
        return jsonify({
            'response': bot_response,
            'status': 'success'
        })
        
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/memory', methods=['GET'])
def get_memory():
    """Get current memory state"""
    try:
        memory_summary = chatbot.memory.get_memory_summary()
        return jsonify({
            'memory': memory_summary,
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/clear', methods=['POST'])
def clear_memory():
    """Clear chatbot memory"""
    try:
        chatbot.memory.clear_memory()
        return jsonify({
            'message': 'Memory cleared successfully',
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        }), 500

@app.route('/api/status', methods=['GET'])
def status():
    """Check API status and configuration"""
    github_token = os.getenv("GITHUB_TOKEN")
    return jsonify({
        'github_token_configured': bool(github_token),
        'status': 'ready' if github_token else 'no_token'
    })

if __name__ == '__main__':
    print("🚀 Starting Matrix Chatbot Web Server...")
    print("📱 Open your browser to: http://localhost:5000")
    print("🔑 Make sure your GITHUB_TOKEN is set in .env file")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
