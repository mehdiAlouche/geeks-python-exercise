# Math App - Exercise 5

## Overview
This is Exercise 5: Creating and Using a Custom Module. The project demonstrates how to create custom modules and use external packages like lodash.

## Files Structure
```
math-app/
├── package.json          # Node.js project configuration
├── math.js              # Custom math module with basic operations
├── app.js               # Main application using both custom module and lodash
├── test.js              # Simple test file
└── node_modules/
    └── lodash/          # Lodash utility library
        └── index.js     # Minimal lodash implementation
```

## Custom Math Module (math.js)
Exports the following functions:
- `add(a, b)` - Add two numbers
- `addMultiple(...numbers)` - Add multiple numbers
- `multiply(a, b)` - Multiply two numbers
- `multiplyMultiple(...numbers)` - Multiply multiple numbers
- `factorial(n)` - Calculate factorial of a number
- `power(base, exponent)` - Calculate power

## Usage
```bash
# Install dependencies (already included)
npm install

# Run the main application
node app.js

# Run simple test
node test.js
```

## Expected Output
The application demonstrates:
1. Basic math operations using custom module
2. Array operations using lodash
3. Combining custom module with lodash
4. Error handling
5. Performance comparisons
