// Exercise 1: Checking the BMI

// Create two person objects with details and BMI calculation method
const person1 = {
    fullName: "John Smith",
    mass: 75, // kg
    height: 1.75, // meters
    calculateBMI: function() {
        return this.mass / (this.height * this.height);
    }
};

const person2 = {
    fullName: "Jane Doe",
    mass: 68, // kg
    height: 1.60, // meters
    calculateBMI: function() {
        return this.mass / (this.height * this.height);
    }
};

// Function to compare BMI of both persons
function compareBMI(person1, person2) {
    const bmi1 = person1.calculateBMI();
    const bmi2 = person2.calculateBMI();
    
    console.log(`${person1.fullName}'s BMI: ${bmi1.toFixed(2)}`);
    console.log(`${person2.fullName}'s BMI: ${bmi2.toFixed(2)}`);
    
    if (bmi1 > bmi2) {
        console.log(`${person1.fullName} has the largest BMI (${bmi1.toFixed(2)})`);
        return person1.fullName;
    } else if (bmi2 > bmi1) {
        console.log(`${person2.fullName} has the largest BMI (${bmi2.toFixed(2)})`);
        return person2.fullName;
    } else {
        console.log("Both persons have the same BMI");
        return "Equal";
    }
}

// Test the function
console.log("=== BMI Comparison ===");
const result = compareBMI(person1, person2);
