-- part 1
-- Drop old tables if exist
DROP TABLE IF EXISTS library CASCADE;
DROP TABLE IF EXISTS student CASCADE;
DROP TABLE IF EXISTS book CASCADE;

-- Book table
CREATE TABLE book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);

-- Insert books
INSERT INTO book (title, author) VALUES
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

-- Student table (age <= 15)
CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    age INT CHECK (age <= 15)
);

-- Insert students
INSERT INTO student (name, age) VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

-- Junction table
CREATE TABLE library (
    book_fk_id INT REFERENCES book(book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_fk_id INT REFERENCES student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    borrowed_date DATE NOT NULL,
    PRIMARY KEY (book_fk_id, student_fk_id, borrowed_date)
);

-- Insert borrow records using subqueries
INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES ((SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
        (SELECT student_id FROM student WHERE name = 'John'),
        '2022-02-15');

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES ((SELECT book_id FROM book WHERE title = 'To kill a mockingbird'),
        (SELECT student_id FROM student WHERE name = 'Bob'),
        '2021-03-03');

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES ((SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
        (SELECT student_id FROM student WHERE name = 'Lera'),
        '2021-05-23');

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES ((SELECT book_id FROM book WHERE title = 'Harry Potter'),
        (SELECT student_id FROM student WHERE name = 'Bob'),
        '2021-08-12');

-- Queries
-- 1. All columns from junction table
SELECT * FROM library;

-- 2. Student name + borrowed book title
SELECT s.name, b.title, l.borrowed_date
FROM library l
JOIN student s ON l.student_fk_id = s.student_id
JOIN book b ON l.book_fk_id = b.book_id;

-- 3. Average age of students who borrowed Alice in Wonderland
SELECT AVG(s.age) AS avg_age
FROM library l
JOIN student s ON l.student_fk_id = s.student_id
JOIN book b ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';

-- 4. Delete a student and see cascade
DELETE FROM student WHERE name = 'John';
-- This will also remove John’s rows from the library table

-----------------------
--Part 2

-----------------------
-- Drop old tables if exist
DROP TABLE IF EXISTS library CASCADE;
DROP TABLE IF EXISTS student CASCADE;
DROP TABLE IF EXISTS book CASCADE;

-- Book table
CREATE TABLE book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL
);

-- Insert books
INSERT INTO book (title, author) VALUES
('Alice In Wonderland', 'Lewis Carroll'),
('Harry Potter', 'J.K Rowling'),
('To kill a mockingbird', 'Harper Lee');

-- Student table (age <= 15)
CREATE TABLE student (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    age INT CHECK (age <= 15)
);

-- Insert students
INSERT INTO student (name, age) VALUES
('John', 12),
('Lera', 11),
('Patrick', 10),
('Bob', 14);

-- Junction table
CREATE TABLE library (
    book_fk_id INT REFERENCES book(book_id) ON DELETE CASCADE ON UPDATE CASCADE,
    student_fk_id INT REFERENCES student(student_id) ON DELETE CASCADE ON UPDATE CASCADE,
    borrowed_date DATE NOT NULL,
    PRIMARY KEY (book_fk_id, student_fk_id, borrowed_date)
);

-- Insert borrow records using subqueries
INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES ((SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
        (SELECT student_id FROM student WHERE name = 'John'),
        '2022-02-15');

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES ((SELECT book_id FROM book WHERE title = 'To kill a mockingbird'),
        (SELECT student_id FROM student WHERE name = 'Bob'),
        '2021-03-03');

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES ((SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
        (SELECT student_id FROM student WHERE name = 'Lera'),
        '2021-05-23');

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES ((SELECT book_id FROM book WHERE title = 'Harry Potter'),
        (SELECT student_id FROM student WHERE name = 'Bob'),
        '2021-08-12');

-- Queries
-- 1. All columns from junction table
SELECT * FROM library;

-- 2. Student name + borrowed book title
SELECT s.name, b.title, l.borrowed_date
FROM library l
JOIN student s ON l.student_fk_id = s.student_id
JOIN book b ON l.book_fk_id = b.book_id;

-- 3. Average age of students who borrowed Alice in Wonderland
SELECT AVG(s.age) AS avg_age
FROM library l
JOIN student s ON l.student_fk_id = s.student_id
JOIN book b ON l.book_fk_id = b.book_id
WHERE b.title = 'Alice In Wonderland';

-- 4. Delete a student and see cascade
DELETE FROM student WHERE name = 'John';
-- This will also remove John’s rows from the library table

