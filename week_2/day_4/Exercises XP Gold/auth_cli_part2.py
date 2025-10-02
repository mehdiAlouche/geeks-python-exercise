# Exercise XP Gold - Part 2: Authentication CLI - signup

from getpass import getpass  # For secure password input

# Initialize users dictionary with 3 users & passwords
users = {
    "admin": "password123",
    "john": "john2024",
    "alice": "alice_secret"
}

# Variable to track logged in user
logged_in = None

def signup_user():
    """Handle user registration"""
    print("\n=== User Registration ===")
    
    # Ask for username and validate it doesn't exist
    while True:
        username = input("Enter a username: ").strip()
        if not username:
            print("Username cannot be empty. Please try again.")
            continue
            
        if username in users:
            print("Username already exists. Please choose a different username.")
            continue
            
        # Username is valid (not empty and doesn't exist)
        break
    
    # Ask for password
    password = getpass("Enter a password: ")
    if not password:
        print("Password cannot be empty.")
        return False
        
    # Add new user to the dictionary
    users[username] = password
    print(f"User '{username}' has been successfully created!")
    print("You can now log in with your credentials.")
    return True

def main():
    global logged_in
    
    print("=== Authentication CLI - Login & Signup ===")
    print("Commands: 'login', 'signup', or 'exit'")
    
    while True:
        command = input("\nEnter a command: ").strip().lower()
        
        if command == "exit":
            print("Goodbye!")
            break
            
        elif command == "login":
            username = input("Enter username: ").strip()
            password = getpass("Enter password: ")
            
            # Check if user exists and password matches
            if username in users and users[username] == password:
                print("You are now logged in!")
                logged_in = username
                print(f"Welcome, {username}!")
            else:
                print("Invalid username or password.")
                
                # Ask if user wants to sign up
                signup_choice = input("Would you like to sign up? (y/n): ").strip().lower()
                if signup_choice in ['y', 'yes']:
                    signup_user()
                    
        elif command == "signup":
            signup_user()
            
        else:
            print("Invalid command. Use 'login', 'signup', or 'exit'.")

if __name__ == "__main__":
    main()
