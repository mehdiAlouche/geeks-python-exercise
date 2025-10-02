# Restaurant Menu Manager - Flask Web Application

A simple web application for managing restaurant menu items using Flask and PostgreSQL.

## Features

- ✅ View all menu items
- ✅ Add new menu items
- ✅ Update existing menu items
- ✅ Delete menu items
- ✅ Responsive Bootstrap UI
- ✅ Database integration with PostgreSQL

## Setup Instructions

### Prerequisites

- Python 3.7+
- PostgreSQL database
- pip (Python package installer)

### Installation

1. **Clone or download this project**

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure Database:**
   - Make sure PostgreSQL is running
   - Create a `.env` file in the project root (copy from `env_example.txt`):
     ```bash
     # Database Configuration
     DB_HOST=localhost
     DB_NAME=restaurant_db
     DB_USER=postgres
     DB_PASSWORD=your_password_here
     DB_PORT=5432
     
     # Flask Configuration
     SECRET_KEY=your-secret-key-here
     FLASK_DEBUG=True
     ```
   - Update the values in `.env` file with your actual database credentials

4. **Run the application:**
   ```bash
   python app.py
   ```

5. **Access the application:**
   - Open your web browser
   - Navigate to `http://localhost:5000`

## Database Schema

The application uses a `Menu_Items` table with the following structure:

```sql
CREATE TABLE Menu_Items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(30) NOT NULL,
    item_price SMALLINT DEFAULT 0
);
```

## API Endpoints

- `GET /` - Redirects to menu page
- `GET /menu` - Display all menu items
- `GET /add` - Show add item form
- `POST /add` - Add new menu item
- `GET /update/<item_id>` - Show update form for specific item
- `POST /update/<item_id>` - Update specific item
- `POST /delete/<item_id>` - Delete specific item

## Usage

1. **View Menu:** Navigate to the home page to see all menu items
2. **Add Item:** Click "Add New Item" button and fill out the form
3. **Update Item:** Click "Update" button on any item card
4. **Delete Item:** Click "Delete" button on any item card (with confirmation)

## File Structure

```
Restaurant Menu Manager FLASK APP/
├── app.py                 # Main Flask application
├── config.py              # Database and Flask configuration
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── env_example.txt       # Environment variables example
├── .env                  # Environment variables (create this file)
└── templates/            # HTML templates
    ├── base.html         # Base template with navigation
    ├── menu.html         # Menu listing page
    ├── add_item.html     # Add item form
    └── update_item.html  # Update item form
```

## Troubleshooting

- **Database Connection Error:** Check your PostgreSQL service is running and credentials are correct
- **Port Already in Use:** Change the port in `app.py` or stop other services using port 5000
- **Module Not Found:** Make sure all dependencies are installed with `pip install -r requirements.txt`
