--  Exercise 1: DVD Rental

-- 1. Get a list of all the languages
SELECT * 
FROM language;

-- 2. Get all films joined with their languages (title, description, language name)
SELECT f.title, f.description, l.name AS language_name
FROM film f
JOIN language l ON f.language_id = l.language_id;

-- 3. Get all languages, even if there are no films in those languages
SELECT f.title, f.description, l.name AS language_name
FROM language l
LEFT JOIN film f ON f.language_id = l.language_id;

-- 4. Create a new table new_film and insert some rows
CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO new_film (name) VALUES
('Avengers'),
('Inception'),
('Spirited Away');

-- 5. Create customer_review table with ON DELETE CASCADE
CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY,
    film_id INT NOT NULL REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INT NOT NULL REFERENCES language(language_id),
    title VARCHAR(255) NOT NULL,
    score INT CHECK(score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Add 2 movie reviews
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES
(1, 1, 'Amazing Action Movie', 9, 'The Avengers is a thrilling superhero experience!'),
(2, 1, 'Mind Bending', 10, 'Inception has one of the smartest scripts I have ever seen.');

-- 7. Delete a film that has a review - cascade deletes review
DELETE FROM new_film
WHERE id = 1;

-- Exercise 2 : DVD Rental
-- 1. Update the language of some films to French
UPDATE film
SET language_id = (
    SELECT language_id FROM language WHERE name = 'French'
)
WHERE film_id IN (1, 2, 3);

-- 2. Check foreign keys defined for the customer table
SELECT conname AS constraint_name, confrelid::regclass AS references_table
FROM pg_constraint
WHERE conrelid = 'customer'::regclass;

-- Notes:
-- Foreign keys in customer:
--   store_id → store(store_id)
--   address_id → address(address_id)
-- This means we must insert into store and address before inserting into customer.

-- 3. Drop the customer_review table
DROP TABLE IF EXISTS customer_review CASCADE;

-- 4. Find how many rentals are still outstanding
SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;

-- 5. Find the 30 most expensive movies which are outstanding
SELECT f.title, f.rental_rate, f.replacement_cost
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.replacement_cost DESC
LIMIT 30;

-- 6. Friend wants 4 films

-- Film 1: Sumo wrestler, actor Penelope Monroe
SELECT f.title
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE f.description ILIKE '%sumo wrestler%'
  AND a.first_name = 'Penelope'
  AND a.last_name = 'Monroe';

-- Film 2: Short documentary (< 60 min), Rated R
SELECT f.title
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE f.length < 60
  AND f.rating = 'R'
  AND c.name = 'Documentary';

-- Film 3: Rented by Matthew Mahan, > $4 rental, returned between 28 July and 1 August 2005
SELECT f.title
FROM rental r
JOIN customer c ON r.customer_id = c.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE c.first_name = 'Matthew'
  AND c.last_name = 'Mahan'
  AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01'
  AND f.rental_rate > 4.00;

-- Film 4: Watched by Matthew Mahan, contains 'boat' in title/description, expensive replacement cost
SELECT f.title
FROM rental r
JOIN customer c ON r.customer_id = c.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE c.first_name = 'Matthew'
  AND c.last_name = 'Mahan'
  AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC
LIMIT 1;
