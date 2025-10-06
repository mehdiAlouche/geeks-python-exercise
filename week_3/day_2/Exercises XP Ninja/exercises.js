// Exercise 1: Random Number
// Get a random number between 1 and 100.
// Console.log all even numbers from 0 to the random number.

function generateRandomAndShowEvens() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    console.log(`Random number: ${randomNumber}`);
    console.log("Even numbers from 0 to the random number:");
    
    for (let i = 0; i <= randomNumber; i += 2) {
        console.log(i);
    }
}

// Test Exercise 1
console.log("Exercise 1 - Random Number and Even Numbers:");
generateRandomAndShowEvens();

// Exercise 2: Capitalized letters
// Create a function that takes a string as an argument.
// Return: The string but all letters in even indexes should be capitalized.
// Return: The string but all letters in odd indexes should be capitalized.

function capitalize(str) {
    let evenCapitalized = '';
    let oddCapitalized = '';
    
    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0) {
            // Even index - capitalize for first result, lowercase for second
            evenCapitalized += str[i].toUpperCase();
            oddCapitalized += str[i].toLowerCase();
        } else {
            // Odd index - lowercase for first result, capitalize for second
            evenCapitalized += str[i].toLowerCase();
            oddCapitalized += str[i].toUpperCase();
        }
    }
    
    return [evenCapitalized, oddCapitalized];
}

// Test cases for Exercise 2
console.log("\nExercise 2 - Capitalize:");
console.log(capitalize("abcdef")); // ['AbCdEf', 'aBcDeF']
console.log(capitalize("hello")); // ['HeLlO', 'hElLo']

// Exercise 3: Is palindrome?
// Write a JavaScript function that checks whether a string is a palindrome or not.

function isPalindrome(str) {
    // Remove spaces and convert to lowercase for comparison
    const cleanStr = str.toLowerCase().replace(/\s/g, '');
    const reversed = cleanStr.split('').reverse().join('');
    return cleanStr === reversed;
}

// Test cases for Exercise 3
console.log("\nExercise 3 - Is Palindrome:");
console.log(isPalindrome("madam")); // true
console.log(isPalindrome("bob")); // true
console.log(isPalindrome("kayak")); // true
console.log(isPalindrome("hello")); // false
console.log(isPalindrome("A man a plan a canal Panama")); // true

// Exercise 4: Biggest Number
// Create a function called biggestNumberInArray(arrayNumber) that takes an array as a parameter and returns the biggest number.

function biggestNumberInArray(arrayNumber) {
    if (arrayNumber.length === 0) {
        return 0;
    }
    
    let biggest = -Infinity;
    
    for (let i = 0; i < arrayNumber.length; i++) {
        if (typeof arrayNumber[i] === 'number' && arrayNumber[i] > biggest) {
            biggest = arrayNumber[i];
        }
    }
    
    return biggest === -Infinity ? 0 : biggest;
}

// Test cases for Exercise 4
console.log("\nExercise 4 - Biggest Number:");
const array = [-1, 0, 3, 100, 99, 2, 99];
const array2 = ['a', 3, 4, 2];
const array3 = [];
console.log(biggestNumberInArray(array)); // should return 100
console.log(biggestNumberInArray(array2)); // should return 4
console.log(biggestNumberInArray(array3)); // should return 0

// Exercise 5: Unique Elements
// Write a JS function that takes an array and returns a new array with only unique elements.

function getUniqueElements(arr) {
    return [...new Set(arr)];
}

// Alternative implementation without Set
function getUniqueElementsAlternative(arr) {
    const unique = [];
    for (let i = 0; i < arr.length; i++) {
        if (!unique.includes(arr[i])) {
            unique.push(arr[i]);
        }
    }
    return unique;
}

// Test cases for Exercise 5
console.log("\nExercise 5 - Unique Elements:");
const list = [1, 2, 3, 3, 3, 3, 4, 5];
console.log(getUniqueElements(list)); // [1, 2, 3, 4, 5]
console.log(getUniqueElements([1, 1, 2, 2, 3, 3])); // [1, 2, 3]
