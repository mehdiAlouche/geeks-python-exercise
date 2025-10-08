"""
Configuration file for the chatbot
"""
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# GitHub Inference API Configuration
GITHUB_INFERENCE_API_URL = "https://models.github.ai/inference/chat/completions"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

# Chatbot Configuration
MAX_MEMORY_SIZE = 10  # Maximum number of conversation turns to keep in memory
SYSTEM_PROMPT = """You are a helpful and friendly AI assistant. 
You have a small memory of recent conversations to provide context-aware responses.
Be conversational and remember important details from our chat."""

# API Configuration
REQUEST_TIMEOUT = 30
MAX_RETRIES = 3
