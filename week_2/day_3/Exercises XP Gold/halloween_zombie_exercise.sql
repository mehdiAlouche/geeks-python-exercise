-- Exercise 2: Happy Halloween - Zombie Plague DVD Rental Emergency
-- SQL queries for DVD rental database during zombie apocalypse

-- ==============================================
-- Exercise 2.1: How many stores there are, and in which city and country they are located
-- ==============================================

SELECT 
    s.store_id,
    s.manager_staff_id,
    a.address,
    a.district,
    c.city,
    co.country,
    a.postal_code,
    a.phone
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id
ORDER BY s.store_id;

-- Summary count of stores by country
SELECT 
    co.country,
    COUNT(s.store_id) as store_count
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id
GROUP BY co.country
ORDER BY store_count DESC, co.country;

-- Summary count of stores by city
SELECT 
    c.city,
    co.country,
    COUNT(s.store_id) as store_count
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id
GROUP BY c.city, co.country
ORDER BY store_count DESC, c.city;

-- ==============================================
-- Exercise 2.2: Total viewing hours per store (excluding unreturned items)
-- ==============================================

-- Calculate total viewing time per store, excluding unreturned items
SELECT 
    s.store_id,
    c.city,
    co.country,
    COUNT(i.inventory_id) as total_items,
    SUM(f.length) as total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) as total_hours,
    ROUND(SUM(f.length) / 60.0 / 24.0, 2) as total_days
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id
JOIN inventory i ON s.store_id = i.store_id
JOIN film f ON i.film_id = f.film_id
WHERE i.inventory_id NOT IN (
    -- Exclude inventory items that are currently rented out
    SELECT DISTINCT r.inventory_id
    FROM rental r
    WHERE r.return_date IS NULL
)
GROUP BY s.store_id, c.city, co.country
ORDER BY s.store_id;

-- Alternative approach using LEFT JOIN to exclude unreturned items
SELECT 
    s.store_id,
    c.city,
    co.country,
    COUNT(i.inventory_id) as total_items,
    SUM(f.length) as total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) as total_hours,
    ROUND(SUM(f.length) / 60.0 / 24.0, 2) as total_days
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id
JOIN inventory i ON s.store_id = i.store_id
JOIN film f ON i.film_id = f.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id AND r.return_date IS NULL
WHERE r.rental_id IS NULL  -- Only include items that are not currently rented
GROUP BY s.store_id, c.city, co.country
ORDER BY s.store_id;

-- ==============================================
-- Exercise 2.3: List of all customers in cities where stores are located
-- ==============================================

-- Get all customers in cities where stores are located
SELECT DISTINCT
    cu.customer_id,
    cu.first_name,
    cu.last_name,
    cu.email,
    cu.active,
    c.city,
    co.country
FROM customer cu
JOIN address a ON cu.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id
WHERE c.city_id IN (
    -- Cities where stores are located
    SELECT DISTINCT a2.city_id
    FROM store s
    JOIN address a2 ON s.address_id = a2.address_id
)
ORDER BY co.country, c.city, cu.last_name, cu.first_name;

-- Summary count of customers by city where stores are located
SELECT 
    c.city,
    co.country,
    COUNT(DISTINCT cu.customer_id) as customer_count
FROM customer cu
JOIN address a ON cu.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id
WHERE c.city_id IN (
    SELECT DISTINCT a2.city_id
    FROM store s
    JOIN address a2 ON s.address_id = a2.address_id
)
GROUP BY c.city, co.country
ORDER BY customer_count DESC, c.city;

-- ==============================================
-- Exercise 2.4: List of all customers in countries where stores are located
-- ==============================================

-- Get all customers in countries where stores are located
SELECT DISTINCT
    cu.customer_id,
    cu.first_name,
    cu.last_name,
    cu.email,
    cu.active,
    c.city,
    co.country
FROM customer cu
JOIN address a ON cu.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id
WHERE co.country_id IN (
    -- Countries where stores are located
    SELECT DISTINCT co2.country_id
    FROM store s
    JOIN address a2 ON s.address_id = a2.address_id
    JOIN city c2 ON a2.city_id = c2.city_id
    JOIN country co2 ON c2.country_id = co2.country_id
)
ORDER BY co.country, c.city, cu.last_name, cu.first_name;

-- Summary count of customers by country where stores are located
SELECT 
    co.country,
    COUNT(DISTINCT cu.customer_id) as customer_count
FROM customer cu
JOIN address a ON cu.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id
WHERE co.country_id IN (
    SELECT DISTINCT co2.country_id
    FROM store s
    JOIN address a2 ON s.address_id = a2.address_id
    JOIN city c2 ON a2.city_id = c2.city_id
    JOIN country co2 ON c2.country_id = co2.country_id
)
GROUP BY co.country
ORDER BY customer_count DESC, co.country;

-- ==============================================
-- Exercise 2.5: Create 'safe list' of non-scary movies
-- ==============================================

-- Safe list: Movies without Horror category and without scary words
SELECT 
    f.film_id,
    f.title,
    f.description,
    f.length,
    f.rating,
    f.rental_rate,
    STRING_AGG(c.name, ', ' ORDER BY c.name) as categories
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE c.name != 'Horror'  -- Exclude Horror category
AND f.film_id NOT IN (
    -- Exclude films with scary words in title or description
    SELECT film_id
    FROM film
    WHERE LOWER(title) LIKE '%beast%'
    OR LOWER(title) LIKE '%monster%'
    OR LOWER(title) LIKE '%ghost%'
    OR LOWER(title) LIKE '%dead%'
    OR LOWER(title) LIKE '%zombie%'
    OR LOWER(title) LIKE '%undead%'
    OR LOWER(description) LIKE '%beast%'
    OR LOWER(description) LIKE '%monster%'
    OR LOWER(description) LIKE '%ghost%'
    OR LOWER(description) LIKE '%dead%'
    OR LOWER(description) LIKE '%zombie%'
    OR LOWER(description) LIKE '%undead%'
)
GROUP BY f.film_id, f.title, f.description, f.length, f.rating, f.rental_rate
ORDER BY f.title;

-- Alternative approach using CHECK constraint logic (as hinted)
-- This creates a view that can be used as a CHECK constraint
CREATE OR REPLACE VIEW safe_movies AS
SELECT 
    f.film_id,
    f.title,
    f.description,
    f.length,
    f.rating,
    f.rental_rate
FROM film f
WHERE f.film_id NOT IN (
    -- Exclude Horror category films
    SELECT fc.film_id
    FROM film_category fc
    JOIN category c ON fc.category_id = c.category_id
    WHERE c.name = 'Horror'
)
AND f.film_id NOT IN (
    -- Exclude films with scary words
    SELECT film_id
    FROM film
    WHERE LOWER(title) LIKE '%beast%'
    OR LOWER(title) LIKE '%monster%'
    OR LOWER(title) LIKE '%ghost%'
    OR LOWER(title) LIKE '%dead%'
    OR LOWER(title) LIKE '%zombie%'
    OR LOWER(title) LIKE '%undead%'
    OR LOWER(description) LIKE '%beast%'
    OR LOWER(description) LIKE '%monster%'
    OR LOWER(description) LIKE '%ghost%'
    OR LOWER(description) LIKE '%dead%'
    OR LOWER(description) LIKE '%zombie%'
    OR LOWER(description) LIKE '%undead%'
);

-- ==============================================
-- Exercise 2.6: Calculate viewing time in hours and days for both lists
-- ==============================================

-- General list: All available movies (excluding unreturned items)
SELECT 
    'General List' as list_type,
    COUNT(f.film_id) as total_films,
    SUM(f.length) as total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) as total_hours,
    ROUND(SUM(f.length) / 60.0 / 24.0, 2) as total_days
FROM film f
JOIN inventory i ON f.film_id = i.film_id
WHERE i.inventory_id NOT IN (
    SELECT DISTINCT r.inventory_id
    FROM rental r
    WHERE r.return_date IS NULL
);

-- Safe list: Non-scary movies (excluding unreturned items)
SELECT 
    'Safe List' as list_type,
    COUNT(f.film_id) as total_films,
    SUM(f.length) as total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) as total_hours,
    ROUND(SUM(f.length) / 60.0 / 24.0, 2) as total_days
FROM film f
JOIN inventory i ON f.film_id = i.film_id
WHERE f.film_id IN (
    SELECT film_id FROM safe_movies
)
AND i.inventory_id NOT IN (
    SELECT DISTINCT r.inventory_id
    FROM rental r
    WHERE r.return_date IS NULL
);

-- Combined comparison of both lists
SELECT 
    'General List' as list_type,
    COUNT(f.film_id) as total_films,
    SUM(f.length) as total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) as total_hours,
    ROUND(SUM(f.length) / 60.0 / 24.0, 2) as total_days
FROM film f
JOIN inventory i ON f.film_id = i.film_id
WHERE i.inventory_id NOT IN (
    SELECT DISTINCT r.inventory_id
    FROM rental r
    WHERE r.return_date IS NULL
)

UNION ALL

SELECT 
    'Safe List' as list_type,
    COUNT(f.film_id) as total_films,
    SUM(f.length) as total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) as total_hours,
    ROUND(SUM(f.length) / 60.0 / 24.0, 2) as total_days
FROM film f
JOIN inventory i ON f.film_id = i.film_id
WHERE f.film_id IN (
    SELECT film_id FROM safe_movies
)
AND i.inventory_id NOT IN (
    SELECT DISTINCT r.inventory_id
    FROM rental r
    WHERE r.return_date IS NULL
);

-- ==============================================
-- Additional Emergency Preparedness Queries
-- ==============================================

-- Store-by-store breakdown of safe vs general movies
SELECT 
    s.store_id,
    c.city,
    co.country,
    COUNT(f.film_id) as total_films,
    COUNT(CASE WHEN f.film_id IN (SELECT film_id FROM safe_movies) THEN 1 END) as safe_films,
    COUNT(CASE WHEN f.film_id NOT IN (SELECT film_id FROM safe_movies) THEN 1 END) as general_films,
    SUM(f.length) as total_minutes,
    ROUND(SUM(f.length) / 60.0, 2) as total_hours,
    ROUND(SUM(f.length) / 60.0 / 24.0, 2) as total_days
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id
JOIN inventory i ON s.store_id = i.store_id
JOIN film f ON i.film_id = f.film_id
WHERE i.inventory_id NOT IN (
    SELECT DISTINCT r.inventory_id
    FROM rental r
    WHERE r.return_date IS NULL
)
GROUP BY s.store_id, c.city, co.country
ORDER BY s.store_id;

-- Top 10 longest safe movies for extended shelter stays
SELECT 
    f.film_id,
    f.title,
    f.length,
    ROUND(f.length / 60.0, 2) as hours,
    ROUND(f.length / 60.0 / 24.0, 2) as days
FROM film f
WHERE f.film_id IN (SELECT film_id FROM safe_movies)
ORDER BY f.length DESC
LIMIT 10;

-- Emergency contact list for stores
SELECT 
    s.store_id,
    c.city,
    co.country,
    a.address,
    a.phone,
    st.first_name as manager_first_name,
    st.last_name as manager_last_name,
    st.email as manager_email
FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id
JOIN staff st ON s.manager_staff_id = st.staff_id
ORDER BY s.store_id;
