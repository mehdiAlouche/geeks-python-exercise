# Exercise XP Gold - Part 3: Authentication CLI with Database

import sqlite3
import hashlib
from getpass import getpass

class AuthDatabase:
    def __init__(self, db_name="users.db"):
        self.db_name = db_name
        self.init_database()
        self.initialize_default_users()
    
    def init_database(self):
        """Create the users table if it doesn't exist"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def initialize_default_users(self):
        """Initialize database with default users if table is empty"""
        if self.count_users() == 0:
            default_users = {
                "admin": "password123",
                "john": "john2024", 
                "alice": "alice_secret"
            }
            
            for username, password in default_users.items():
                self.create_user(username, password)
            
            print("Initialized database with default users.")
    
    def encrypt_password(self, password):
        """Encrypt password using SHA-256 hash"""
        return hashlib.sha256(password.encode()).hexdigest()
    
    def create_user(self, username, password):
        """Create a new user in the database"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        password_hash = self.encrypt_password(password)
        
        try:
            cursor.execute('''
                INSERT INTO users (username, password_hash)
                VALUES (?, ?)
            ''', (username, password_hash))
            
            conn.commit()
            return True
        except sqlite3.IntegrityError:
            print("Username already exists!")
            return False
        finally:
            conn.close()
    
    def authenticate_user(self, username, password):
        """Authenticate user login"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        password_hash = self.encrypt_password(password)
        
        cursor.execute('''
            SELECT username FROM users 
            WHERE username = ? AND password_hash = ?
        ''', (username, password_hash))
        
        result = cursor.fetchone()
        conn.close()
        
        return result is not None
    
    def user_exists(self, username):
        """Check if user exists"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        cursor.execute('SELECT username FROM users WHERE username = ?', (username,))
        result = cursor.fetchone()
        conn.close()
        
        return result is not None
    
    def count_users(self):
        """Get total number of users"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        cursor.execute('SELECT COUNT(*) FROM users')
        count = cursor.fetchone()[0]
        conn.close()
        
        return count

class AuthCLI:
    def __init__(self):
        self.db = AuthDatabase()
        self.logged_in = None
    
    def signup_user(self):
        """Handle user registration"""
        print("\n=== User Registration ===")
        
        # Ask for username and validate it doesn't exist
        while True:
            username = input("Enter a username: ").strip()
            if not username:
                print("Username cannot be empty. Please try again.")
                continue
                
            if self.db.user_exists(username):
                print("Username already exists. Please choose a different username.")
                continue
                
            # Username is valid (not empty and doesn't exist)
            break
        
        # Ask for password
        password = getpass("Enter a password: ")
        if not password:
            print("Password cannot be empty.")
            return False
            
        # Create new user in database
        if self.db.create_user(username, password):
            print(f"User '{username}' has been successfully created!")
            print("You can now log in with your credentials.")
            return True
        else:
            return False
    
    def login_user(self):
        """Handle user login"""
        username = input("Enter username: ").strip()
        password = getpass("Enter password: ")
        
        if self.db.authenticate_user(username, password):
            print("You are now logged in!")
            self.logged_in = username
            print(f"Welcome, {username}!")
            return True
        else:
            print("Invalid username or password.")
            
            # Ask if user wants to sign up
            signup_choice = input("Would you like to sign up? (y/n): ").strip().lower()
            if signup_choice in ['y', 'yes']:
                self.signup_user()
            return False
    
    def run(self):
        """Main CLI loop"""
        print("=== Authentication CLI with Database ===")
        print("Commands: 'login', 'signup', 'exit'")
        
        while True:
            command = input("\nEnter a command: ").strip().lower()
            
            if command == "exit":
                print("Goodbye!")
                break
                
            elif command == "login":
                self.login_user()
                
            elif command == "signup":
                self.signup_user()
                
            else:
                print("Invalid command. Use 'login', 'signup', or 'exit'.")

if __name__ == "__main__":
    cli = AuthCLI()
    cli.run()
