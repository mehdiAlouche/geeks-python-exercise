"""
Chatbot with memory using GitHub Inference API and GPT-5-nano model
"""
import requests
import json
import time
from typing import Optional, Dict, Any
from memory_manager import MemoryManager
import config

class Chatbot:
    """Chatbot with memory functionality using GitHub Inference API"""
    
    def __init__(self):
        self.memory = MemoryManager(config.MAX_MEMORY_SIZE)
        self.session_id = f"session_{int(time.time())}"
        self.load_existing_memory()
    
    def load_existing_memory(self) -> None:
        """Load existing memory from file if available"""
        self.memory.load_memory_from_file(f"{self.session_id}_memory.json")
    
    def save_memory(self) -> None:
        """Save current memory to file"""
        self.memory.save_memory_to_file(f"{self.session_id}_memory.json")
    
    def call_github_inference_api(self, messages: list) -> Optional[str]:
        if not config.GITHUB_TOKEN:
            return None
        
        headers = {
            "Authorization": f"Bearer {config.GITHUB_TOKEN}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        
        payload = {
            "model": "openai/gpt-4o",
            "messages": messages,
            "max_tokens": 1000,
            "temperature": 0.7
        }
        
        try:
            response = requests.post(
                config.GITHUB_INFERENCE_API_URL,
                headers=headers,
                json=payload,
                timeout=config.REQUEST_TIMEOUT
            )
            
            if response.status_code == 200:
                result = response.json()
                return result.get("choices", [{}])[0].get("message", {}).get("content", "")
            else:
                print(f"GitHub API Error: {response.status_code} - {response.text}")
                return None
                
        except requests.exceptions.RequestException:
            return None
    
    
    def build_context_messages(self, user_message: str) -> list:
        """Build the message context with memory"""
        messages = [{"role": "system", "content": config.SYSTEM_PROMPT}]
        
        # Add memory context
        memory_summary = self.memory.get_memory_summary()
        if memory_summary["important_facts"]:
            facts_context = "Important facts to remember: " + "; ".join(memory_summary["important_facts"])
            messages.append({"role": "system", "content": facts_context})
        
        if memory_summary["user_preferences"]:
            prefs_context = "User preferences: " + str(memory_summary["user_preferences"])
            messages.append({"role": "system", "content": prefs_context})
        
        # Add recent conversation history
        for turn in memory_summary["recent_conversations"]:
            messages.append({"role": "user", "content": turn["user"]})
            messages.append({"role": "assistant", "content": turn["bot"]})
        
        # Add current message
        messages.append({"role": "user", "content": user_message})
        
        return messages
    
    def extract_important_info(self, user_message: str, bot_response: str) -> None:
        """Extract and store important information from the conversation"""
        # Simple keyword-based extraction for important facts
        important_keywords = ["remember", "important", "prefer", "like", "dislike", "name is", "i am", "my name"]
        
        user_lower = user_message.lower()
        for keyword in important_keywords:
            if keyword in user_lower:
                # Extract the relevant part
                if "name is" in user_lower or "i am" in user_lower or "my name" in user_lower:
                    self.memory.add_important_fact(f"User name: {user_message}")
                elif "prefer" in user_lower or "like" in user_lower:
                    self.memory.add_important_fact(f"User preference: {user_message}")
                break
    
    def generate_response(self, user_message: str) -> str:
        """Generate a response to user message"""
        # Build context with memory
        messages = self.build_context_messages(user_message)
        
        # Call GitHub Inference API
        response = self.call_github_inference_api(messages)
        
        # If GitHub API fails, return a default response
        if not response:
            response = "I'm sorry, I'm having trouble connecting to the GitHub Inference API right now. Please check your GitHub token and try again later."
        
        # Store the conversation turn in memory
        self.memory.add_conversation_turn(user_message, response)
        
        # Extract important information
        self.extract_important_info(user_message, response)
        
        # Save memory
        self.save_memory()
        
        return response
    
