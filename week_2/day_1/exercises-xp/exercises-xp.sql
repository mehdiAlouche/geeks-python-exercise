-- Create database
    CREATE DATABASE public
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
-- Create items table
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    price INT
);

-- Create customers table
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50)
);

-- Insert data into items
INSERT INTO items (name, price) VALUES
('Small Desk', 100),
('Large Desk', 300),
('Fan', 80);

-- Insert data into customers
INSERT INTO customers (firstname, lastname) VALUES
('Greg', 'Jones'),
('Sandra', 'Jones'),
('Scott', 'Scott'),
('Trevor', 'Green'),
('Melanie', 'Johnson');

-- Queries:

-- 1. All the items
SELECT * FROM items;

-- 2. All the items with a price above 80 (80 not included)
SELECT * FROM items WHERE price > 80;

-- 3. All the items with a price below 300 (300 included)
SELECT * FROM items WHERE price <= 300;

-- 4. All customers whose last name is 'Smith'
SELECT * FROM customers WHERE lastname = 'Smith';
-- (Outcome: No rows, because none of the customers has lastname 'Smith')

-- 5. All customers whose last name is 'Jones'
SELECT * FROM customers WHERE lastname = 'Jones';

-- 6. All customers whose firstname is not 'Scott'
SELECT * FROM customers WHERE firstname <> 'Scott';
