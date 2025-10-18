// Import products array from products.js using CommonJS require syntax
const products = require('./products.js');

// Function that takes a product name as parameter and searches for the corresponding product
function findProduct(productName) {
    // Search for product by name (case-insensitive)
    const foundProduct = products.find(product => 
        product.name.toLowerCase() === productName.toLowerCase()
    );
    
    return foundProduct;
}

// Function to display product details
function displayProduct(product) {
    if (product) {
        console.log(`\n Product Found:`);
        console.log(`   Name: ${product.name}`);
        console.log(`   Price: $${product.price}`);
        console.log(`   Category: ${product.category}`);
    } else {
        console.log(`\n Product not found!`);
    }
}

// Test the function with different product names
console.log("🔍 Testing product search functionality...\n");

// Test case 1: Find existing product
console.log("Searching for 'Laptop':");
displayProduct(findProduct("Laptop"));

// Test case 2: Find another existing product
console.log("\nSearching for 'Running Shoes':");
displayProduct(findProduct("Running Shoes"));

// Test case 3: Find product with different case
console.log("\nSearching for 'SMARTPHONE' (uppercase):");
displayProduct(findProduct("SMARTPHONE"));

// Test case 4: Find non-existing product
console.log("\nSearching for 'Tablet' (non-existing):");
displayProduct(findProduct("Tablet"));

// Test case 5: Find another existing product
console.log("\nSearching for 'Coffee Maker':");
displayProduct(findProduct("Coffee Maker"));

console.log("\n✅ All tests completed!");
