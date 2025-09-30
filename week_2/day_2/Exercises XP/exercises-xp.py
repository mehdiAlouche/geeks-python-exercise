"""
Exercise 1: Items and Customers
Working with the public database created previously.

This script contains SQL queries for:

1. All items ordered by price (lowest to highest)
2. Items priced above or equal to 80, ordered from highest to lowest
3. First 3 customers alphabetically by first name (excluding primary key)
4. All customer last names in reverse alphabetical order
"""

# 1. All items, ordered by price (lowest to highest)
sql_query_1 = """
SELECT * 
FROM items 
ORDER BY price ASC;
"""

# 2. Items with a price above 80 (80 included), ordered by price (highest to lowest)
sql_query_2 = """
SELECT * 
FROM items 
WHERE price >= 80 
ORDER BY price DESC;
"""

# 3. First 3 customers in alphabetical order of the first name (A-Z), excluding the primary key column
# Adjust column names as necessary (e.g., remove 'id' or 'customer_id')
sql_query_3 = """
SELECT first_name, last_name, email
FROM customers 
ORDER BY first_name ASC 
LIMIT 3;
"""

# 4. All last names (no other columns!), in reverse alphabetical order (Z-A)
sql_query_4 = """
SELECT last_name 
FROM customers 
ORDER BY last_name DESC;
"""
