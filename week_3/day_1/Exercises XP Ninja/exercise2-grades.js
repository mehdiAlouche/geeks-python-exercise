// Exercise 2: Grade Average

// Function to calculate and display the average grade
function findAvg(gradesList) {
    // Calculate the sum of all grades
    let sum = 0;
    for (let i = 0; i < gradesList.length; i++) {
        sum += gradesList[i];
    }
    
    // Calculate the average
    const average = sum / gradesList.length;
    
    // Display the average
    console.log(`Average grade: ${average.toFixed(2)}`);
    
    // Check if passed or failed
    if (average > 65) {
        console.log("Congratulations! You passed the course.");
    } else {
        console.log("Sorry, you failed and must repeat the course.");
    }
    
    return average;
}

// Bonus: Split into two separate functions
// Function 1: Calculate average only
function calculateAverage(gradesList) {
    let sum = 0;
    for (let i = 0; i < gradesList.length; i++) {
        sum += gradesList[i];
    }
    return sum / gradesList.length;
}

// Function 2: Display result and pass/fail status
function displayGradeResult(gradesList) {
    const average = calculateAverage(gradesList);
    console.log(`Average grade: ${average.toFixed(2)}`);
    
    if (average > 65) {
        console.log("Congratulations! You passed the course.");
    } else {
        console.log("Sorry, you failed and must repeat the course.");
    }
    
    return average;
}

// Test the functions
console.log("=== Grade Average Calculator ===");

// Test case 1: Passing grades
const grades1 = [85, 92, 78, 90, 88];
console.log("\nGrades 1:", grades1);
findAvg(grades1);

// Test case 2: Failing grades
const grades2 = [45, 60, 55, 48, 52];
console.log("\nGrades 2:", grades2);
findAvg(grades2);

// Test case 3: Using the bonus functions
const grades3 = [70, 75, 68, 72, 80];
console.log("\nGrades 3 (using bonus functions):", grades3);
displayGradeResult(grades3);
