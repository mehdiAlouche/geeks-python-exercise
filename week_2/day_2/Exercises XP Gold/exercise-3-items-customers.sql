-- Exercise 3: Items and customers
-- Working with the public database

-- Part I: Create purchases table
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    item_id INTEGER REFERENCES items(id),
    quantity_purchased INTEGER
);

-- Insert purchases using subqueries
-- Scott Scott bought one fan
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE firstname = 'Scott' AND lastname = 'Scott'),
    (SELECT id FROM items WHERE name = 'Fan'),
    1
);

-- Melanie Johnson bought ten large desks
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE firstname = 'Melanie' AND lastname = 'Johnson'),
    (SELECT id FROM items WHERE name = 'Large Desk'),
    10
);

-- Greg Jones bought two small desks
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE firstname = 'Greg' AND lastname = 'Jones'),
    (SELECT id FROM items WHERE name = 'Small Desk'),
    2
);

-- Verify the purchases table
SELECT * FROM purchases;

-- Part II: SQL Queries

-- 1. All purchases. Is this information useful to us?
SELECT * FROM purchases;
-- This information is not very useful by itself because we only see IDs, 
-- not the actual customer names or item names.

-- 2. All purchases, joining with the customers table
SELECT 
    p.id,
    p.quantity_purchased,
    c.firstname,
    c.lastname
FROM purchases p
JOIN customers c ON p.customer_id = c.id;

-- 3. Purchases of the customer with the ID equal to 5
SELECT * FROM purchases WHERE customer_id = 5;

-- 4. Purchases for a large desk AND a small desk
SELECT p.*, i.name as item_name
FROM purchases p
JOIN items i ON p.item_id = i.id
WHERE i.name IN ('Large Desk', 'Small Desk');

-- 5. Show all customers who have made a purchase with first name, last name, and item name
SELECT 
    c.firstname,
    c.lastname,
    i.name as item_name
FROM purchases p
JOIN customers c ON p.customer_id = c.id
JOIN items i ON p.item_id = i.id;

-- 6. Add a row which references a customer by ID, but does not reference an item by ID
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (2, NULL, 5);

-- Check if this worked
SELECT * FROM purchases WHERE customer_id = 2 AND item_id IS NULL;

-- This works because the item_id column doesn't have a NOT NULL constraint.
-- However, this creates a data integrity issue because we have a purchase
-- without knowing what item was purchased. In a real-world scenario, 
-- we would typically add a NOT NULL constraint to prevent this.
