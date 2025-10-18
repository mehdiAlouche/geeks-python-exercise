// Import persons array from data.js using ES6 module syntax
import persons from './data.js';

// Function that calculates and prints the average age of all persons
function calculateAverageAge(personArray) {
    if (personArray.length === 0) {
        console.log("No persons in the array to calculate average age.");
        return 0;
    }
    
    // Calculate total age
    const totalAge = personArray.reduce((sum, person) => sum + person.age, 0);
    
    // Calculate average age
    const averageAge = totalAge / personArray.length;
    
    return averageAge;
}

// Function to display detailed information about persons and their average age
function displayPersonStatistics(personArray) {
    console.log(" Person Statistics Report");
    console.log("=" .repeat(50));
    
    console.log(`\n Total number of persons: ${personArray.length}`);
    
    // Display all persons
    console.log("\n Person Details:");
    personArray.forEach((person, index) => {
        console.log(`   ${index + 1}. ${person.name} - Age: ${person.age} - Location: ${person.location}`);
    });
    
    // Calculate and display average age
    const averageAge = calculateAverageAge(personArray);
    console.log(`\n Average Age: ${averageAge.toFixed(2)} years`);
    
    // Additional statistics
    const ages = personArray.map(person => person.age);
    const youngestAge = Math.min(...ages);
    const oldestAge = Math.max(...ages);
    
    console.log(`\n Age Range:`);
    console.log(`   Youngest: ${youngestAge} years`);
    console.log(`   Oldest: ${oldestAge} years`);
    console.log(`   Range: ${oldestAge - youngestAge} years`);
}

// Use the imported array and the average age function
console.log("🚀 Exercise 2: Advanced Module Usage using ES6 module syntax");
console.log("=" .repeat(70));

// Call the function to display statistics
displayPersonStatistics(persons);

// Demonstrate the average age function separately
console.log("\n" + "=" .repeat(50));
console.log(" Direct Average Age Calculation:");
const directAverage = calculateAverageAge(persons);
console.log(`The average age of all persons is: ${directAverage.toFixed(2)} years`);

console.log("\n ES6 module import and average age calculation completed successfully!");
