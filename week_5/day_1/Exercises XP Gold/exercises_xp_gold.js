// Exercise 1: Promise.all()

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 'foo');
});

console.log("=== Exercise 1: Promise.all() ===");

Promise.all([promise1, promise2, promise3])
    .then(result => {
        console.log("Result:", result);
        console.log("Expected output: Array [3, 42, 'foo']");
    })
    .catch(error => {
        console.log("Error:", error);
    });

/*
How Promise.all() works:
1. Promise.all() takes an array of promises (or values) as input
2. It waits for ALL promises to resolve before returning
3. It returns an array of resolved values in the same order as input
4. If ANY promise rejects, Promise.all() immediately rejects with that error
5. Non-promise values (like the number 42) are treated as already resolved

Why we receive [3, 42, "foo"]:
- promise1 resolves immediately with 3
- promise2 is just the number 42 (treated as resolved value)
- promise3 resolves after 3 seconds with "foo"
- Promise.all waits for all to complete, then returns [3, 42, "foo"]
*/

// Exercise 2: Analyse Promise.all()
// Analyse the code below - what will be the output ?

function timesTwoAsync(x) {
    return new Promise(resolve => resolve(x * 2));
}

const arr = [1, 2, 3];
const promiseArr = arr.map(timesTwoAsync);

console.log("\n=== Exercise 2: Analyse Promise.all() ===");

Promise.all(promiseArr)
    .then(result => {
        console.log("Result:", result);
    });

/*
Analysis of Exercise 2:

1. timesTwoAsync(x) creates a Promise that resolves with x * 2
2. arr = [1, 2, 3] is our input array
3. arr.map(timesTwoAsync) creates an array of promises:
   - timesTwoAsync(1) → Promise resolving to 2
   - timesTwoAsync(2) → Promise resolving to 4
   - timesTwoAsync(3) → Promise resolving to 6
4. Promise.all(promiseArr) waits for all promises to resolve
5. Since all promises resolve immediately (no async operations), 
   the result will be [2, 4, 6]

Expected output: [2, 4, 6]
*/
