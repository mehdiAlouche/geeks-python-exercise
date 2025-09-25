-- Fetch the first four students ordered alphabetically by last_name
SELECT first_name, last_name, birth_date
FROM students
ORDER BY last_name ASC
LIMIT 4;

-- Fetch the youngest student (latest birth_date)
SELECT first_name, last_name, birth_date
FROM students
ORDER BY birth_date DESC
LIMIT 1;

-- Fetch three students skipping the first two students
SELECT first_name, last_name, birth_date
FROM students
OFFSET 2
LIMIT 3;
