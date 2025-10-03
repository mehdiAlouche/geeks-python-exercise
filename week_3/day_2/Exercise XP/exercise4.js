// Exercise 4: Vacation Costs

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

// Test functions without promps (using parameters)
console.log("=== Exercise 4: Vacation Costs ===\n");

console.log("Test Case 1: 5 nights hotel, London destination, 7 days car");
let vacation1 = totalVacationCostWithParameters(5, "London", 7);

console.log("\nTest Case 2: 12 nights hotel, Paris destination, 15 days car (should get car discount)");
let vacation2 = totalVacationCostWithParameters(12, "Paris", 15);

console.log("\nTest Case 3: 3 nights hotel, Tokyo destination, 3 days car");
let vacation3 = totalVacationCostWithParameters(3, "Tokyo", 3);

// Note: Uncomment the line below to test with actual prompts in browser
// totalVacationCost();
