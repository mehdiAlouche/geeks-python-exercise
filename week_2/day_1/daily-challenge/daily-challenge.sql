-- Daily Challenge: Actors

-- 1. Count how many actors are in the table
SELECT COUNT(*) AS total_actors
FROM actors;

-- 2. inserting with blank fields (this will fail because of NOT NULL constraints)
-- Uncomment the line below to test
-- INSERT INTO actors (first_name, last_name) VALUES ('Tom', 'Hanks');

-- Expected outcome:
-- ERROR:  null value in column "birth_date" violates not-null constraint
-- Because birth_date and number_oscars are defined as NOT NULL.
