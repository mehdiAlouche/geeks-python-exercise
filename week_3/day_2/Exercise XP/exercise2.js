// Exercise 2: Shopping List

// Stock quantities
const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry": 1
};

// Item prices
const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry": 10
};

// Shopping list with items in cart
const shoppingList = ["banana", "orange", "apple"];

// Function to calculate total bill
function myBill() {
    let totalBill = 0;
    let processShoppingList = [];
    
    console.log("Shopping List:", shoppingList);
    console.log("Processing items...");
    
    // Loop through shopping list items
    for (let item of shoppingList) {
        console.log(`Checking ${item}...`);
        
        // Check if item is in stock
        if (item in stock) {
            // Check if we have stock quantity > 0
            if (stock[item] > 0) {
                // Find price for the item
                let itemPrice = prices[item];
                console.log(`✓ ${item}: $${itemPrice} (in stock: ${stock[item]})`);
                totalBill += itemPrice;
                processShoppingList.push({item: item, price: itemPrice, processed: true});
            } else {
                console.log(`✗ ${item}: Out of stock (quantity: ${stock[item]})`);
                processShoppingList.push({item: item, price: 0, processed: false});
            }
        } else {
            console.log(`✗ ${item}: Item not found in our store`);
            processShoppingList.push({item: item, price: 0, processed: false});
        }
    }
    
    console.log("\nProcessing Summary:");
    console.log("Items processed:", processShoppingList);
    console.log("Total Bill: $" + totalBill);
    
    return {
        total: totalBill,
        processed: processShoppingList
    };
}

// Bonus: Enhanced function that decreases stock
function myBillWithStockUpdate() {
    let totalBill = 0;
    let processShoppingList = [];
    
    console.log("Shopping List:", shoppingList);
    console.log("Processing items and updating stock...");
    
    // Loop through shopping list items
    for (let item of shoppingList) {
        console.log(`Checking ${item}...`);
        
        // Check if item is in stock
        if (item in stock) {
            // Check if we have stock quantity > 0
            if (stock[item] > 0) {
                // Find price for the item
                let itemPrice = prices[item];
                console.log(`✓ ${item}: $${itemPrice} (in stock: ${stock[item]}, decreasing stock by 1)`);
                totalBill += itemPrice;
                // Decrease stock by 1
                stock[item] -= 1;
                processShoppingList.push({item: item, price: itemPrice, processed: true, newStock: stock[item]});
            } else {
                console.log(`✗ ${item}: Out of stock (quantity: ${stock[item]})`);
                processShoppingList.push({item: item, price: 0, processed: false});
            }
        } else {
            console.log(`✗ ${item}: Item not found in our store`);
            processShoppingList.push({item: item, price: 0, processed: false});
        }
    }
    
    console.log("\nUpdated Stock:", stock);
    console.log("Processing Summary:");
    console.log("Items processed:", processShoppingList);
    console.log("Total Bill: $" + totalBill);
    
    return {
        total: totalBill,
        processed: processShoppingList,
        updatedStock: stock
    };
}

// Test the functions
console.log("=== Exercise 2: Shopping List ===");
console.log("Initial Stock:", stock);
console.log("Prices:", prices);
console.log("\n--- Calling myBill() ---");
myBill();

console.log("\n--- Calling myBillWithStockUpdate() (Bonus) ---");
const result = myBillWithStockUpdate();
