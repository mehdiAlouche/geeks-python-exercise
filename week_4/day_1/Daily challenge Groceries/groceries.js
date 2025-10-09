// Daily Challenge: Groceries - Pass By Value & Pass By Reference

let client = "John";

const groceries = {
    fruits : ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice : "20$",
    other : {
        paid : true,
        meansOfPayment : ["cash", "creditCard"]
    }
};

// Arrow function to display groceries fruits using forEach
const displayGroceries = () => {
    groceries.fruits.forEach(fruit => {
        console.log(fruit);
    });
};

// Arrow function to demonstrate pass by value vs pass by reference
const cloneGroceries = () => {
    console.log("\n=== Testing Pass By Value & Pass By Reference ===\n");
    
    // Pass by Value: Creating a copy of the client variable
    console.log("1. Testing Pass By Value with strings:");
    let user = client; // This creates a copy of the string value
    console.log(`Original client: ${client}`);
    console.log(`User variable: ${user}`);
    
    // Change the client variable
    client = "Betty";
    console.log(`After changing client to "Betty":`);
    console.log(`Client: ${client}`);
    console.log(`User: ${user}`);
    console.log("Answer: No, we will NOT see this modification in the user variable because strings are passed by VALUE (primitive data type). The user variable holds a copy of the original value.\n");
    
    // Pass by Reference: Creating a reference to the groceries object
    console.log("2. Testing Pass By Reference with objects:");
    let shopping = groceries; // This creates a reference to the same object
    console.log(`Original groceries totalPrice: ${groceries.totalPrice}`);
    console.log(`Shopping totalPrice: ${shopping.totalPrice}`);
    
    // Change the totalPrice in the shopping object
    shopping.totalPrice = "35$";
    console.log(`After changing shopping totalPrice to "35$":`);
    console.log(`Groceries totalPrice: ${groceries.totalPrice}`);
    console.log(`Shopping totalPrice: ${shopping.totalPrice}`);
    console.log("Answer: Yes, we WILL see this modification in the shopping object because objects are passed by REFERENCE. Both variables point to the same object in memory.\n");
    
    // Change the paid property in the shopping object
    console.log("3. Testing nested object modification:");
    console.log(`Original groceries.other.paid: ${groceries.other.paid}`);
    console.log(`Shopping.other.paid: ${shopping.other.paid}`);
    
    shopping.other.paid = false;
    console.log(`After changing shopping.other.paid to false:`);
    console.log(`Groceries.other.paid: ${groceries.other.paid}`);
    console.log(`Shopping.other.paid: ${shopping.other.paid}`);
    console.log("Answer: Yes, we WILL see this modification in the shopping object because we're modifying the same referenced object, even when accessing nested properties.\n");
};

// Display initial state
console.log("=== Daily Challenge: Groceries ===");
console.log(`Client: ${client}`);
console.log("Groceries object:", groceries);

// Invoke the functions
console.log("\n=== Invoking displayGroceries function ===");
displayGroceries();

console.log("\n=== Invoking cloneGroceries function ===");
cloneGroceries();

// Final state check
console.log("=== Final State ===");
console.log(`Final client value: ${client}`);
console.log("Final groceries object:", groceries);
