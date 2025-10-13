// Daily Challenge: Play with words
// What You will learn: Promises

// 1st Daily Challenge
// Create two functions. Each function should return a promise.

// The first function called makeAllCaps(), takes an array of words as an argument
// If all the words in the array are strings, resolve the promise. The value of the resolved promise is the array of words uppercased.
// else, reject the promise with a reason.

function makeAllCaps(words) {
    return new Promise((resolve, reject) => {
        // Check if all elements in the array are strings
        const allStrings = words.every(word => typeof word === 'string');
        
        if (allStrings) {
            // Convert all words to uppercase
            const uppercasedWords = words.map(word => word.toUpperCase());
            resolve(uppercasedWords);
        } else {
            reject("Error: Not all elements in the array are strings");
        }
    });
}

// The second function called sortWords(), takes an array of words uppercased as an argument
// If the array length is bigger than 4, resolve the promise. The value of the resolved promise is the array of words sorted in alphabetical order.
// else, reject the promise with a reason.

function sortWords(words) {
    return new Promise((resolve, reject) => {
        if (words.length > 4) {
            // Sort words in alphabetical order
            const sortedWords = words.sort();
            resolve(sortedWords);
        } else {
            reject("Error: Array length is not bigger than 4");
        }
    });
}

console.log("=== 1st Daily Challenge Tests ===");

// Test 1: catch method is executed, because the array contains a number
console.log("Test 1: Array with number");
makeAllCaps([1, "pear", "banana"])
    .then((arr) => sortWords(arr))
    .then((result) => console.log(result))
    .catch(error => console.log(error));

// Test 2: catch method is executed, because the array length is not bigger than 4
console.log("\nTest 2: Array length <= 4");
makeAllCaps(["apple", "pear", "banana"])
    .then((arr) => sortWords(arr))
    .then((result) => console.log(result))
    .catch(error => console.log(error));

// Test 3: you should see in the console, the array of words uppercased and sorted
console.log("\nTest 3: Valid array with length > 4");
makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
    .then((arr) => sortWords(arr))
    .then((result) => console.log(result)) //["APPLE","BANANA", "KIWI", "MELON", "PEAR"]
    .catch(error => console.log(error));

// 2nd Daily Challenge
// Create three functions. The two first functions should return a promise.

const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

// The first function is named toJs():
// this function converts the morse json string provided above to a morse javascript object.
// if the morse javascript object is empty, throw an error (use reject)
// else return the morse javascript object (use resolve)

function toJs() {
    return new Promise((resolve, reject) => {
        try {
            const morseJS = JSON.parse(morse);
            
            // Check if the object is empty
            if (Object.keys(morseJS).length === 0) {
                reject("Error: Morse javascript object is empty");
            } else {
                resolve(morseJS);
            }
        } catch (error) {
            reject("Error: Failed to parse morse JSON string");
        }
    });
}

// The second function called toMorse(morseJS), takes one argument: the new morse javascript object.
// This function asks the user for a word or a sentence.
// if the user entered a character that doesn't exist in the new morse javascript object, throw an error. (use reject)
// else return an array with the morse translation of the user's word.

function toMorse(morseJS) {
    return new Promise((resolve, reject) => {
        // For demonstration purposes, we'll use a predefined word
        // In a real application, you would use prompt() or readline
        const userInput = "Hello"; // This would normally come from user input
        
        console.log(`\n=== 2nd Daily Challenge ===`);
        console.log(`User input: "${userInput}"`);
        
        const inputArray = userInput.toLowerCase().split('');
        const morseTranslation = [];
        
        for (let char of inputArray) {
            if (morseJS[char]) {
                morseTranslation.push(morseJS[char]);
            } else {
                reject(`Error: Character "${char}" doesn't exist in the morse javascript object`);
                return;
            }
        }
        
        resolve(morseTranslation);
    });
}

// The third function called joinWords(morseTranslation), takes one argument: the morse translation array
// this function joins the morse translation by using line break and display it on the page (ie. On the DOM)

function joinWords(morseTranslation) {
    const morseString = morseTranslation.join('\n');
    console.log("Morse translation:");
    console.log(morseString);
    
    // In a real DOM environment, you would do:
    // document.body.innerHTML = morseString;
    
    return morseString;
}

// Chain the three functions
console.log("\n=== Chaining the three functions ===");
toJs()
    .then(morseJS => toMorse(morseJS))
    .then(morseTranslation => joinWords(morseTranslation))
    .catch(error => console.log(error));

// Additional test cases for the morse translator
console.log("\n=== Additional Test Cases ===");

// Test with a word that contains unsupported characters
function toMorseTest(morseJS, testWord) {
    return new Promise((resolve, reject) => {
        console.log(`Testing with: "${testWord}"`);
        
        const inputArray = testWord.toLowerCase().split('');
        const morseTranslation = [];
        
        for (let char of inputArray) {
            if (morseJS[char]) {
                morseTranslation.push(morseJS[char]);
            } else {
                reject(`Error: Character "${char}" doesn't exist in the morse javascript object`);
                return;
            }
        }
        
        resolve(morseTranslation);
    });
}

// Test with "Hello" (should work)
toJs()
    .then(morseJS => toMorseTest(morseJS, "Hello"))
    .then(morseTranslation => {
        console.log("Success! Morse translation:");
        console.log(morseTranslation.join('\n'));
    })
    .catch(error => console.log(error));

// Test with "¡Hola!" (should fail because of "¡")
toJs()
    .then(morseJS => toMorseTest(morseJS, "¡Hola!"))
    .then(morseTranslation => {
        console.log("Success! Morse translation:");
        console.log(morseTranslation.join('\n'));
    })
    .catch(error => console.log(error));
