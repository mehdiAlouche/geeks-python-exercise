// ========================================
// Exercise 1: Print Full Name
// ========================================

// Destructuring directly from parameters
function printFullName({first, last}) {
    return `Your full name is ${first} ${last}`;
}

console.log(printFullName({first: 'Elie', last:'Schoppik'}));

// ========================================
// Exercise 2: Keys and Values
// ========================================
console.log("\n=== Exercise 2: Keys and Values ===");

function keysAndValues(obj) {
    // Get keys and sort them alphabetically
    const sortedKeys = Object.keys(obj).sort();
    
    // Get corresponding values in the same order
    const values = sortedKeys.map(key => obj[key]);
    
    return [sortedKeys, values];
}

// Test cases
console.log("Test 1:", keysAndValues({ a: 1, b: 2, c: 3 }));
console.log("Test 2:", keysAndValues({ a: "Apple", b: "Microsoft", c: "Google" }));
console.log("Test 3:", keysAndValues({ key1: true, key2: false, key3: undefined }));

// ========================================
// Exercise 3: Counter Class Analysis
// ========================================
console.log("\n=== Exercise 3: Counter Class Analysis ===");

class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}

const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log("counterOne.count:", counterOne.count);

// Analysis:
// 1. counterOne is created with count = 0
// 2. counterOne.increment() called twice: count becomes 2
// 3. counterTwo is assigned to counterOne (same reference)
// 4. counterTwo.increment() called once: count becomes 3
// 5. Since counterOne and counterTwo reference the same object, counterOne.count = 3
// Expected output: 3
