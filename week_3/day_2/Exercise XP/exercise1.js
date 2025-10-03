// Exercise 1: Find the numbers divisible by 23

// Basic function without parameter
function displayNumbersDivisible() {
    let numbersDivisible = [];
    let sum = 0;
    
    console.log("Numbers divisible by 23:");
    
    // Loop through numbers 0 to 500
    for (let i = 0; i <= 500; i++) {
        if (i % 23 === 0) {
            numbersDivisible.push(i);
            sum += i;
        }
    }
    
    // Console.log all numbers divisible by 23
    console.log(numbersDivisible.join(' '));
    console.log("Sum:", sum);
    return { numbers: numbersDivisible, sum: sum };
}

// Bonus: Enhanced function with divisor parameter
function displayNumbersDivisibleWithParameter(divisor) {
    // Handle case where no parameter is provided (default to 23)
    if (divisor === undefined) {
        divisor = 23;
    }
    
    let numbersDivisible = [];
    let sum = 0;
    
    console.log(`Numbers divisible by ${divisor}:`);
    
    // Loop through numbers 0 to 500
    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            numbersDivisible.push(i);
            sum += i;
        }
    }
    
    // Console.log all numbers divisible by divisor
    console.log(numbersDivisible.join(' '));
    console.log(`Sum: ${sum}`);
    return { numbers: numbersDivisible, sum: sum };
}

// Test the original function
console.log("=== Original Function (no parameter) ===");
displayNumbersDivisible();

console.log("\n=== Bonus Function with parameter ===");
console.log("Testing with divisor 3:");
displayNumbersDivisibleWithParameter(3);

console.log("\nTesting with divisor 45:");
displayNumbersDivisibleWithParameter(45);

console.log("\nTesting without parameter (should default to 23):");
displayNumbersDivisibleWithParameter();
