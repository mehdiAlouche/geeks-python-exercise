-- Product Orders Exercise
-- Creating tables with one-to-many relationships and functions

-- Create users table first (referenced by product_orders)
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create product_orders table (references users)
CREATE TABLE product_orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    shipping_address TEXT,
    notes TEXT
);

-- Create items table (references product_orders)
CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES product_orders(order_id) ON DELETE CASCADE,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    category VARCHAR(50)
);

-- Create indexes for better performance
CREATE INDEX idx_product_orders_user_id ON product_orders(user_id);
CREATE INDEX idx_items_order_id ON items(order_id);
CREATE INDEX idx_items_price ON items(price);

-- Function to return total price for a given order
CREATE OR REPLACE FUNCTION get_order_total(order_id_param INTEGER)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
    total_amount DECIMAL(10, 2);
BEGIN
    SELECT COALESCE(SUM(price * quantity), 0)
    INTO total_amount
    FROM items
    WHERE order_id = order_id_param;
    
    RETURN total_amount;
END;
$$ LANGUAGE plpgsql;

-- Function to return total price for a given order of a given user (Bonus)
CREATE OR REPLACE FUNCTION get_user_order_total(user_id_param INTEGER, order_id_param INTEGER)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
    total_amount DECIMAL(10, 2);
    order_exists BOOLEAN;
BEGIN
    -- Check if the order belongs to the user
    SELECT EXISTS(
        SELECT 1 
        FROM product_orders 
        WHERE order_id = order_id_param 
        AND user_id = user_id_param
    ) INTO order_exists;
    
    IF NOT order_exists THEN
        RAISE EXCEPTION 'Order % does not belong to user %', order_id_param, user_id_param;
    END IF;
    
    SELECT COALESCE(SUM(price * quantity), 0)
    INTO total_amount
    FROM items
    WHERE order_id = order_id_param;
    
    RETURN total_amount;
END;
$$ LANGUAGE plpgsql;

-- Insert sample data for testing with Moroccan names and locations
INSERT INTO users (username, email, first_name, last_name) VALUES
('ahmed_benali', 'ahmed.benali@example.ma', 'Ahmed', 'Benali'),
('fatima_alaoui', 'fatima.alaoui@example.ma', 'Fatima', 'Alaoui'),
('youssef_amrani', 'youssef.amrani@example.ma', 'Youssef', 'Amrani');

INSERT INTO product_orders (user_id, status, shipping_address) VALUES
(1, 'delivered', 'Avenue Mohammed V, Casablanca, Morocco'),
(1, 'processing', 'Rue Hassan II, Rabat, Morocco'),
(2, 'shipped', 'Place Jemaa el-Fnaa, Marrakech, Morocco'),
(3, 'pending', 'Medina, Fes, Morocco');

INSERT INTO items (order_id, product_name, description, price, quantity, category) VALUES
-- Order 1 items
(1, 'Laptop', 'High-performance laptop', 9999.99, 1, 'Electronics'),
(1, 'Mouse', 'Wireless mouse', 299.99, 1, 'Electronics'),
(1, 'Keyboard', 'Mechanical keyboard', 899.99, 1, 'Electronics'),

-- Order 2 items
(2, 'Headphones', 'Noise-canceling headphones', 1999.99, 1, 'Electronics'),
(2, 'Phone Case', 'Protective phone case', 199.99, 2, 'Accessories'),

-- Order 3 items
(3, 'Book', 'Programming guide', 499.99, 1, 'Books'),
(3, 'Notebook', 'Spiral notebook', 59.99, 3, 'Office Supplies'),
(3, 'Pen Set', 'Professional pen set', 249.99, 1, 'Office Supplies'),

-- Order 4 items
(4, 'Tajine Pot', 'Traditional Moroccan ceramic tajine', 1299.99, 1, 'Home & Kitchen');

-- Test the functions
SELECT 'Testing get_order_total function:' as test_description;

-- Test total for order 1 (should be 11199.97 MAD)
SELECT 
    order_id,
    get_order_total(order_id) as total_price
FROM product_orders 
WHERE order_id = 1;

-- Test total for order 2 (should be 2399.97 MAD)
SELECT 
    order_id,
    get_order_total(order_id) as total_price
FROM product_orders 
WHERE order_id = 2;

-- Test total for order 3 (should be 909.95 MAD)
SELECT 
    order_id,
    get_order_total(order_id) as total_price
FROM product_orders 
WHERE order_id = 3;

SELECT 'Testing get_user_order_total function:' as test_description;

-- Test user 1, order 1 (should be 11199.97 MAD)
SELECT 
    user_id,
    order_id,
    get_user_order_total(user_id, order_id) as total_price
FROM product_orders 
WHERE user_id = 1 AND order_id = 1;

-- Test user 2, order 3 (should be 909.95 MAD)
SELECT 
    user_id,
    order_id,
    get_user_order_total(user_id, order_id) as total_price
FROM product_orders 
WHERE user_id = 2 AND order_id = 3;

-- Test error case: user 1 trying to access order 3 (should raise exception)
-- Uncomment the line below to test the error handling:
-- SELECT get_user_order_total(1, 3);

-- Display all orders with their totals
SELECT 
    po.order_id,
    u.username,
    po.order_date,
    po.status,
    get_order_total(po.order_id) as total_price,
    COUNT(i.item_id) as item_count
FROM product_orders po
JOIN users u ON po.user_id = u.user_id
LEFT JOIN items i ON po.order_id = i.order_id
GROUP BY po.order_id, u.username, po.order_date, po.status
ORDER BY po.order_id;
