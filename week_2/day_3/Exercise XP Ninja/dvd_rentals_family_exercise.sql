-- Exercise 1: DVD Rentals - Family and Kids Movie Management
-- SQL queries for encouraging families and kids to enjoy movies

-- ==============================================
-- Part 1: Retrieve all films with G or PG rating that are not currently rented
-- ==============================================

-- Query to find all G and PG rated films that are available (not currently rented)
SELECT 
    f.film_id,
    f.title,
    f.description,
    f.release_year,
    f.rating,
    f.rental_duration,
    f.rental_rate,
    f.length,
    f.replacement_cost,
    c.name as category_name,
    COUNT(i.inventory_id) as available_copies
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
JOIN inventory i ON f.film_id = i.film_id
WHERE f.rating IN ('G', 'PG')
AND i.inventory_id NOT IN (
    -- Exclude inventory items that are currently rented out
    SELECT DISTINCT r.inventory_id
    FROM rental r
    WHERE r.return_date IS NULL
)
GROUP BY f.film_id, f.title, f.description, f.release_year, f.rating, 
         f.rental_duration, f.rental_rate, f.length, f.replacement_cost, c.name
ORDER BY f.rating, f.title;

-- Alternative query showing detailed availability per store
SELECT 
    f.film_id,
    f.title,
    f.rating,
    s.store_id,
    c.city as store_city,
    co.country as store_country,
    COUNT(i.inventory_id) as available_copies_at_store
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN store s ON i.store_id = s.store_id
JOIN address a ON s.address_id = a.address_id
JOIN city c ON a.city_id = c.city_id
JOIN country co ON c.country_id = co.country_id
WHERE f.rating IN ('G', 'PG')
AND i.inventory_id NOT IN (
    SELECT DISTINCT r.inventory_id
    FROM rental r
    WHERE r.return_date IS NULL
)
GROUP BY f.film_id, f.title, f.rating, s.store_id, c.city, co.country
ORDER BY f.title, s.store_id;

-- Summary query showing total available children's movies by rating
SELECT 
    f.rating,
    COUNT(DISTINCT f.film_id) as total_films,
    COUNT(i.inventory_id) as total_available_copies
FROM film f
JOIN inventory i ON f.film_id = i.film_id
WHERE f.rating IN ('G', 'PG')
AND i.inventory_id NOT IN (
    SELECT DISTINCT r.inventory_id
    FROM rental r
    WHERE r.return_date IS NULL
)
GROUP BY f.rating
ORDER BY f.rating;

-- ==============================================
-- Part 2: Create a waiting list table for children's movies
-- ==============================================

-- Create the waiting list table
CREATE TABLE children_movie_waiting_list (
    waiting_id SERIAL PRIMARY KEY,
    film_id INTEGER NOT NULL,
    customer_id INTEGER NOT NULL,
    child_name VARCHAR(50) NOT NULL,
    parent_contact VARCHAR(100) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    priority INTEGER DEFAULT 1, -- 1 = highest priority, higher numbers = lower priority
    status VARCHAR(20) DEFAULT 'WAITING', -- WAITING, NOTIFIED, RENTED, CANCELLED
    notes TEXT,
    
    -- Foreign key constraints
    CONSTRAINT fk_waiting_film FOREIGN KEY (film_id) REFERENCES film(film_id) ON DELETE CASCADE,
    CONSTRAINT fk_waiting_customer FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE,
    
    -- Ensure a child can only be on the waiting list once per film
    CONSTRAINT unique_child_film UNIQUE (film_id, customer_id, child_name),
    
    -- Check constraints
    CONSTRAINT chk_rating CHECK (
        film_id IN (
            SELECT film_id FROM film WHERE rating IN ('G', 'PG')
        )
    ),
    CONSTRAINT chk_priority CHECK (priority >= 1 AND priority <= 10),
    CONSTRAINT chk_status CHECK (status IN ('WAITING', 'NOTIFIED', 'RENTED', 'CANCELLED'))
);

-- Create indexes for better performance
CREATE INDEX idx_waiting_film_id ON children_movie_waiting_list(film_id);
CREATE INDEX idx_waiting_customer_id ON children_movie_waiting_list(customer_id);
CREATE INDEX idx_waiting_status ON children_movie_waiting_list(status);
CREATE INDEX idx_waiting_priority ON children_movie_waiting_list(priority, date_added);

-- Create a view to make queries easier
CREATE OR REPLACE VIEW children_waiting_list_view AS
SELECT 
    w.waiting_id,
    w.film_id,
    f.title as film_title,
    f.rating,
    w.customer_id,
    c.first_name as customer_first_name,
    c.last_name as customer_last_name,
    c.email as customer_email,
    w.child_name,
    w.parent_contact,
    w.date_added,
    w.priority,
    w.status,
    w.notes,
    -- Calculate position in queue
    ROW_NUMBER() OVER (PARTITION BY w.film_id ORDER BY w.priority ASC, w.date_added ASC) as queue_position
FROM children_movie_waiting_list w
JOIN film f ON w.film_id = f.film_id
JOIN customer c ON w.customer_id = c.customer_id
WHERE w.status = 'WAITING'
ORDER BY f.title, w.priority, w.date_added;

-- ==============================================
-- Part 3: Retrieve the number of people waiting for each children's DVD
-- ==============================================

-- Query to count people waiting for each children's DVD
SELECT 
    f.film_id,
    f.title,
    f.rating,
    f.rental_duration,
    f.rental_rate,
    COUNT(w.waiting_id) as people_waiting,
    MIN(w.date_added) as first_waiting_date,
    MAX(w.date_added) as last_waiting_date,
    -- Show the next person in line
    MIN(CASE WHEN w.priority = 1 THEN w.child_name END) as next_child_name,
    MIN(CASE WHEN w.priority = 1 THEN w.parent_contact END) as next_parent_contact
FROM film f
LEFT JOIN children_movie_waiting_list w ON f.film_id = w.film_id AND w.status = 'WAITING'
WHERE f.rating IN ('G', 'PG')
GROUP BY f.film_id, f.title, f.rating, f.rental_duration, f.rental_rate
HAVING COUNT(w.waiting_id) > 0
ORDER BY people_waiting DESC, f.title;

-- Detailed view of waiting list with customer information
SELECT 
    f.title as film_title,
    f.rating,
    w.child_name,
    w.parent_contact,
    c.first_name as customer_first_name,
    c.last_name as customer_last_name,
    c.email as customer_email,
    w.date_added,
    w.priority,
    w.queue_position
FROM children_waiting_list_view w
JOIN film f ON w.film_id = f.film_id
ORDER BY f.title, w.queue_position;

-- Summary by rating
SELECT 
    f.rating,
    COUNT(DISTINCT f.film_id) as films_with_waiting_list,
    COUNT(w.waiting_id) as total_people_waiting,
    AVG(people_per_film.people_count) as avg_people_per_film
FROM film f
LEFT JOIN children_movie_waiting_list w ON f.film_id = w.film_id AND w.status = 'WAITING'
LEFT JOIN (
    SELECT 
        film_id, 
        COUNT(*) as people_count
    FROM children_movie_waiting_list 
    WHERE status = 'WAITING'
    GROUP BY film_id
) people_per_film ON f.film_id = people_per_film.film_id
WHERE f.rating IN ('G', 'PG')
GROUP BY f.rating
ORDER BY f.rating;

-- ==============================================
-- Test Data: Add sample rows to the waiting list table
-- ==============================================

-- First, let's see what G and PG films are available
SELECT film_id, title, rating 
FROM film 
WHERE rating IN ('G', 'PG') 
ORDER BY rating, title 
LIMIT 10;

-- Add test data to the waiting list (replace film_id and customer_id with actual values from your database)
-- Note: You'll need to adjust these values based on your actual database

-- Example test data (uncomment and modify as needed):
/*
INSERT INTO children_movie_waiting_list (film_id, customer_id, child_name, parent_contact, priority, notes)
VALUES 
    -- Assuming film_id 1 is a G-rated movie and customer_id 1 exists
    (1, 1, 'Emma Johnson', 'johnson@email.com', 1, 'First in line for this movie'),
    (1, 2, 'Liam Smith', 'smith@email.com', 2, 'Second in line'),
    (1, 3, 'Olivia Brown', 'brown@email.com', 1, 'Same priority as Emma, but added later'),
    
    -- Assuming film_id 2 is a PG-rated movie
    (2, 4, 'Noah Davis', 'davis@email.com', 1, 'Only person waiting for this movie'),
    (2, 5, 'Ava Wilson', 'wilson@email.com', 2, 'Second person for PG movie'),
    
    -- Add more test data as needed
    (3, 6, 'Sophia Miller', 'miller@email.com', 1, 'Waiting for another G-rated movie');
*/

-- ==============================================
-- Additional Useful Queries for Management
-- ==============================================

-- Find films with the longest waiting lists
SELECT 
    f.title,
    f.rating,
    COUNT(w.waiting_id) as people_waiting,
    STRING_AGG(w.child_name, ', ' ORDER BY w.priority, w.date_added) as children_names
FROM film f
JOIN children_movie_waiting_list w ON f.film_id = w.film_id
WHERE w.status = 'WAITING'
GROUP BY f.film_id, f.title, f.rating
ORDER BY people_waiting DESC
LIMIT 10;

-- Find customers with multiple children on waiting lists
SELECT 
    c.first_name,
    c.last_name,
    c.email,
    COUNT(w.waiting_id) as children_on_waiting_lists,
    STRING_AGG(DISTINCT f.title, ', ') as movies_waiting_for
FROM customer c
JOIN children_movie_waiting_list w ON c.customer_id = w.customer_id
JOIN film f ON w.film_id = f.film_id
WHERE w.status = 'WAITING'
GROUP BY c.customer_id, c.first_name, c.last_name, c.email
HAVING COUNT(w.waiting_id) > 1
ORDER BY children_on_waiting_lists DESC;

-- Check for films that are now available but have people waiting
SELECT 
    f.title,
    f.rating,
    COUNT(w.waiting_id) as people_waiting,
    COUNT(available.inventory_id) as available_copies,
    CASE 
        WHEN COUNT(available.inventory_id) > 0 AND COUNT(w.waiting_id) > 0 
        THEN 'READY TO NOTIFY'
        WHEN COUNT(available.inventory_id) = 0 AND COUNT(w.waiting_id) > 0 
        THEN 'STILL WAITING'
        ELSE 'NO WAITING LIST'
    END as status
FROM film f
LEFT JOIN children_movie_waiting_list w ON f.film_id = w.film_id AND w.status = 'WAITING'
LEFT JOIN (
    SELECT DISTINCT i.film_id, i.inventory_id
    FROM inventory i
    WHERE i.inventory_id NOT IN (
        SELECT DISTINCT r.inventory_id
        FROM rental r
        WHERE r.return_date IS NULL
    )
) available ON f.film_id = available.film_id
WHERE f.rating IN ('G', 'PG')
GROUP BY f.film_id, f.title, f.rating
HAVING COUNT(w.waiting_id) > 0
ORDER BY status, people_waiting DESC;

-- ==============================================
-- Helper Functions for Python Program Integration
-- ==============================================

-- Function to add a child to waiting list (for Python program)
-- Example usage in Python:
-- cursor.execute("""
--     INSERT INTO children_movie_waiting_list (film_id, customer_id, child_name, parent_contact, priority, notes)
--     VALUES (%s, %s, %s, %s, %s, %s)
-- """, (film_id, customer_id, child_name, parent_contact, priority, notes))

-- Function to remove a child from waiting list when they rent the movie
-- Example usage in Python:
-- cursor.execute("""
--     UPDATE children_movie_waiting_list 
--     SET status = 'RENTED' 
--     WHERE waiting_id = %s
-- """, (waiting_id,))

-- Function to get next person in line for a specific film
-- Example usage in Python:
-- cursor.execute("""
--     SELECT waiting_id, child_name, parent_contact, customer_id
--     FROM children_waiting_list_view 
--     WHERE film_id = %s AND queue_position = 1
-- """, (film_id,))

-- ==============================================
-- Cleanup and Maintenance Queries
-- ==============================================

-- Remove old cancelled entries (older than 30 days)
-- DELETE FROM children_movie_waiting_list 
-- WHERE status = 'CANCELLED' 
-- AND date_added < CURRENT_TIMESTAMP - INTERVAL '30 days';

-- Update status of people who have been waiting too long (optional)
-- UPDATE children_movie_waiting_list 
-- SET status = 'CANCELLED', notes = 'Auto-cancelled due to long wait time'
-- WHERE status = 'WAITING' 
-- AND date_added < CURRENT_TIMESTAMP - INTERVAL '90 days';

-- ==============================================
-- Performance Optimization
-- ==============================================

-- Additional indexes for common queries
-- CREATE INDEX idx_waiting_film_status ON children_movie_waiting_list(film_id, status);
-- CREATE INDEX idx_waiting_date_added ON children_movie_waiting_list(date_added);
-- CREATE INDEX idx_film_rating ON film(rating);

-- ==============================================
-- Notes for Python Program Integration
-- ==============================================

/*
The Python program should handle:

1. Adding children to the waiting list:
   - Check if film is G or PG rated
   - Check if child is already on waiting list for that film
   - Add with appropriate priority

2. Notifying when movies become available:
   - Monitor rental returns
   - Check waiting list for that film
   - Notify next person in line
   - Update status to 'NOTIFIED'

3. Removing from waiting list:
   - When child rents the movie: set status to 'RENTED'
   - When parent cancels: set status to 'CANCELLED'
   - Clean up old entries periodically

4. Priority management:
   - First come, first served within same priority level
   - Higher priority numbers = lower priority
   - Consider special cases (birthdays, etc.)

5. Contact management:
   - Store parent contact information securely
   - Handle email/phone notifications
   - Respect privacy preferences
*/
