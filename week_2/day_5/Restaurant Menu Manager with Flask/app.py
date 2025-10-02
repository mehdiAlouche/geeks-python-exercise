from flask import Flask, render_template, request, redirect, url_for, flash
import psycopg2
from psycopg2.extras import RealDictCursor
from config import DB_CONFIG, Config

app = Flask(__name__)
app.config.from_object(Config)

def get_db_connection():
    """Get database connection"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except psycopg2.Error as e:
        print(f"Database connection error: {e}")
        return None

def init_database():
    """Initialize database and create Menu_Items table if it doesn't exist"""
    conn = get_db_connection()
    if conn:
        try:
            cur = conn.cursor()
            # Create Menu_Items table if it doesn't exist
            cur.execute("""
                CREATE TABLE IF NOT EXISTS Menu_Items (
                    item_id SERIAL PRIMARY KEY,
                    item_name VARCHAR(30) NOT NULL,
                    item_price SMALLINT DEFAULT 0
                )
            """)
            conn.commit()
            cur.close()
            conn.close()
            print("Database initialized successfully")
        except psycopg2.Error as e:
            print(f"Database initialization error: {e}")

@app.route('/')
def index():
    """Redirect to menu page"""
    return redirect(url_for('menu'))

@app.route('/menu')
def menu():
    """Display all menu items"""
    conn = get_db_connection()
    if not conn:
        flash('Database connection failed', 'error')
        return render_template('menu.html', items=[])
    
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM Menu_Items ORDER BY item_id")
        items = cur.fetchall()
        cur.close()
        conn.close()
        return render_template('menu.html', items=items)
    except psycopg2.Error as e:
        flash(f'Error fetching menu items: {e}', 'error')
        return render_template('menu.html', items=[])

@app.route('/add', methods=['GET', 'POST'])
def add_item():
    """Add a new menu item"""
    if request.method == 'POST':
        name = request.form.get('name')
        price = request.form.get('price')
        
        if not name or not price:
            flash('Name and price are required', 'error')
            return render_template('add_item.html')
        
        try:
            price = float(price)
            if price < 0:
                flash('Price must be positive', 'error')
                return render_template('add_item.html')
        except ValueError:
            flash('Price must be a valid number', 'error')
            return render_template('add_item.html')
        
        conn = get_db_connection()
        if not conn:
            flash('Database connection failed', 'error')
            return render_template('add_item.html')
        
        try:
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s)",
                (name, int(price))
            )
            conn.commit()
            cur.close()
            conn.close()
            flash('Item added successfully!', 'success')
            return redirect(url_for('menu'))
        except psycopg2.Error as e:
            flash(f'Error adding item: {e}', 'error')
            return render_template('add_item.html')
    
    return render_template('add_item.html')

@app.route('/delete/<int:item_id>', methods=['POST'])
def delete_item(item_id):
    """Delete a menu item by ID"""
    conn = get_db_connection()
    if not conn:
        flash('Database connection failed', 'error')
        return redirect(url_for('menu'))
    
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM Menu_Items WHERE item_id = %s", (item_id,))
        if cur.rowcount == 0:
            flash('Item not found', 'error')
        else:
            flash('Item deleted successfully!', 'success')
        conn.commit()
        cur.close()
        conn.close()
    except psycopg2.Error as e:
        flash(f'Error deleting item: {e}', 'error')
    
    return redirect(url_for('menu'))

@app.route('/update/<int:item_id>', methods=['GET', 'POST'])
def update_item(item_id):
    """Update a menu item by ID"""
    conn = get_db_connection()
    if not conn:
        flash('Database connection failed', 'error')
        return redirect(url_for('menu'))
    
    if request.method == 'POST':
        name = request.form.get('name')
        price = request.form.get('price')
        
        if not name or not price:
            flash('Name and price are required', 'error')
            return redirect(url_for('update_item', item_id=item_id))
        
        try:
            price = float(price)
            if price < 0:
                flash('Price must be positive', 'error')
                return redirect(url_for('update_item', item_id=item_id))
        except ValueError:
            flash('Price must be a valid number', 'error')
            return redirect(url_for('update_item', item_id=item_id))
        
        try:
            cur = conn.cursor()
            cur.execute(
                "UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_id = %s",
                (name, int(price), item_id)
            )
            if cur.rowcount == 0:
                flash('Item not found', 'error')
            else:
                flash('Item updated successfully!', 'success')
            conn.commit()
            cur.close()
            conn.close()
            return redirect(url_for('menu'))
        except psycopg2.Error as e:
            flash(f'Error updating item: {e}', 'error')
            return redirect(url_for('update_item', item_id=item_id))
    
    # GET request - show update form
    try:
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM Menu_Items WHERE item_id = %s", (item_id,))
        item = cur.fetchone()
        cur.close()
        conn.close()
        
        if not item:
            flash('Item not found', 'error')
            return redirect(url_for('menu'))
        
        return render_template('update_item.html', item=item)
    except psycopg2.Error as e:
        flash(f'Error fetching item: {e}', 'error')
        return redirect(url_for('menu'))

if __name__ == '__main__':
    # Initialize database on startup
    init_database()
    app.run(debug=app.config['DEBUG'])
