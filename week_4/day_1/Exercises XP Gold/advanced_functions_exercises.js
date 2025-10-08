// Exercise 1: Nested functions

// Converted to nested arrow functions
let landscapeArrow = () => {
  let result = "";
  
  let flat = (x) => {
    for(let count = 0; count<x; count++){
      result = result + "_";
    }
  }
  
  let mountain = (x) => {
    result = result + "/"
    for(let counter = 0; counter<x; counter++){
      result = result + "'"
    }
    result = result + "\\"
  }
  
  flat(4);
  mountain(4);
  flat(4);
  
  return result;
}

console.log("Arrow function result:", landscapeArrow());

// Exercise 2: Closure
console.log("\n=== Exercise 2: Closure ===");
const addTo = x => y => x + y;
const addToTen = addTo(10);
console.log("addToTen(3) =", addToTen(3));
// Prediction: 13
// Explanation: addTo(10) returns a function that adds 10 to its argument
// So addToTen(3) = 10 + 3 = 13

// Exercise 3: Currying
console.log("\n=== Exercise 3: Currying ===");
const curriedSum = (a) => (b) => a + b;
console.log("curriedSum(30)(1) =", curriedSum(30)(1));
// Prediction: 31
// Explanation: curriedSum(30) returns a function that adds 30 to its argument
// So curriedSum(30)(1) = 30 + 1 = 31

// Exercise 4: Currying
console.log("\n=== Exercise 4: Currying ===");
const curriedSum2 = (a) => (b) => a + b;
const add5 = curriedSum2(5);
console.log("add5(12) =", add5(12));
// Prediction: 17
// Explanation: add5 is a function that adds 5 to its argument
// So add5(12) = 5 + 12 = 17

// Exercise 5: Composing
console.log("\n=== Exercise 5: Composing ===");
const compose = (f, g) => (a) => f(g(a));
const add1 = (num) => num + 1;
const add5Compose = (num) => num + 5;
console.log("compose(add1, add5Compose)(10) =", compose(add1, add5Compose)(10));
// Prediction: 16
// Explanation: compose(add1, add5)(10) means f(g(10))
// g(10) = add5(10) = 10 + 5 = 15
// f(15) = add1(15) = 15 + 1 = 16
