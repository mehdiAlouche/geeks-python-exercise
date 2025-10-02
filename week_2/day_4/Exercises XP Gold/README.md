# Exercise XP Gold - Authentication Database

This repository contains a complete authentication system implementation that fulfills all requirements from the Exercise XP Gold challenge.

## 📁 Files Overview

- `auth_cli_part1.py` - Part 1: Basic login functionality with dictionary
- `auth_cli_part2.py` - Part 2: Added signup functionality  
- `auth_cli_part3.py` - Part 3: Complete database implementation with encryption
- `auth_system.py` - **Complete combined system with all features**
- `test_auth.py` - Test script for database functionality
- `README.md` - This documentation file

## 🚀 Features Implemented

### ✅ Part 1: Authentication CLI - Login
- Dictionary-based user storage (initial 3 users)
- Login command with username/password validation
- "exit" command to break out of loop
- `logged_in` variable tracking

### ✅ Part 2: Authentication CLI - Signup  
- Signup command for new user registration
- Username validation (no duplicates)
- Password input handling
- Automatic signup prompt on failed login

### ✅ Part 3: Database Implementation
- SQLite database replacement for dictionary storage
- Complete read/write functionality
- User authentication against database
- Database initialization and table creation

### 🎁 Bonus: Password Encryption
- SHA-256 hashing for password storage
- Secure password comparison
- No plain text passwords in database

## 🎯 Quick Start

### Run the Complete System
```bash
python auth_system.py
```

### Run Individual Parts
```bash
# Part 1 only
python auth_cli_part1.py

# Part 2 only  
python auth_cli_part2.py

# Part 3 only
python auth_cli_part3.py
```

### Test the Database
```bash
python test_auth.py
```

## 💻 Usage Examples

### Default Users (Pre-loaded)
- Username: `admin` | Password: `password123`
- Username: `john` | Password: `john2024`  
- Username: `alice` | Password: `alice_secret`

### Available Commands
- `login` - Authenticate with existing account
- `signup` - Register new account
- `status` - Show current login status
- `admin` - Access admin panel (if logged in)
- `logout` - Log out current user
- `exit` - Exit the application

### Admin Panel Features
- View all registered users
- Database statistics
- User creation timestamps

## 🏗️ Technical Implementation

### Database Schema
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

### Security Features
- Password hashing with SHA-256
- Secure password input (hidden)
- SQL injection protection (parameterized queries)
- Input validation and sanitization

### Class Structure
- `AuthenticationSystem` - Main system class
- `AuthDatabase` - Database operations (Part 3)
- Modular design for easy testing and extension

## 🧪 Testing

Run the test script to verify all functionality:
```bash
python test_auth.py
```

The test suite covers:
- User creation
- User authentication  
- Duplicate user prevention
- Password encryption
- Database integrity

## 📋 Requirements Checklist

### Part 1: ✅ Complete
- [✓] Dictionary with 3 users & passwords
- [✓] Loop: exit breaks, login prompts for username/password
- [✓] Success message + username stored in `logged_in`

### Part 2: ✅ Complete  
- [✓] Signup offer on failed login
- [✓] Username validation (no duplicates)
- [✓] Password collection

### Part 3: ✅ Complete
- [✓] SQLite database replaces dictionary
- [✓] Read/write users functionality
- [✓] Database operations

### Bonus: ✅ Complete
- [✓] SHA-256 password encryption
- [✓] Secure password storage

## 🔧 Customization

### Database Location
```python
auth = AuthenticationSystem("my_custom_db.db")
```

### Default Users
Modify the `default_users` dictionary in `initialize_default_users()` method.

### Password Policy
Extend `signup_user()` method to add password complexity requirements.

## 🌟 Advanced Features

- User-friendly CLI interface with emojis
- Comprehensive error handling
- Database statistics
- Admin panel for user management
- Clean separation of concerns
- Extensive testing suite

---

**Exercise Status: ✅ COMPLETE**

All parts implemented successfully with bonus features!
