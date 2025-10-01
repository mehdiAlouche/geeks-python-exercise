# Restaurant Menu Manager

A Python application for managing restaurant menu items using PostgreSQL database.

## Features

- View menu items
- Add new menu items
- Delete menu items
- Update existing menu items
- Display the complete restaurant menu

## Prerequisites

- Python 3.7 or higher
- PostgreSQL database
- pgAdmin (optional, for database management)

## Installation

1. **Clone or download the project files**

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
   
   **Note for Windows users:** If you encounter build errors with psycopg2-binary, try one of these solutions:
   - Install Microsoft Visual C++ Build Tools: https://visualstudio.microsoft.com/visual-cpp-build-tools/
   - Or use a pre-compiled wheel: `pip install --only-binary=psycopg2-binary psycopg2-binary`
   - Or install PostgreSQL development libraries and use: `pip install psycopg2` (without -binary)

3. **Set up PostgreSQL database:**
   - Open pgAdmin or connect to your PostgreSQL server
   - Run the SQL script in `database_setup.sql` to create the database and table
   - Or manually create a database named `restaurant_menu` and run:
     ```sql
     CREATE TABLE Menu_Items (
         item_id SERIAL PRIMARY KEY,
         item_name VARCHAR(30) NOT NULL,
         item_price SMALLINT DEFAULT 0
     );
     ```

4. **Configure database connection:**
   - Copy the environment template file:
     ```bash
     copy env_template.txt .env
     ```
   - Edit the `.env` file with your actual database credentials:
     ```
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=restaurant_menu
     DB_USER=your_actual_username
     DB_PASSWORD=your_actual_password
     ```
   - Or modify the `config.py` file directly with your database settings

## Usage

1. **Run the application:**
   ```bash
   python menu_editor.py
   ```

2. **Follow the menu prompts:**
   - **V** - View a specific item
   - **A** - Add a new item
   - **D** - Delete an item
   - **U** - Update an item
   - **S** - Show the complete menu
   - **E** - Exit the program

## Project Structure

- `menu_item.py` - MenuItem class with database operations
- `menu_manager.py` - MenuManager class with query methods
- `menu_editor.py` - Main application interface
- `config.py` - Database configuration
- `database_setup.sql` - Database setup script
- `requirements.txt` - Python dependencies
- `env_template.txt` - Environment variables template
- `.env` - Environment variables (create from template)

## Example Usage

```python
from menu_item import MenuItem
from menu_manager import MenuManager

# Create and save a new item
item = MenuItem('Burger', 35)
item.save()

# Get an item by name
item2 = MenuManager.get_by_name('Beef Stew')

# Get all items
items = MenuManager.all_items()

# Update an item
item.update('Veggie Burger', 37)

# Delete an item
item.delete()
```

## Database Schema

The `Menu_Items` table contains:
- `item_id` - Auto-incrementing primary key
- `item_name` - Item name (VARCHAR, max 30 characters)
- `item_price` - Item price (SMALLINT, default 0)

## Troubleshooting

- **Database connection errors**: 
  - Check your database credentials in the `.env` file
  - Ensure PostgreSQL is running and accessible
  - Verify the database name, username, and password are correct
- **Table not found**: Run the `database_setup.sql` script to create the required table
- **Permission errors**: Ensure your database user has the necessary permissions to create tables and insert/update/delete data
- **Environment file issues**: Make sure you've copied `env_template.txt` to `.env` and updated the values
- **Module not found errors**: Ensure all dependencies are installed with `pip install -r requirements.txt`
- **psycopg2-binary build errors on Windows**: 
  - Try: `pip install --only-binary=psycopg2-binary psycopg2-binary`
  - Or install Microsoft Visual C++ Build Tools
  - Or use: `pip install psycopg2` (requires PostgreSQL development libraries)
