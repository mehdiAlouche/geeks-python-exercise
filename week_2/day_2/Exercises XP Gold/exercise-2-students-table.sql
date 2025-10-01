-- Exercise 2: Students table - Continuation of Day1 Exercise XPGold

-- Update section

-- 1. Update 'Lea Benichou' and 'Marc Benichou' birth_dates to 02/11/1998
UPDATE students 
SET birth_date = '1998-11-02' 
WHERE (first_name = 'Lea' AND last_name = 'Benichou') 
   OR (first_name = 'Marc' AND last_name = 'Benichou');

-- 2. Change the last_name of David from 'Grez' to 'Guez'
UPDATE students 
SET last_name = 'Guez' 
WHERE first_name = 'David' AND last_name = 'Grez';

-- Delete section

-- 3. Delete the student named 'Lea Benichou' from the table
DELETE FROM students 
WHERE first_name = 'Lea' AND last_name = 'Benichou';

-- Count section

-- 4. Count how many students are in the table
SELECT COUNT(*) as total_students FROM students;

-- 5. Count how many students were born after 1/01/2000
SELECT COUNT(*) as students_born_after_2000 
FROM students 
WHERE birth_date > '2000-01-01';

-- Insert / Alter section

-- 6. Add a column to the student table called math_grade
ALTER TABLE students ADD COLUMN math_grade INTEGER;

-- 7. Add 80 to the student which id is 1
UPDATE students 
SET math_grade = 80 
WHERE id = 1;

-- 8. Add 90 to the students which have ids of 2 or 4
UPDATE students 
SET math_grade = 90 
WHERE id IN (2, 4);

-- 9. Add 40 to the student which id is 6
UPDATE students 
SET math_grade = 40 
WHERE id = 6;

-- 10. Count how many students have a grade bigger than 83
SELECT COUNT(*) as students_grade_over_83 
FROM students 
WHERE math_grade > 83;

-- 11. Add another student named 'Omer Simpson' with the same birth_date as the one already in the table. Give him a grade of 70.
INSERT INTO students (first_name, last_name, birth_date, math_grade)
SELECT 'Omer', 'Simpson', birth_date, 70
FROM students 
WHERE first_name = 'Omer' AND last_name = 'Simpson'
LIMIT 1;

-- Bonus: Count how many grades each student has
-- 12. Count how many grades each student has using GROUP BY
SELECT 
    first_name, 
    last_name, 
    COUNT(math_grade) as total_grade
FROM students 
GROUP BY first_name, last_name
ORDER BY first_name, last_name;

-- SUM section

-- 13. Find the sum of all the students grades
SELECT SUM(math_grade) as sum_of_all_grades 
FROM students;
