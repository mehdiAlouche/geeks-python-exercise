-- Database setup script for Restaurant Menu Manager
-- Run this script in pgAdmin or psql to create the database and table

-- Create database (uncomment if you need to create a new database)
-- CREATE DATABASE restaurant_menu;

-- Connect to the restaurant_menu database
-- \c restaurant_menu;

-- Create the Menu_Items table
CREATE TABLE IF NOT EXISTS Menu_Items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(30) NOT NULL,
    item_price SMALLINT DEFAULT 0
);

-- Insert some sample data (optional)
INSERT INTO Menu_Items (item_name, item_price) VALUES 
('Burger', 35),
('Pizza', 45),
('Pasta', 25),
('Salad', 20),
('Soup', 15)
ON CONFLICT DO NOTHING;
