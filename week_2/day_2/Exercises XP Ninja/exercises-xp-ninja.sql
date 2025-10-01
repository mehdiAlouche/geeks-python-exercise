-- Exercise 1: Bonus Public Database (Continuation of XP)

-- 1. Fetch the last 2 customers in alphabetical order (A-Z) – exclude 'id' from the results
SELECT firstname, lastname 
FROM customers 
ORDER BY firstname, lastname 
LIMIT 2;

-- 2. Use SQL to delete all purchases made by Scott
DELETE FROM purchases 
WHERE customer_id = (
    SELECT id FROM customers WHERE firstname = 'Scott' AND lastname = 'Scott'
);

-- 3. Does Scott still exist in the customers table, even though he has been deleted? Try and find him
SELECT * FROM customers 
WHERE firstname = 'Scott' AND lastname = 'Scott';

-- Yes, Scott still exists in the customers table. 
-- Deleting from the purchases table only removes the purchase records, 
-- not the customer record itself.

-- 4. Use SQL to find all purchases. Join purchases with the customers table, 
-- so that Scott's order will appear, although instead of the customer's first and last name, 
-- you should only see empty/blank. (Which kind of join should you use?)
SELECT 
    p.id,
    p.customer_id,
    p.item_id,
    p.quantity_purchased,
    c.firstname,
    c.lastname
FROM purchases p
LEFT JOIN customers c ON p.customer_id = c.id;

-- LEFT JOIN should be used here because we want to show ALL purchases from the purchases table,
-- even if there's no matching customer record. Since Scott's purchases were deleted,
-- this query will show the remaining purchases with their customer information.

-- 5. Use SQL to find all purchases. Join purchases with the customers table, 
-- so that Scott's order will NOT appear. (Which kind of join should you use?)
SELECT 
    p.id,
    p.customer_id,
    p.item_id,
    p.quantity_purchased,
    c.firstname,
    c.lastname
FROM purchases p
INNER JOIN customers c ON p.customer_id = c.id;

-- INNER JOIN should be used here because we only want to show purchases 
-- that have matching customer records. Since Scott's purchases were deleted,
-- this will show the same results as the LEFT JOIN in this case.

-- Additional verification queries:

-- Check current state of purchases table
SELECT * FROM purchases;

-- Check all customers
SELECT * FROM customers;

-- Show the difference between LEFT JOIN and INNER JOIN
-- (This would be more meaningful if we had orphaned purchase records)
SELECT 'LEFT JOIN' as join_type, COUNT(*) as purchase_count
FROM purchases p
LEFT JOIN customers c ON p.customer_id = c.id
UNION ALL
SELECT 'INNER JOIN' as join_type, COUNT(*) as purchase_count
FROM purchases p
INNER JOIN customers c ON p.customer_id = c.id;
