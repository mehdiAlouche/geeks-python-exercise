"""
Memory manager for the chatbot to maintain conversation history
"""
from typing import List, Dict, Any
from collections import deque
import json

class MemoryManager:
    """Manages conversation memory with a sliding window approach"""
    
    def __init__(self, max_size: int = 10):
        self.max_size = max_size
        self.conversation_history = deque(maxlen=max_size)
        self.user_preferences = {}
        self.important_facts = []
    
    def add_conversation_turn(self, user_message: str, bot_response: str) -> None:
        """Add a conversation turn to memory"""
        turn = {
            "user": user_message,
            "bot": bot_response
        }
        self.conversation_history.append(turn)
    
    def get_conversation_context(self) -> List[Dict[str, str]]:
        """Get recent conversation history for context"""
        return list(self.conversation_history)
    
    def add_user_preference(self, key: str, value: Any) -> None:
        """Add or update a user preference"""
        self.user_preferences[key] = value
    
    def get_user_preference(self, key: str) -> Any:
        """Get a user preference"""
        return self.user_preferences.get(key)
    
    def add_important_fact(self, fact: str) -> None:
        """Add an important fact to remember"""
        if fact not in self.important_facts:
            self.important_facts.append(fact)
    
    def get_important_facts(self) -> List[str]:
        """Get all important facts"""
        return self.important_facts.copy()
    
    def get_memory_summary(self) -> Dict[str, Any]:
        """Get a summary of all memory"""
        return {
            "recent_conversations": self.get_conversation_context(),
            "user_preferences": self.user_preferences,
            "important_facts": self.important_facts,
            "memory_size": len(self.conversation_history)
        }
    
    def clear_memory(self) -> None:
        """Clear all memory"""
        self.conversation_history.clear()
        self.user_preferences.clear()
        self.important_facts.clear()
    
    def save_memory_to_file(self, filename: str = "chatbot_memory.json") -> None:
        """Save memory to a JSON file"""
        memory_data = {
            "conversation_history": list(self.conversation_history),
            "user_preferences": self.user_preferences,
            "important_facts": self.important_facts
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(memory_data, f, indent=2, ensure_ascii=False)
    
    def load_memory_from_file(self, filename: str = "chatbot_memory.json") -> bool:
        """Load memory from a JSON file"""
        try:
            with open(filename, 'r', encoding='utf-8') as f:
                memory_data = json.load(f)
            
            self.conversation_history = deque(memory_data.get("conversation_history", []), maxlen=self.max_size)
            self.user_preferences = memory_data.get("user_preferences", {})
            self.important_facts = memory_data.get("important_facts", [])
            
            return True
        except FileNotFoundError:
            return False
        except json.JSONDecodeError:
            return False
