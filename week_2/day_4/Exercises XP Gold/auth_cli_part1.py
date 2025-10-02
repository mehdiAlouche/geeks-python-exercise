# Exercise XP Gold - Part 1: Authentication CLI - login

# Initialize users dictionary with 3 users & passwords
users = {
    "admin": "password123",
    "john": "john2024",
    "alice": "alice_secret"
}

# Variable to track logged in user
logged_in = None

def main():
    global logged_in
    
    print("=== Authentication CLI - Login ===")
    print("Commands: 'login' or 'exit'")
    
    while True:
        command = input("\nEnter a command: ").strip().lower()
        
        if command == "exit":
            print("Goodbye!")
            break
            
        elif command == "login":
            username = input("Enter username: ").strip()
            password = input("Enter password: ").strip()
            
            # Check if user exists and password matches
            if username in users and users[username] == password:
                print("You are now logged in!")
                logged_in = username
                print(f"Welcome, {username}!")
            else:
                print("Invalid username or password.")
                
        else:
            print("Invalid command. Use 'login' or 'exit'.")

if __name__ == "__main__":
    main()
