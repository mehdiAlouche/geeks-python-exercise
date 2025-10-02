# Complete Authentication System - All Parts Combined
# Exercise XP Gold: Authentication database

import sqlite3
import hashlib
from getpass import getpass
import os
from datetime import datetime

class AuthenticationSystem:
    def __init__(self, db_name="auth_users.db"):
        self.db_name = db_name
        self.logged_in = None
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
        print(f"Database '{self.db_name}' initialized successfully.")
    
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
            
            print("Initialized database with 3 default users: admin, john, alice")
    
    def encrypt_password(self, password):
        """Encrypt password using SHA-256 hash (Bonus feature)"""
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
            return False  # Username already exists
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
    
    def list_users(self):
        """List all usernames (for admin purposes)"""
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        
        cursor.execute('SELECT username, created_at FROM users ORDER BY created_at')
        users = cursor.fetchall()
        conn.close()
        
        return users
    
    def signup_user(self):
        """Handle user registration - Part 2"""
        print("\n" + "="*50)
        print("USER REGISTRATION")
        print("="*50)
        
        # Ask for username and validate it doesn't exist
        while True:
            username = input("Enter a username: ").strip()
            if not username:
                print("❌ Username cannot be empty. Please try again.")
                continue
                
            if self.user_exists(username):
                print("❌ Username already exists. Please choose a different username.")
                continue
                
            # Username is valid (not empty and doesn't exist)
            break
        
        # Ask for password
        password = getpass("Enter a password: ")
        if not password:
            print("❌ Password cannot be empty.")
            return False
            
        password_confirm = getpass("Confirm password: ")
        if password != password_confirm:
            print("❌ Passwords do not match.")
            return False
        
        # Create new user in database
        if self.create_user(username, password):
            print(f"✅ User '{username}' has been successfully created!")
            print("🔓 You can now log in with your credentials.")
            return True
        else:
            print("❌ Failed to create user.")
            return False
    
    def login_user(self):
        """Handle user login - Part 1"""
        print("\n" + "="*50)
        print("USER LOGIN")
        print("="*50)
        
        username = input("Enter username: ").strip()
        password = getpass("Enter password: ")
        
        if self.authenticate_user(username, password):
            print("✅ You are now logged in!")
            self.logged_in = username
            print(f"👋 Welcome, {username}!")
            return True
        else:
            print("❌ Invalid username or password.")
            
            # Ask if user wants to sign up - Part 2 requirement
            signup_choice = input("\n📝 Would you like to sign up for a new account? (y/n): ").strip().lower()
            if signup_choice in ['y', 'yes']:
                return self.signup_user()
            return False
    
    def logout(self):
        """Handle user logout"""
        if self.logged_in:
            print(f"👋 Goodbye, {self.logged_in}!")
            self.logged_in = None
        else:
            print("You are not currently logged in.")
    
    def show_status(self):
        """Show current login status"""
        if self.logged_in:
            print(f"🔓 Currently logged in as: {self.logged_in}")
        else:
            print("🔒 Not logged in")
    
    def admin_panel(self):
        """Administrative panel for logged in users"""
        if not self.logged_in:
            print("❌ You must be logged in to access admin features.")
            return
        
        print(f"\n🔧 ADMIN PANEL - Welcome {self.logged_in}")
        print("="*50)
        
        while True:
            print("\nAdmin Options:")
            print("1. View all users")
            print("2. View database statistics")
            print("3. Go back to main menu")
            
            choice = input("\nSelect an option (1-3): ").strip()
            
            if choice == "1":
                users = self.list_users()
                print(f"\n📋 All Users ({len(users)} total):")
                print("-" * 40)
                for i, (username, created_at) in enumerate(users, 1):
                    print(f"{i:2d}. {username:15} (Created: {created_at})")
                    
            elif choice == "2":
                count = self.count_users()
                print(f"\n📊 Database Statistics:")
                print(f"   Total users: {count}")
                print(f"   Database file: {self.db_name}")
                print(f"   Database size: {os.path.getsize(self.db_name) if os.path.exists(self.db_name) else 0} bytes")
                
            elif choice == "3":
                break
            else:
                print("❌ Invalid option. Please select 1, 2, or 3.")
    
    def run(self):
        """Main CLI loop - All Parts Combined"""
        print("🚀 AUTHENTICATION SYSTEM v1.0")
        print("="*50)
        print("🔐 Secure Login & Registration")
        print("💾 SQLite Database Backend")
        print("🔒 SHA-256 Password Encryption")
        print("="*50)
        print("\nCommands: 'login', 'signup', 'status', 'admin', 'logout', 'exit'")
        
        while True:
            command = input(f"\n🔹 {self.logged_in}> Enter a command: " if self.logged_in else "\n🔹 Enter a command: ").strip().lower()
            
            if command == "exit":
                print("\n👋 Thanks for using the Authentication System!")
                print("🔒 Goodbye!")
                break
                
            elif command == "login":
                self.login_user()
                
            elif command == "signup":
                self.signup_user()
                
            elif command == "logout":
                self.logout()
                
            elif command == "status":
                self.show_status()
                
            elif command == "admin":
                self.admin_panel()
                
            else:
                print("❌ Invalid command!")
                print("Available commands: 'login', 'signup', 'status', 'admin', 'logout', 'exit'")

def main():
    """Run the authentication system"""
    try:
        auth = AuthenticationSystem()
        auth.run()
    except KeyboardInterrupt:
        print("\n\n👋 System shutdown by user.")
    except Exception as e:
        print(f"\n❌ An error occurred: {e}")

if __name__ == "__main__":
    main()
