// Exercise 1: isBlank
// Write a program to check whether a string is blank or not.
function isBlank(str) {
    return str.trim() === '';
}

// Test cases for Exercise 1
console.log("Exercise 1 - isBlank:");
console.log(isBlank('')); // --> true
console.log(isBlank('abc')); // --> false
console.log(isBlank('   ')); // --> true (whitespace only)
console.log(isBlank('  abc  ')); // --> false

// Exercise 2: abbrevName
// Write a JavaScript function to convert a string into an abbreviated form.
function abbrevName(name) {
    const parts = name.trim().split(' ');
    if (parts.length < 2) {
        return name; // Return as is if only one name
    }
    return parts[0] + ' ' + parts[1].charAt(0).toUpperCase() + '.';
}

// Test cases for Exercise 2
console.log("\nExercise 2 - abbrevName:");
console.log(abbrevName("mehdi benabdeljelil")); // --> "mehdi b."
console.log(abbrevName("ahmed benabdeljelil")); // --> "ahmed b."
console.log(abbrevName("najat benabdeljelil")); // --> "najat b."

// Exercise 3: swapCase
function swapCase(str) {
    return str.split('').map(char => {
        if (char === char.toUpperCase()) {
            return char.toLowerCase();
        } else {
            return char.toUpperCase();
        }
    }).join('');
}

// Test cases for Exercise 3
console.log("\nExercise 3 - swapCase:");
console.log(swapCase('The Quick Brown Fox')); // --> 'tHE qUICK bROWN fOX'
console.log(swapCase('Hello World')); // --> 'hELLO wORLD'
console.log(swapCase('JavaScript')); // --> 'jAVAsCRIPT'

// Exercise 4: isOmnipresent
function isOmnipresent(arr, value) {
    return arr.every(subArray => subArray.includes(value));
}

// Test cases for Exercise 4
console.log("\nExercise 4 - isOmnipresent:");
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); // ➞ true
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6)); // ➞ false
console.log(isOmnipresent([[3, 4], [8, 3, 2], [3], [9, 3], [5, 3], [4, 3]], 3)); // ➞ true
