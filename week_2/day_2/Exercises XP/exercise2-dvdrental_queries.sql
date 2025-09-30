
-- 1. Select all the columns from the customer table
SELECT * 
FROM customer;

-- 2. Display names using alias full_name
SELECT first_name || ' ' || last_name AS full_name
FROM customer;

-- 3. Get all unique create_date values (no duplicates)
SELECT DISTINCT create_date
FROM customer;

-- 4. Get all customer details ordered by first name (descending)
SELECT * 
FROM customer
ORDER BY first_name DESC;

-- 5. Get film details ordered by rental rate (ascending)
SELECT film_id, title, description, release_year, rental_rate
FROM film
ORDER BY rental_rate ASC;

-- 6. Get address and phone number of customers in Texas
SELECT address, phone
FROM address
WHERE district = 'Texas';

-- 7. Get movie details where film_id = 15 or 150
SELECT * 
FROM film
WHERE film_id IN (15, 150);

-- 8. Check if your favorite movie exists (example: "Inception")
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title = 'Inception';

-- 9. Get movies starting with the first two letters of your favorite movie (example: "In")
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title LIKE 'In%';

-- 10. Find the 10 cheapest movies
SELECT * 
FROM film
ORDER BY rental_rate ASC
LIMIT 10;

-- 11. Find the next 10 cheapest movies (without using LIMIT → use OFFSET/FETCH)
SELECT *
FROM film
ORDER BY rental_rate ASC
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;

-- Alternative for PostgreSQL
-- SELECT *
-- FROM film
-- ORDER BY rental_rate ASC
-- LIMIT 10 OFFSET 10;

-- 12. Join customer & payment to get payments ordered by customer_id
SELECT c.first_name, c.last_name, p.amount, p.payment_date
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY c.customer_id;

-- 13. Get all movies not in inventory
SELECT f.*
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
WHERE i.inventory_id IS NULL;

-- 14. Find which city is in which country
SELECT ci.city, co.country
FROM city ci
JOIN country co ON ci.country_id = co.country_id;

-- 15. Bonus: Get customers and payments ordered by staff_id
SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date, p.staff_id
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
ORDER BY p.staff_id;
