# Test script for the Authentication CLI

import sqlite3
import os
from auth_cli_part3 import AuthDatabase

def test_database():
    """Test the database functionality"""
    print("=== Testing AuthDatabase ===")
    
    # Create a test database
    test_db = AuthDatabase("test_users.db")
    
    # Test user creation
    print("\n1. Testing user creation...")
    
    # Test creating a valid user
    result = test_db.create_user("testuser", "testpassword")
    print(f"Create 'testuser': {'Success' if result else 'Failed'}")
    
    # Test creating duplicate user
    result = test_db.create_user("testuser", "anotherpassword")
    print(f"Create duplicate 'testuser': {'Failed as expected' if not result else 'Unexpected success'}")
    
    # Test user authentication
    print("\n2. Testing user authentication...")
    
    auth_result = test_db.authenticate_user("testuser", "testpassword")
    print(f"Authenticate 'testuser' with correct password: {'Success' if auth_result else 'Failed'}")
    
    auth_result = test_db.authenticate_user("testuser", "wrongpassword")
    print(f"Authenticate 'testuser' with wrong password: {'Failed as expected' if not auth_result else 'Unexpected success'}")
    
    auth_result = test_db.authenticate_user("nonexistent", "password")
    print(f"Authenticate nonexistent user: {'Failed as expected' if not auth_result else 'Unexpected success'}")
    
    # Test user existence check
    print("\n3. Testing user existence check...")
    
    exists = test_db.user_exists("testuser")
    print(f"Check if 'testuser' exists: {'True as expected' if exists else 'Unexpected False'}")
    
    exists = test_db.user_exists("nonexistent")
    print(f"Check if nonexistent user exists: {'False as expected' if not exists else 'Unexpected True'}")
    
    print("\n4. Testing password encryption...")
    encrypted = test_db.encrypt_password("testpassword")
    print(f"Password encrypted: {encrypted[:10]}... (first 10 characters)")
    
    print("\n=== Database Test Complete ===")
    
    # Clean up test database
    if os.path.exists("test_users.db"):
        os.remove("test_users.db")
        print("Test database cleaned up.")

if __name__ == "__main__":
    test_database()
