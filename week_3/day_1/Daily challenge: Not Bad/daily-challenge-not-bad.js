// Daily challenge: Not Bad - String Manipulation with "not" and "bad"

// Function to replace "not...bad" with "good"
function replaceNotBad(sentence) {
    const wordNot = sentence.indexOf("not");
    const wordBad = sentence.indexOf("bad");
    if (wordNot !== -1 && wordBad !== -1 && wordBad > wordNot) {
       
        const beforeNot = sentence.substring(0, wordNot);
        const afterBad = sentence.substring(wordBad + 3); // 3 is the length of "bad"
        const result = beforeNot + "good" + afterBad;
        console.log(result);
        return result;
    } else {
        console.log(sentence);
        return sentence;
    }
}

// Test cases
console.log("=== String Manipulation Exercise ===");

// Test case 1: Example from instructions
const sentence1 = "The movie is not that bad, I like it";
console.log("\nOriginal: " + sentence1);
console.log("Result: ");
replaceNotBad(sentence1);

// Test case 2: Another example from instructions
const sentence2 = "This dinner is not that bad ! You cook well";
console.log("\nOriginal: " + sentence2);
console.log("Result: ");
replaceNotBad(sentence2);

// Test case 3: Another example from instructions
const sentence3 = "This movie is not so bad !";
console.log("\nOriginal: " + sentence3);
console.log("Result: ");
replaceNotBad(sentence3);

// Test case 4: "bad" without "not" - should remain unchanged
const sentence4 = "This dinner is bad !";
console.log("\nOriginal: " + sentence4);
console.log("Result: ");
replaceNotBad(sentence4);

// Test case 5: "not" comes after "bad" - should remain unchanged
const sentence5 = "This movie is bad, not good !";
console.log("\nOriginal: " + sentence5);
console.log("Result: ");
replaceNotBad(sentence5);

// Test case 6: Neither word present - should remain unchanged
const sentence6 = "This movie is great !";
console.log("\nOriginal: " + sentence6);
console.log("Result: ");
replaceNotBad(sentence6);

// Test case 7: Multiple "not" and "bad" - uses first occurrence
const sentence7 = "This is not bad, but that is not bad either";
console.log("\nOriginal: " + sentence7);
console.log("Result: ");
replaceNotBad(sentence7);
