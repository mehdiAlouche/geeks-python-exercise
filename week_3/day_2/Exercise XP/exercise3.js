// Exercise 3: What's in my wallet?

// Function to determine if you can afford an item with your change
function changeEnough(itemPrice, amountOfChange) {
    // Calculate total change value
    // amountOfChange[0] = quarters (0.25 each)
    // amountOfChange[1] = dimes (0.10 each)
    // amountOfChange[2] = nickels (0.05 each)
    // amountOfChange[3] = pennies (0.01 each)
    
    let quartersValue = amountOfChange[0] * 0.25;
    let dimesValue = amountOfChange[1] * 0.10;
    let nickelsValue = amountOfChange[2] * 0.05;
    let penniesValue = amountOfChange[3] * 0.01;
    
    let totalChange = quartersValue + dimesValue + nickelsValue + penniesValue;
    
    // Log the calculation for debugging
    console.log(`Item Price: $${itemPrice}`);
    console.log(`Change breakdown:`);
    console.log(`  ${amountOfChange[0]} quarters × $0.25 = $${quartersValue.toFixed(2)}`);
    console.log(`  ${amountOfChange[1]} dimes × $0.10 = $${dimesValue.toFixed(2)}`);
    console.log(`  ${amountOfChange[2]} nickels × $0.05 = $${nickelsValue.toFixed(2)}`);
    console.log(`  ${amountOfChange[3]} pennies × $0.01 = $${penniesValue.toFixed(2)}`);
    console.log(`Total Change: $${totalChange.toFixed(2)}`);
    
    // Can afford the item if total change >= item price
    let canAfford = totalChange >= itemPrice;
    console.log(`Can afford: ${canAfford}`);
    
    if (canAfford) {
        let remaining = totalChange - itemPrice;
        console.log(`Remaining change: $${remaining.toFixed(2)}`);
    } else {
        let needed = itemPrice - totalChange;
        console.log(`Need additional: $${needed.toFixed(2)}`);
    }
    
    return canAfford;
}

// Test the function with provided examples
console.log("=== Exercise 3: What's in my wallet? ===\n");

console.log("Test 1: changeEnough(4.25, [25, 20, 5, 0])");
console.log("Expected: true (should return true since 25×0.25 + 20×0.10 + 5×0.05 + 0×0.01 = 6.25 + 2.00 + 0.25 + 0.00 = 8.50 >= 4.25)\n");
console.log("Result:", changeEnough(4.25, [25, 20, 5, 0]));

console.log("\n" + "=".repeat(60) + "\n");

console.log("Test 2: changeEnough(14.11, [2,100,0,0])");
console.log("Expected: false (2×0.25 + 100×0.10 + 0×0.05 + 0×0.01 = 0.50 + 10.00 + 0.00 + 0.00 = 10.50 < 14.11)\n");
console.log("Result:", changeEnough(14.11, [2,100,0,0]));

console.log("\n" + "=".repeat(60) + "\n");

console.log("Test 3: changeEnough(0.75, [0,0,20,5])");
console.log("Expected: true (0×0.25 + 0×0.10 + 20×0.05 + 5×0.01 = 0.00 + 0.00 + 1.00 + 0.05 = 1.05 >= 0.75)\n");
console.log("Result:", changeEnough(0.75, [0,0,20,5]));

// Additional test cases for comprehensive testing
console.log("\n" + "=".repeat(60) + "\n");
console.log("Additional Test Cases:\n");

console.log("Test 4: changeEnough(1.00, [4,0,0,0])"); // Exactly 4 quarters = $1.00
console.log("Result:", changeEnough(1.00, [4,0,0,0]));

console.log("\nTest 5: changeEnough(2.00, [0,20,0,0])"); // Exactly 20 dimes = $2.00
console.log("Result:", changeEnough(2.00, [0,20,0,0]));

console.log("\nTest 6: changeEnough(3.50, [10,20,5,20])"); // Complex case
console.log("Result:", changeEnough(3.50, [10,20,5,20]));
