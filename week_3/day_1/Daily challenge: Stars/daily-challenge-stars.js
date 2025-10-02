// Daily challenge: Stars: Pattern Recreation with For Loops

console.log("=== Pattern Recreation Exercise ===");

console.log("\n--- Method 1: Using One Loop ---");

// Method 1: Using one loop with string repetition
function createPatternOneLoop() {
    for (let i = 1; i <= 6; i++) {
        let pattern = "";
        // Repeat "* " i times, then remove the last space
        pattern = "* ".repeat(i).trim();
        console.log(pattern);
    }
}

createPatternOneLoop();

console.log("\n--- Method 2: Using Nested For Loops ---");

// Method 2: Using nested for loops
function createPatternNestedLoops() {
    for (let row = 1; row <= 6; row++) {  // Outer loop for rows
        let pattern = "";
        for (let col = 1; col <= row; col++) {  // Inner loop for columns
            pattern += "* ";
        }
        // Remove the last space for cleaner output
        pattern = pattern.trim();
        console.log(pattern);
    }
}

createPatternNestedLoops();

console.log("\n--- Alternative Method 2: Nested Loops with Different Logic ---");

// Alternative approach with nested loops - building character by character
function createPatternAlternativeNested() {
    for (let i = 1; i <= 6; i++) {  // Outer loop for rows
        let line = "";
        for (let j = 1; j <= i; j++) {  // Inner loop for asterisks in each row
            line += "*";
            // Add space after each asterisk except the last one
            if (j < i) {
                line += " ";
            }
        }
        console.log(line);
    }
}

createPatternAlternativeNested();

console.log("\n--- Bonus: Reverse Pattern with Nested Loops ---");

// Bonus: Creating the reverse pattern
function createReversePattern() {
    for (let i = 6; i >= 1; i--) {  // Outer loop counts down
        let pattern = "";
        for (let j = 1; j <= i; j++) {  // Inner loop for asterisks
            pattern += "* ";
        }
        pattern = pattern.trim();
        console.log(pattern);
    }
}

createReversePattern();

console.log("\n--- Bonus: Pyramid Pattern ---");

// Bonus: Creating a pyramid pattern
function createPyramidPattern() {
    const height = 6;
    for (let i = 1; i <= height; i++) {
        let line = "";
        
        // Add spaces for indentation
        for (let space = 1; space <= height - i; space++) {
            line += " ";
        }
        
        // Add asterisks
        for (let star = 1; star <= i; star++) {
            line += "* ";
        }
        
        console.log(line);
    }
}

createPyramidPattern();
