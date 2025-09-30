
-- Data setup
CREATE TABLE FirstTab (
    id INTEGER,
    name VARCHAR(10)
);

INSERT INTO FirstTab VALUES
(5, 'Pawan'),
(6, 'Sharlee'),
(7, 'Krish'),
(NULL, 'Avtaar');

CREATE TABLE SecondTab (
    id INTEGER
);

INSERT INTO SecondTab VALUES
(5),
(NULL);

-- Q1: What will be the OUTPUT of the following statement?
-- Expected result: 0
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id IS NULL);

-- Q2: What will be the OUTPUT of the following statement?
-- Expected result: 2
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id = 5);

-- Q3: What will be the OUTPUT of the following statement?
-- Expected result: 0
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (SELECT id FROM SecondTab);

-- Q4: What will be the OUTPUT of the following statement?
-- Expected result: 2
SELECT COUNT(*)
FROM FirstTab AS ft
WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id IS NOT NULL);
