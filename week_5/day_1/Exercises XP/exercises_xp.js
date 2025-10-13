// Exercise 1: Comparison
// Create a function called compareToTen(num) that takes a number as an argument.
function compareToTen(num) {
    return new Promise((resolve, reject) => {
        if (num <= 10) {
            resolve(`${num} is less than or equal to 10`);
        } else {
            reject(`${num} is greater than 10`);
        }
    });
}

// Test Exercise 1
console.log("=== Exercise 1 Tests ===");
// In the example, the promise should reject
compareToTen(15)
    .then(result => console.log(result))
    .catch(error => console.log(error));

// In the example, the promise should resolve
compareToTen(8)
    .then(result => console.log(result))
    .catch(error => console.log(error));

// Exercise 2: Promises
// Create a promise that resolves itself in 4 seconds and returns a "success" string.

const promiseExercise2 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("success");
    }, 4000);
});

console.log("\n=== Exercise 2 Test ===");
promiseExercise2
    .then(result => console.log(result))
    .catch(error => console.log(error));

// Exercise 3: Resolve & Reject
// Use Promise.resolve(value) to create a promise that will resolve itself with a value of 3.
// Use Promise.reject(error) to create a promise that will reject itself with the string "Boo!"

const resolvedPromise = Promise.resolve(3);
const rejectedPromise = Promise.reject("Boo!");

console.log("\n=== Exercise 3 Tests ===");
resolvedPromise
    .then(result => console.log("Resolved with:", result))
    .catch(error => console.log("Error:", error));

rejectedPromise
    .then(result => console.log("Resolved with:", result))
    .catch(error => console.log("Rejected with:", error));
