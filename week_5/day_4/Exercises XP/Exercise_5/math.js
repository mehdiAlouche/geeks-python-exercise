// Custom math module with basic mathematical operations

// Function to add two numbers
function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a + b;
}

// Function to add multiple numbers
function addMultiple(...numbers) {
    if (numbers.length === 0) {
        throw new Error('At least one number is required');
    }
    
    const invalidNumbers = numbers.filter(num => typeof num !== 'number');
    if (invalidNumbers.length > 0) {
        throw new Error('All arguments must be numbers');
    }
    
    return numbers.reduce((sum, num) => sum + num, 0);
}

// Function to multiply two numbers
function multiply(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a * b;
}

// Function to multiply multiple numbers
function multiplyMultiple(...numbers) {
    if (numbers.length === 0) {
        throw new Error('At least one number is required');
    }
    
    const invalidNumbers = numbers.filter(num => typeof num !== 'number');
    if (invalidNumbers.length > 0) {
        throw new Error('All arguments must be numbers');
    }
    
    return numbers.reduce((product, num) => product * num, 1);
}

// Function to calculate factorial
function factorial(n) {
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
        throw new Error('Factorial requires a non-negative integer');
    }
    
    if (n === 0 || n === 1) {
        return 1;
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Function to calculate power
function power(base, exponent) {
    if (typeof base !== 'number' || typeof exponent !== 'number') {
        throw new Error('Both base and exponent must be numbers');
    }
    return Math.pow(base, exponent);
}

// Export functions using CommonJS syntax
module.exports = {
    add,
    addMultiple,
    multiply,
    multiplyMultiple,
    factorial,
    power
};
