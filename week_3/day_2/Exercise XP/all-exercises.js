// ============================================
// CONSOLIDATED JAVASCRIPT EXERCISES
// Week 3 - Day 2 - Exercise XP
// ============================================

// ============================================
// EXERCISE 1: Find the numbers divisible by 23
// ============================================

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

// ============================================
// EXERCISE 2: Shopping List
// ============================================

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

// ============================================
// EXERCISE 3: What's in my wallet?
// ============================================

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

// ============================================
// EXERCISE 4: Vacation Costs
// ============================================

// Function to calculate hotel cost
function hotelCost(nights) {
    let nightsToStay;
    
    // If nights parameter is provided, use it; otherwise ask user
    if (nights !== undefined && typeof nights === 'number') {
        nightsToStay = nights;
    } else {
        // Ask user for number of nights
        do {
            nightsToStay = prompt("How many nights would you like to stay in the hotel?");
            // Check if user provided answer and if it's a number
            if (nightsToStay === null || nightsToStay === "") {
                alert("Please provide a number of nights.");
                continue;
            }
            nightsToStay = parseInt(nightsToStay);
            if (isNaN(nightsToStay)) {
                alert("Please enter a valid number.");
            } else if (nightsToStay < 0) {
                alert("Number of nights cannot be negative.");
            }
        } while (isNaN(nightsToStay) || nightsToStay < 0);
    }
    
    let hotelPrice = nightsToStay * 140; // $140 per night
    console.log(`Hotel cost: ${nightsToStay} nights × $140 = $${hotelPrice}`);
    return hotelPrice;
}

// Function to calculate plane ride cost
function planeRideCost(destination) {
    let userDestination;
    
    // If destination parameter is provided, use it; otherwise ask user
    if (destination !== undefined && typeof destination === 'string') {
        userDestination = destination;
    } else {
        // Ask user for destination
        do {
            userDestination = prompt("What is your destination?");
            // Check if user provided answer and if it's a string
            if (userDestination === null || userDestination === "" || userDestination.trim() === "") {
                alert("Please provide your destination.");
            }
        } while (userDestination === null || userDestination === "" || userDestination.trim() === "")
    }
    
    let planePrice;
    // Price depends on destination
    switch (userDestination.toLowerCase()) {
        case "london":
            planePrice = 183;
            break;
        case "paris":
            planePrice = 220;
            break;
        default:
            planePrice = 300;
    }
    
    console.log(`Plane ticket cost: ${userDestination} = $${planePrice}`);
    return planePrice;
}

// Function to calculate rental car cost
function rentalCarCost(days) {
    let daysToRent;
    
    // If days parameter is provided, use it; otherwise ask user
    if (days !== undefined && typeof days === 'number') {
        daysToRent = days;
    } else {
        // Ask user for number of days
        do {
            daysToRent = prompt("How many days would you like to rent the car?");
            // Check if user provided answer and if it's a number
            if (daysToRent === null || daysToRent === "") {
                alert("Please provide a number of days.");
                continue;
            }
            daysToRent = parseInt(daysToRent);
            if (isNaN(daysToRent)) {
                alert("Please enter a valid number.");
            } else if (daysToRent < 0) {
                alert("Number of days cannot be negative.");
            }
        } while (isNaN(daysToRent) || daysToRent < 0);
    }
    
    let carPrice = daysToRent * 40; // $40 per day
    
    // Apply 5% discount if renting for more than 10 days
    if (daysToRent > 10) {
        let discount = carPrice * 0.05;
        carPrice = carPrice - discount;
        console.log(`Car rental cost: ${daysToRent} days × $40 = $${daysToRent * 40}. Discount (5% for ${daysToRent} days): $${discount}`);
    }
    
    console.log(`Car rental cost: $${carPrice}`);
    return carPrice;
}

// Function to calculate total vacation cost
function totalVacationCost() {
    // Call the three functions to get individual costs
    let hotel = hotelCost();
    let plane = planeRideCost();
    let car = rentalCarCost();
    
    let total = hotel + plane + car;
    
    console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}.`);
    console.log(`Total vacation cost: $${total}`);
    
    return {
        hotel: hotel,
        plane: plane,
        car: car,
        total: total
    };
}

// Bonus: Enhanced function that accepts parameters instead of prompting
function totalVacationCostWithParameters(nights, destination, days) {
    let hotel = hotelCost(nights);
    let plane = planeRideCost(destination);
    let car = rentalCarCost(days);
    
    let total = hotel + plane + car;
    
    console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}.`);
    console.log(`Total vacation cost: $${total}`);
    
    return {
        hotel: hotel,
        plane: plane,
        car: car,
        total: total
    };
}

// ============================================
// EXERCISE 5: Users - HTML DOM Manipulation
// ============================================

// Function to run Exercise 5 DOM manipulations
function runExercise5() {
    console.log("=== Exercise 5: Users - HTML DOM Manipulation ===\n");
    
    // 1. Retrieve the div and console.log it
    console.log("1. Retrieve and log the div:");
    let containerDiv = document.getElementById('container');
    if (containerDiv) {
        console.log(containerDiv);
        console.log("Container text:", containerDiv.textContent);
        
        // 2. Change the name "Pete" to "Richard"
        console.log("\n2. Change 'Pete' to 'Richard':");
        let peteElement = document.querySelector('ul li:nth-child(2)'); // Second li in first ul
        if (peteElement) {
            console.log("Original text:", peteElement.textContent);
            peteElement.textContent = 'Richard';
            console.log("New text:", peteElement.textContent);
        }
        
        // 3. Delete the second <li> of the second <ul>
        console.log("\n3. Delete the second <li> of the second <ul>:");
        let secondUL = document.querySelectorAll('ul')[1]; // Second ul
        if (secondUL) {
            let secondLI = secondUL.querySelectorAll('li')[1]; // Second li in second ul
            if (secondLI) {
                console.log("Deleting:", secondLI.textContent);
                secondUL.removeChild(secondLI);
            }
        }
        
        // 4. Change the name of the first <li> of each <ul> to your name
        console.log("\n4. Change the first <li> of each <ul> to 'Your Name':");
        let allUlElements = document.querySelectorAll('ul');
        allUlElements.forEach(function(ul, index) {
            let firstLi = ul.querySelector('li:first-child');
            if (firstLi) {
                console.log(`UL ${index + 1} - Original first li:`, firstLi.textContent);
                firstLi.textContent = 'Your Name';
                console.log(`UL ${index + 1} - New first li:`, firstLi.textContent);
            }
        });
        
        // 5. Add a class called student_list to both of the <ul>'s
        console.log("\n5. Add class 'student_list' to both <ul> elements:");
        allUlElements.forEach(function(ul, index) {
            ul.classList.add('student_list');
            console.log(`UL ${index + 1} classes:`, ul.className);
        });
        
        // 6. Add the classes university and attendance to the first <ul>
        console.log("\n6. Add classes 'university' and 'attendance' to the first <ul>:");
        let firstUL = allUlElements[0];
        if (firstUL) {
            firstUL.classList.add('university', 'attendance');
            console.log("First UL classes:", firstUL.className);
        }
        
        // 7. Add a "light blue" background color and some padding to the <div>
        console.log("\n7. Ensure 'light blue' background and padding for the div:");
        containerDiv.style.backgroundColor = 'lightblue';
        containerDiv.style.padding = '15px';
        console.log("Container div styling applied");
        
        // 8. Do not display the <li> that contains the text node "Dan"
        console.log("\n8. Hide the <li> containing 'Dan':");
        setTimeout(function() {
            let allLis = document.querySelectorAll('li');
            allLis.forEach(function(li) {
                if (li.textContent === 'Dan') {
                    console.log("Hiding:", li.textContent);
                    li.style.display = 'none';
                }
            });
        }, 100);
        
        // 9. Add a border to the <li> that contains the text node "Richard"
        console.log("\n9. Add border to <li> containing 'Richard':");
        setTimeout(function() {
            let allLis = document.querySelectorAll('li');
            allLis.forEach(function(li) {
                if (li.textContent === 'Richard') {
                    console.log("Adding border to:", li.textContent);
                    li.setAttribute('id', 'richard-style');
                }
            });
        }, 100);
        
        // 10. Change the font size of the whole body
        console.log("\n10. Change font size of the whole body:");
        document.body.style.fontSize = '18px';
        console.log("Body font size changed to 18px");
        
        // BONUS: If the background color of the div is "light blue", alert "Hello x and y"
        console.log("\nBONUS: Check for light blue background and show users:");
        setTimeout(function() {
            let bgColor = window.getComputedStyle(containerDiv).backgroundColor;
            let isLightBlue = bgColor.includes('173') || bgColor.includes('216') || bgColor.includes('230') || 
                             containerDiv.style.backgroundColor === 'lightblue' ||
                             bgColor === 'rgb(173, 216, 230)';
            
            if (isLightBlue) {
                let allUsers = [];
                let allLis = document.querySelectorAll('ul li');
                
                allLis.forEach(function(li) {
                    if (li.style.display !== 'none') {
                        allUsers.push(li.textContent);
                    }
                });
                
                let uniqueUsers = [...new Set(allUsers)];
                
                if (uniqueUsers.length >= 2) {
                    alert(`Hello ${uniqueUsers[0]} and ${uniqueUsers[1]}!`);
                    console.log(`Alert shown: Hello ${uniqueUsers[0]} and ${uniqueUsers[1]}!`);
                } else {
                    alert(`Hello ${uniqueUsers.join(', ')}!`);
                    console.log(`Alert shown: Hello ${uniqueUsers.join(', ')}!`);
                }
            }
        }, 200);
    } else {
        console.log("Container div not found - Exercise 5 requires specific HTML structure");
    }
}

// ============================================
// EXERCISE 6: Navigation Bar DOM Manipulation
// ============================================

// Function to run the complete exercise
function runExercise6() {
    const output = document.getElementById('output6');
    if (output) output.textContent = '';
    
    console.log("=== Exercise 6: Navigation Bar DOM Manipulation ===\n");
    
    try {
        // Step 1: Change the id attribute from navBar to socialNetworkNavigation
        console.log("Step 1: Changing ID attribute...");
        const navDiv = document.getElementById('navBar');
        
        if (navDiv) {
            console.log("Original element:", navDiv);
            console.log("Original ID:", navDiv.id);
            
            navDiv.setAttribute('id', 'socialNetworkNavigation');
            console.log("New ID:", navDiv.id);
            console.log("✓ ID successfully changed to 'socialNetworkNavigation'\n");
            
            if (output) output.textContent += `Step 1: Changed ID from 'navBar' to 'socialNetworkNavigation'\n`;
            
            // Highlight the element to show the change
            navDiv.classList.add('highlight');
        } else {
            console.log("❌ Navigation div not found!");
            if (output) output.textContent += "❌ Error: Navigation div not found!\n";
            return;
        }
        
        // Step 2: Get the unordered list
        const ulElement = document.querySelector('#socialNetworkNavigation ul');
        
        if (ulElement) {
            console.log("Found UL element:", ulElement);
            
            // Step 3: Create a new <li> element
            console.log("\nStep 2-3: Creating new <li> element...");
            const newLiElement = document.createElement('li');
            console.log("Created new <li> element:", newLiElement);
            if (output) output.textContent += `\nStep 2-3: Created new <li> element\n`;
            
            // Step 4: Create a text node with "Logout"
            console.log("Step 4: Creating 'Logout' text node...");
            const logoutText = document.createTextNode('Logout');
            console.log("Created 'Logout' text node:", logoutText);
            if (output) output.textContent += `Step 4: Created 'Logout' text node\n`;
            
            // Step 5: Create an anchor element for the logout link
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.appendChild(logoutText);
            
            // Append the anchor to the li element
            newLiElement.appendChild(logoutLink);
            console.log("✓ Added logout link to <li> element:", newLiElement);
            if (output) output.textContent += `Step 5: Created logout link and added to <li>\n`;
            
            // Step 6: Append the new <li> to the <ul>
            console.log("Step 6: Appending new <li> to <ul>...");
            ulElement.appendChild(newLiElement);
            console.log("✓ Successfully appended logout <li> to <ul>");
            console.log("Updated UL:", ulElement);
            if (output) output.textContent += `Step 6: Successfully appended logout <li> to <ul>\n`;
            
            // Highlight the new element
            setTimeout(() => {
                newLiElement.classList.add('highlight');
            }, 1000);
            
        } else {
            console.log("❌ UL element not found!");
            if (output) output.textContent += "❌ Error: UL element not found!";
            return;
        }
        
        // Step 7: Use firstElementChild and lastElementChild properties
        console.log("\nStep 7: Retrieving first and last <li> elements...");
        
        if (ulElement) {
            const firstLi = ulElement.firstElementChild;
            const lastLi = ulElement.lastElementChild;
            
            console.log("First <li> element:", firstLi);
            console.log("Last <li> element:", lastLi);
            
            if (firstLi) {
                const firstText = firstLi.textContent;
                console.log(`First link text: "${firstText}"`);
                if (output) output.textContent += `\nStep 7: First link text: "${firstText}"\n`;
            }
            
            if (lastLi) {
                const lastText = lastLi.textContent;
                console.log(`Last link text: "${lastText}"`);
                if (output) output.textContent += `Step 7: Last link text: "${lastText}"\n`;
            }
            
            if (output) {
                output.textContent += `\n✅ Exercise 6 completed successfully!\n`;
                output.textContent += `The navigation bar now has ${ulElement.children.length} items and the ID has been changed.`;
            }
            
            console.log("✅ Exercise 6 completed successfully!");
            
        } else {
            console.log("❌ Could not retrieve first/last elements!");
            if (output) output.textContent += "❌ Error: Could not retrieve first/last elements!\n";
        }
        
    } catch (error) {
        console.error("Error in Exercise 6:", error);
        if (output) output.textContent += `❌ Error: ${error.message}\n`;
    }
}

// Function to reset the navigation bar to original state
function resetNavigationBar() {
    // Remove any highlights
    document.querySelectorAll('.highlight').forEach(el => {
        el.classList.remove('highlight');
    });
    
    // Reset the ID if it was changed
    const navDiv = document.getElementById('socialNetworkNavigation');
    if (navDiv) {
        navDiv.setAttribute('id', 'navBar');
    }
    
    // Remove the logout li if it was added
    const logoutLi = document.querySelector('li:last-child');
    if (logoutLi && logoutLi.textContent.includes('Logout')) {
        logoutLi.remove();
    }
    
    const output = document.getElementById('output6');
    if (output) output.textContent = "Navigation bar reset to original state. Click 'Run Exercise 6' to execute again.";
    
    console.log("Navigation bar reset to original state");
}

// ============================================
// EXERCISE 7: My Book List - DOM Rendering
// ============================================

// Function to handle image loading errors with a fallback
function handleImageError(imgElement, bookTitle) {
    console.log(`⚠️ Image failed to load for: ${bookTitle}`);
    
    // Replace with a placeholder image using a placeholder service
    imgElement.src = `https://via.placeholder.com/100x140/f5f5f5/999999?text=📚`;
    imgElement.alt = `${bookTitle} - Cover Not Available`;
    imgElement.title = 'Book cover image not available';
    
    // Add a visual indicator that this is a placeholder
    imgElement.style.border = '2px dashed #ccc';
    imgElement.style.backgroundColor = '#f9f9f9';
}

// Array of books - each book is an object with 4 properties
const allBooks = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        image: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
        alreadyRead: true
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        image: "https://covers.openlibrary.org/b/isbn/9780446310789-L.jpg",
        alreadyRead: false
    },
    {
        title: "1984",
        author: "George Orwell",
        image: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
        alreadyRead: true
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        image: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
        alreadyRead: false
    }
];

// Function to render all books in the DOM
function renderBooks() {
    console.log("=== Exercise 7: Rendering Book List ===");
    console.log("Books to render:", allBooks);
    
    // Get the section element
    const booksSection = document.querySelector('.listBooks');
    
    if (!booksSection) {
        console.error("❌ Error: Could not find .listBooks section");
        return;
    }
    
    // Clear any existing content
    booksSection.innerHTML = '';
    
    // Show loading state
    booksSection.classList.add('loading');
    
    // Render each book
    allBooks.forEach((book, index) => {
        console.log(`\nRendering book ${index + 1}:`, book);
        
        // Create a div for each book
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book-card';
        
        // Add 'read' class if the book is already read
        if (book.alreadyRead) {
            bookDiv.classList.add('read');
            console.log(`📖 "${book.title}" - Already read (RED color applied)`);
        } else {
            console.log(`📚 "${book.title}" - Not yet read`);
        }
        
        // Create the book HTML structure
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="${book.title} Cover" class="book-image" 
                 onerror="handleImageError(this, '${book.title}');">
            <div class="book-details">
                <div class="book-title">${book.title}</div>
                <div class="book-author">written by ${book.author}</div>
                <span class="book-status ${book.alreadyRead ? 'read' : 'unread'}">
                    ${book.alreadyRead ? 'Already Read' : 'Not Read Yet'}
                </span>
            </div>
        `;
        
        // Add click event to book card
        bookDiv.addEventListener('click', () => {
            console.log(`Clicked on: ${book.title} by ${book.author}`);
        });
        
        // Append the book div to the section
        booksSection.appendChild(bookDiv);
        
        console.log(`✅ Book "${book.title}" rendered successfully`);
    });
    
    // Remove loading state after a delay
    setTimeout(() => {
        booksSection.classList.remove('loading');
        booksSection.classList.add('loaded');
        console.log(`🎉 Successfully rendered ${allBooks.length} books!`);
    }, 500);
    
    // Display final summary
    const readBooks = allBooks.filter(book => book.alreadyRead);
    const unreadBooks = allBooks.filter(book => !book.alreadyRead);
    
    console.log(`\n📊 Book Summary:`);
    console.log(`- Total books: ${allBooks.length}`);
    console.log(`- Already read (RED): ${readBooks.length}`);
    console.log(`- Not yet read: ${unreadBooks.length}`);
}

// Function to clear all books from the display
function clearBooks() {
    console.log("🗑️ Clearing all books from display...");
    
    const booksSection = document.querySelector('.listBooks');
    if (booksSection) {
        booksSection.innerHTML = '<div class="placeholder">{{👆}} Click "Render Books" to display your book collection!</div>';
        console.log("✅ Books cleared successfully");
    }
}

// Function to add sample books (bonus functionality)
function addSampleBooks() {
    console.log("➕ Adding sample books to the array...");
    
    const sampleBook = {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        image: "https://covers.openlibrary.org/b/isbn/9780316769174-L.jpg",
        alreadyRead: Math.random() > 0.5 // Random true/false
    };
    
    allBooks.push(sampleBook);
    console.log(`✅ Added "${sampleBook.title}" - Status: ${sampleBook.alreadyRead ? 'Already Read' : 'Not Read Yet'}`);
    
    // Auto-render after adding
    setTimeout(() => {
        renderBooks();
    }, 1000);
}

// Function to toggle a book's read status
function toggleBookStatus(bookIndex) {
    if (bookIndex >= 0 && bookIndex < allBooks.length) {
        const book = allBooks[bookIndex];
        book.alreadyRead = !book.alreadyRead;
        
        console.log(`🔄 Toggled "${book.title}" status to: ${book.alreadyRead ? 'Already Read' : 'Not Read Yet'}`);
        
        // Re-render to show updated colors
        setTimeout(() => {
            renderBooks();
        }, 500);
    } else {
        console.log("❌ Invalid book index:", bookIndex);
    }
}

// Function to show book array information
function showBookInfo() {
    console.log("\n📖 All Books Array Information:");
    console.log("==================================");
    
    allBooks.forEach((book, index) => {
        console.log(`\nBook ${index + 1}:`);
        console.log(`  Title: "${book.title}"`);
        console.log(`  Author: ${book.author}`);
        console.log(`  Image URL: ${book.image}`);
        console.log(`  Already Read: ${book.alreadyRead} ${book.alreadyRead ? '(RED color will be applied)' : '(Normal color)'}`);
    });
    
    // Also show in alert for quick reference
    const bookTitles = allBooks.map(book => `• ${book.title} by ${book.author}`).join('\n');
    alert(`📚 Current Book List:\n\n${bookTitles}`);
}

// ============================================
// BROWSER INTERFACE FUNCTIONS
// ============================================

// Exercise 1 functions for browser interface
function runExercise1() {
    const output = document.getElementById('output1');
    if (output) {
        output.textContent = 'Exercise 1: Numbers divisible by 23\n\n';
        
        let numbersDivisible = [];
        let sum = 0;
        
        for (let i = 0; i <= 500; i++) {
            if (i % 23 === 0) {
                numbersDivisible.push(i);
                sum += i;
            }
        }
        
        output.textContent += `Numbers divisible by 23:\n${numbersDivisible.join(' ')}\n\n`;
        output.textContent += `Sum: ${sum}`;
    }
    
    console.log("=== Original Function (no parameter) ===");
    displayNumbersDivisible();
}

function runExercise1Bonus() {
    const divisor = Number(prompt("Enter a divisor:"));
    if (isNaN(divisor)) {
        alert("Please enter a valid number!");
        return;
    }
    
    const output = document.getElementById('output1');
    if (output) {
        output.textContent = `Exercise 1 Bonus: Numbers divisible by ${divisor}\n\n`;
        
        let numbersDivisible = [];
        let sum = 0;
        
        for (let i = 0; i <= 500; i++) {
            if (i % divisor === 0) {
                numbersDivisible.push(i);
                sum += i;
            }
        }
        
        output.textContent += `Numbers divisible by ${divisor}:\n${numbersDivisible.join(' ')}\n\n`;
        output.textContent += `Sum: ${sum}`;
    }
    
    console.log("\n=== Bonus Function with parameter ===");
    console.log(`Testing with divisor ${divisor}:`);
    displayNumbersDivisibleWithParameter(divisor);
}

// Exercise 2 functions for browser interface
function runExercise2() {
    const output = document.getElementById('output2');
    if (output) {
        output.textContent = 'Exercise 2: Shopping List\n\n';
        
        let totalBill = 0;
        
        output.textContent += `Shopping List: ${shoppingList.join(', ')}\n`;
        output.textContent += `Processing items...\n\n`;
        
        for (let item of shoppingList) {
            if (item in stock && stock[item] > 0) {
                let itemPrice = prices[item];
                output.textContent += `✓ ${item}: $${itemPrice} (in stock: ${stock[item]})\n`;
                totalBill += itemPrice;
            } else {
                output.textContent += `✗ ${item}: Not available or out of stock\n`;
            }
        }
        
        output.textContent += `\nTotal Bill: $${totalBill}`;
    }
    
    console.log("=== Exercise 2: Shopping List ===");
    console.log("Initial Stock:", stock);
    console.log("Prices:", prices);
    console.log("\n--- Calling myBill() ---");
    myBill();
}

function runExercise2Bonus() {
    runExercise2();
    const output = document.getElementById('output2');
    if (output) {
        output.textContent += '\n\n(Bonus: Stock would be decreased by 1 for purchased items)';
    }
    
    console.log("\n--- Calling myBillWithStockUpdate() (Bonus) ---");
    const result = myBillWithStockUpdate();
}

// Exercise 3 functions for browser interface
function runExercise3() {
    const output = document.getElementById('output3');
    if (output) {
        output.textContent = 'Exercise 3: Change Calculator\n\n';
        
        // Test cases
        const testCases = [
            { price: 4.25, change: [25, 20, 5, 0], expected: true },
            { price: 14.11, change: [2, 100, 0, 0], expected: false },
            { price: 0.75, change: [0, 0, 20, 5], expected: true }
        ];
        
        testCases.forEach((testCase, index) => {
            const { price, change } = testCase;
            const quartersValue = change[0] * 0.25;
            const dimesValue = change[1] * 0.10;
            const nickelsValue = change[2] * 0.05;
            const penniesValue = change[3] * 0.01;
            const totalChange = quartersValue + dimesValue + nickelsValue + penniesValue;
            const canAfford = totalChange >= price;
            
            output.textContent += `Test ${index + 1}: changeEnough(${price}, [${change.join(', ')}])\n`;
            output.textContent += `  ${change[0]} quarters × $0.25 = $${quartersValue.toFixed(2)}\n`;
            output.textContent += `  ${change[1]} dimes × $0.10 = $${dimesValue.toFixed(2)}\n`;
            output.textContent += `  ${change[2]} nickels × $0.05 = $${nickelsValue.toFixed(2)}\n`;
            output.textContent += `  ${change[3]} pennies × $0.01 = $${penniesValue.toFixed(2)}\n`;
            output.textContent += `  Total Change: $${totalChange.toFixed(2)}\n`;
            output.textContent += `  Can afford: ${canAfford}\n\n`;
        });
    }
    
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
}

// Exercise 4 functions for browser interface
function runExercise4() {
    const output = document.getElementById('output4');
    if (output) {
        output.textContent = 'Exercise 4: Vacation Costs\n\n';
        
        // Sample vacation scenario
        const nights = 5;
        const destination = "London";
        const days = 7;
        
        // Calculate costs
        const hotelCost = nights * 140;
        let planeCost;
        switch (destination.toLowerCase()) {
            case "london": planeCost = 183; break;
            case "paris": planeCost = 220; break;
            default: planeCost = 300;
        }
        let carCost = days * 40;
        if (days > 10) {
            carCost *= 0.95; // 5% discount
        }
        
        const totalCost = hotelCost + planeCost + carCost;
        
        output.textContent += `Vacation Details:\n`;
        output.textContent += `- ${nights} nights hotel: $${hotelCost}\n`;
        output.textContent += `- Destination ${destination}: $${planeCost}\n`;
        output.textContent += `- ${days} days car rental: $${carCost}\n`;
        output.textContent += `Total Vacation Cost: $${totalCost}`;
    }
    
    console.log("=== Exercise 4: Vacation Costs ===\n");
    
    console.log("Test Case 1: 5 nights hotel, London destination, 7 days car");
    let vacation1 = totalVacationCostWithParameters(5, "London", 7);
}

function runExercise4Prompt() {
    const nights = prompt("How many nights in hotel?") || "5";
    const destination = prompt("Destination?") || "London";
    const days = prompt("Days car rental?") || "7";
    
    const output = document.getElementById('output4');
    if (output) {
        output.textContent = `Exercise 4: Vacation Costs (User Input)\n\n`;
        
        const hotelCost = parseInt(nights) * 140;
        let planeCost;
        switch (destination.toLowerCase()) {
            case "london": planeCost = 183; break;
            case "paris": planeCost = 220; break;
            default: planeCost = 300;
        }
        let carCost = parseInt(days) * 40;
        if (parseInt(days) > 10) {
            carCost *= 0.95;
        }
        
        const totalCost = hotelCost + planeCost + carCost;
        
        output.textContent += `Vacation Details:\n`;
        output.textContent += `- ${nights} nights hotel: $${hotelCost}\n`;
        output.textContent += `- Destination ${destination}: $${planeCost}\n`;
        output.textContent += `- ${days} days car rental: $${carCost.toFixed(2)}\n`;
        output.textContent += `Total Vacation Cost: $${totalCost.toFixed(2)}`;
    }
    
    console.log("\nTest Case 2: 12 nights hotel, Paris destination, 15 days car (should get car discount)");
    let vacation2 = totalVacationCostWithParameters(12, "Paris", 15);
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("🌟 All JavaScript Exercises - Week 3 - Day 2");
    console.log("==============================================");
    console.log("All exercises are ready to run!");
    console.log("Open browser console to see detailed outputs.");
    
    // Auto-run some exercises for demonstration
    setTimeout(() => {
        console.log("\n🚀 Auto-running Exercise 1 for demonstration...");
        displayNumbersDivisible();
        
        console.log("\n🚀 Auto-running Exercise 2 for demonstration...");
        myBill();
        
        console.log("\n🚀 Auto-running Exercise 3 for demonstration...");
        changeEnough(4.25, [25, 20, 5, 0]);
        
        console.log("\n🚀 Auto-running Exercise 4 for demonstration...");
        totalVacationCostWithParameters(5, "London", 7);
    }, 1000);
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        displayNumbersDivisible,
        displayNumbersDivisibleWithParameter,
        myBill,
        myBillWithStockUpdate,
        changeEnough,
        hotelCost,
        planeRideCost,
        rentalCarCost,
        totalVacationCost,
        totalVacationCostWithParameters,
        runExercise5,
        runExercise6,
        resetNavigationBar,
        allBooks,
        renderBooks,
        clearBooks,
        addSampleBooks,
        toggleBookStatus,
        showBookInfo
    };
}
