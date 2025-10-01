-- Exercise 1: DVD Rentals
-- SQL queries for DVD rental database operations

-- ==============================================
-- Question: How do we identify films that are out (not returned)?
-- ==============================================
-- Films that are out can be identified by:
-- 1. rental.return_date IS NULL (most common approach)
-- 2. rental.rental_date + rental.rental_duration < CURRENT_DATE (overdue)
-- 3. Checking if return_date is missing from the rental table

-- ==============================================
-- Exercise 1.1: Get a list of all rentals which are out (have not been returned)
-- ==============================================

-- Basic query to find all unreturned rentals
SELECT 
    r.rental_id,
    r.rental_date,
    r.return_date,
    r.customer_id,
    r.inventory_id,
    f.title as film_title,
    c.first_name,
    c.last_name
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL
ORDER BY r.rental_date DESC;

-- Alternative approach: Include overdue rentals (past due date)
SELECT 
    r.rental_id,
    r.rental_date,
    r.return_date,
    r.customer_id,
    f.title as film_title,
    c.first_name,
    c.last_name,
    f.rental_duration,
    (r.rental_date + INTERVAL '1 day' * f.rental_duration) as due_date,
    CASE 
        WHEN r.return_date IS NULL AND (r.rental_date + INTERVAL '1 day' * f.rental_duration) < CURRENT_DATE 
        THEN 'OVERDUE'
        WHEN r.return_date IS NULL 
        THEN 'OUT'
        ELSE 'RETURNED'
    END as rental_status
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL
ORDER BY r.rental_date DESC;

-- ==============================================
-- Exercise 1.2: Get a list of all customers who have not returned their rentals
-- Make sure to group your results
-- ==============================================

-- Group by customer to show how many rentals each customer has out
SELECT 
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    COUNT(r.rental_id) as rentals_out,
    MIN(r.rental_date) as earliest_rental,
    MAX(r.rental_date) as latest_rental
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
WHERE r.return_date IS NULL
GROUP BY c.customer_id, c.first_name, c.last_name, c.email
ORDER BY rentals_out DESC, c.last_name, c.first_name;

-- More detailed version with film information
SELECT 
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    COUNT(r.rental_id) as rentals_out,
    STRING_AGG(f.title, ', ' ORDER BY r.rental_date DESC) as films_out
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
GROUP BY c.customer_id, c.first_name, c.last_name, c.email
ORDER BY rentals_out DESC, c.last_name, c.first_name;

-- ==============================================
-- Exercise 1.3: Get a list of all the Action films with Joe Swank
-- ==============================================

-- First, let's find Joe Swank's actor_id
SELECT actor_id, first_name, last_name
FROM actor
WHERE first_name = 'Joe' AND last_name = 'Swank';

-- Now get all Action films with Joe Swank
SELECT 
    f.film_id,
    f.title,
    f.description,
    f.release_year,
    f.rating,
    f.rental_rate,
    c.name as category_name,
    a.first_name,
    a.last_name
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE c.name = 'Action'
AND a.first_name = 'Joe' 
AND a.last_name = 'Swank'
ORDER BY f.title;

-- Alternative approach using subquery
SELECT 
    f.film_id,
    f.title,
    f.description,
    f.release_year,
    f.rating,
    f.rental_rate
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE c.name = 'Action'
AND f.film_id IN (
    SELECT fa.film_id
    FROM film_actor fa
    JOIN actor a ON fa.actor_id = a.actor_id
    WHERE a.first_name = 'Joe' AND a.last_name = 'Swank'
)
ORDER BY f.title;

-- ==============================================
-- Exercise 1.4: Before you start, could there be a shortcut to getting this information? Maybe a view?
-- ==============================================

-- Yes! Views can be very helpful shortcuts. Here are some useful views:

-- View 1: Active Rentals (rentals that are currently out)
CREATE OR REPLACE VIEW active_rentals AS
SELECT 
    r.rental_id,
    r.rental_date,
    r.customer_id,
    r.inventory_id,
    f.title as film_title,
    c.first_name,
    c.last_name,
    c.email,
    f.rental_duration,
    (r.rental_date + INTERVAL '1 day' * f.rental_duration) as due_date,
    CASE 
        WHEN (r.rental_date + INTERVAL '1 day' * f.rental_duration) < CURRENT_DATE 
        THEN 'OVERDUE'
        ELSE 'OUT'
    END as rental_status
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL;

-- View 2: Customer Rental Summary
CREATE OR REPLACE VIEW customer_rental_summary AS
SELECT 
    c.customer_id,
    c.first_name,
    c.last_name,
    c.email,
    COUNT(r.rental_id) as total_rentals,
    COUNT(CASE WHEN r.return_date IS NULL THEN 1 END) as rentals_out,
    COUNT(CASE WHEN r.return_date IS NOT NULL THEN 1 END) as rentals_returned,
    MIN(r.rental_date) as first_rental,
    MAX(r.rental_date) as last_rental
FROM customer c
LEFT JOIN rental r ON c.customer_id = r.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name, c.email;

-- View 3: Film Actor Information
CREATE OR REPLACE VIEW film_actor_info AS
SELECT 
    f.film_id,
    f.title,
    f.description,
    f.release_year,
    f.rating,
    f.rental_rate,
    c.name as category_name,
    a.actor_id,
    a.first_name as actor_first_name,
    a.last_name as actor_last_name
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id;

-- ==============================================
-- Using the views for easier queries
-- ==============================================

-- Now we can use the views to make our queries much simpler:

-- 1.1 Using active_rentals view
SELECT * FROM active_rentals ORDER BY rental_date DESC;

-- 1.2 Using customer_rental_summary view
SELECT 
    customer_id,
    first_name,
    last_name,
    email,
    rentals_out
FROM customer_rental_summary
WHERE rentals_out > 0
ORDER BY rentals_out DESC, last_name, first_name;

-- 1.3 Using film_actor_info view
SELECT 
    film_id,
    title,
    description,
    release_year,
    rating,
    rental_rate
FROM film_actor_info
WHERE category_name = 'Action'
AND actor_first_name = 'Joe' 
AND actor_last_name = 'Swank'
ORDER BY title;

-- ==============================================
-- Additional useful queries using views
-- ==============================================

-- Find overdue rentals
SELECT * FROM active_rentals WHERE rental_status = 'OVERDUE' ORDER BY due_date;

-- Find customers with multiple rentals out
SELECT * FROM customer_rental_summary WHERE rentals_out > 1 ORDER BY rentals_out DESC;

-- Find all films by a specific actor
SELECT DISTINCT title, category_name, release_year, rating
FROM film_actor_info
WHERE actor_first_name = 'Joe' AND actor_last_name = 'Swank'
ORDER BY title;

-- ==============================================
-- Performance considerations and indexes
-- ==============================================

-- For better performance, consider creating indexes on frequently queried columns:
-- CREATE INDEX idx_rental_return_date ON rental(return_date);
-- CREATE INDEX idx_rental_customer_id ON rental(customer_id);
-- CREATE INDEX idx_film_actor_actor_id ON film_actor(actor_id);
-- CREATE INDEX idx_film_category_category_id ON film_category(category_id);
