-- Exercise 1: DVD Rental - SQL Queries
-- SQL queries for DVD rental database operations

-- ==============================================
-- Exercise 1.1: Find out how many films there are for each rating
-- ==============================================
SELECT rating, COUNT(*) as film_count
FROM film
GROUP BY rating
ORDER BY rating;

-- ==============================================
-- Exercise 1.2: Get a list of all movies that have a rating of G or PG-13
-- ==============================================
SELECT film_id, title, rating, length, rental_rate
FROM film
WHERE rating IN ('G', 'PG-13')
ORDER BY title;

-- ==============================================
-- Exercise 1.3: Filter movies: under 2 hours, rental_rate < 3.00, sort alphabetically
-- ==============================================
SELECT film_id, title, rating, length, rental_rate
FROM film
WHERE rating IN ('G', 'PG-13')
AND length < 120  -- 2 hours = 120 minutes
AND rental_rate < 3.00
ORDER BY title;

-- ==============================================
-- Exercise 1.4: Find a customer and change his/her details to your details
-- ==============================================

-- First, let's see some existing customers
SELECT customer_id, first_name, last_name, email
FROM customer
LIMIT 5;

-- Update customer details (using customer_id = 1 as example)
-- Replace with your actual details
UPDATE customer
SET first_name = 'John',
    last_name = 'Doe',
    email = 'john.doe@email.com'
WHERE customer_id = 1;

-- Verify the update
SELECT customer_id, first_name, last_name, email
FROM customer
WHERE customer_id = 1;

-- ==============================================
-- Exercise 1.5: Find customer's address and update to your address
-- ==============================================

-- First, get the customer's current address
SELECT c.customer_id, c.first_name, c.last_name, 
       a.address, a.address2, a.district, a.city_id, a.postal_code, a.phone
FROM customer c
JOIN address a ON c.address_id = a.address_id
WHERE c.customer_id = 1;

-- Update with your address details
UPDATE address
SET address = '123 Main Street',
    address2 = 'Apt 4B',
    district = 'Downtown',
    postal_code = '12345',
    phone = '555-123-4567'
WHERE address_id = (SELECT address_id FROM customer WHERE customer_id = 1);

-- Verify the update
SELECT c.customer_id, c.first_name, c.last_name, 
       a.address, a.address2, a.district, a.postal_code, a.phone
FROM customer c
JOIN address a ON c.address_id = a.address_id
WHERE c.customer_id = 1;

-- ==============================================
-- Additional Useful Queries
-- ==============================================

-- Show all available ratings in the database
SELECT DISTINCT rating
FROM film
ORDER BY rating;

-- Show film length statistics
SELECT 
    MIN(length) as shortest_film,
    MAX(length) as longest_film,
    AVG(length) as average_length,
    COUNT(*) as total_films
FROM film;

-- Show rental rate statistics
SELECT 
    MIN(rental_rate) as lowest_rate,
    MAX(rental_rate) as highest_rate,
    AVG(rental_rate) as average_rate
FROM film;

-- Show films by rating with detailed statistics
SELECT 
    rating,
    COUNT(*) as film_count,
    MIN(length) as min_length,
    MAX(length) as max_length,
    AVG(length) as avg_length,
    MIN(rental_rate) as min_rate,
    MAX(rental_rate) as max_rate,
    AVG(rental_rate) as avg_rate
FROM film
GROUP BY rating
ORDER BY rating;
