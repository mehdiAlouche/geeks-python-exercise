// Simple test file to verify calculations
const _ = require('./node_modules/lodash/index.js');
const math = require('./math.js');

console.log("Testing Custom Math Module:");
console.log("Addition:", math.add(5, 3));
console.log("Multiple Addition:", math.addMultiple(1, 2, 3, 4, 5));
console.log("Multiplication:", math.multiply(4, 7));
console.log("Multiple Multiplication:", math.multiplyMultiple(2, 3, 4));
console.log("Factorial 5:", math.factorial(5));
console.log("Power 2^8:", math.power(2, 8));

console.log("\nTesting Lodash Functions:");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Sum:", _.sum(numbers));
console.log("Mean:", _.mean(numbers));
console.log("Max:", _.max(numbers));
console.log("Min:", _.min(numbers));

console.log("\nAll calculations completed successfully!");
