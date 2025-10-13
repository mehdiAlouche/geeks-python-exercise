// 🌟 Exercises XP Gold: Fetch API & Async/Await
// Open this file in a browser or Node.js environment to run the exercises

console.log("🌟 Exercises XP Gold: Fetch API & Async/Await");
console.log("===============================================");

// Exercise 1: Giphy API #2
console.log("\n📝 Exercise 1: Giphy API #2");
console.log("Fetching a random GIF and appending to page...");

async function exercise1() {
    const giphyUrl = "https://api.giphy.com/v1/gifs/random?api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

    try {
        const response = await fetch(giphyUrl);
        
        // Check the status of the response
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ Exercise 1 - Success!");
        console.log("Random GIF data:", data);
        
        // Extract the GIF URL from the images sub-object
        const gifUrl = data.data.images.original.url;
        console.log("GIF URL:", gifUrl);
        
        // In a browser environment, you would append this to the page like this:
        // const img = document.createElement('img');
        // img.src = gifUrl;
        // img.alt = 'Random GIF';
        // document.body.appendChild(img);
        
        console.log("🎉 Random GIF fetched successfully!");
        console.log("In a browser, this GIF would be appended to the page.");
        
        return data;
    } catch (error) {
        console.error("❌ Exercise 1 - Error:", error.message);
    }
}

// Exercise 2: Analyze #2 - Sequential Start
console.log("\n📝 Exercise 2: Analyze #2 - Sequential Start");
console.log("Analyzing sequential async function...");

function resolveAfter2Seconds() {
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("slow");
            console.log("slow promise is done");
        }, 2000);
    });
}

function resolveAfter1Second() {
    console.log("starting fast promise");
    return new Promise(resolve => {
        setTimeout(function () {
            resolve("fast");
            console.log("fast promise is done");
        }, 1000);
    });
}

async function sequentialStart() {
    console.log('==SEQUENTIAL START==');
    const slow = await resolveAfter2Seconds();
    console.log(slow);
    const fast = await resolveAfter1Second();
    console.log(fast);
}

function exercise2() {
    console.log("=== Analysis of Sequential Start ===");
    console.log("The code will execute in this order:");
    console.log("1. '==SEQUENTIAL START==' (immediately)");
    console.log("2. 'starting slow promise' (immediately)");
    console.log("3. After 2 seconds: 'slow promise is done'");
    console.log("4. 'slow' (logged immediately after step 3)");
    console.log("5. 'starting fast promise' (immediately after step 4)");
    console.log("6. After 1 second: 'fast promise is done'");
    console.log("7. 'fast' (logged immediately after step 6)");
    console.log("\nTotal time: ~3 seconds (2s + 1s)");
    console.log("\n=== Running the actual function ===");
    
    return sequentialStart();
}

// Exercise 3: Analyze #3 - Concurrent Start
console.log("\n📝 Exercise 3: Analyze #3 - Concurrent Start");
console.log("Analyzing concurrent async function...");

async function concurrentStart() {
    console.log('==CONCURRENT START with await==');
    const slow = resolveAfter2Seconds();
    const fast = resolveAfter1Second();
    console.log(await slow);
    console.log(await fast);
}

function exercise3() {
    console.log("=== Analysis of Concurrent Start ===");
    console.log("The code will execute in this order:");
    console.log("1. '==CONCURRENT START with await==' (immediately)");
    console.log("2. 'starting slow promise' (immediately)");
    console.log("3. 'starting fast promise' (immediately)");
    console.log("4. After 1 second: 'fast promise is done'");
    console.log("5. After 2 seconds: 'slow promise is done'");
    console.log("6. 'slow' (logged immediately after step 5)");
    console.log("7. 'fast' (logged immediately after step 6)");
    console.log("\nTotal time: ~2 seconds (both promises start simultaneously)");
    console.log("\n=== Running the actual function ===");
    
    return concurrentStart();
}

// Exercise 4: Modify fetch with Async/Await
console.log("\n📝 Exercise 4: Modify fetch with Async/Await");
console.log("Converting Promise.all with .then() to async/await...");

const urls = [
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/albums"
];

// Original function (commented out)
// const getData = async function() {
//   const [ users, posts, albums ] = await Promise.all(urls.map(url =>
//       fetch(url).then(resp => resp.json())
//   ));
//   console.log('users', users);
//   console.log('posta', posts);
//   console.log('albums', albums);
// }

// Modified function with async/await and try-catch
async function exercise4() {
    console.log("=== Modified Function with Async/Await ===");
    
    try {
        const [ users, posts, albums ] = await Promise.all(urls.map(async url => {
            const response = await fetch(url);
            return await response.json();
        }));
        
        console.log('users', users);
        console.log('posts', posts); // Fixed typo from 'posta' to 'posts'
        console.log('albums', albums);
        
        console.log("✅ Exercise 4 - Success!");
        return { users, posts, albums };
    } catch (error) {
        console.log('ooooooops');
        console.error("❌ Exercise 4 - Error:", error.message);
    }
}

// Test function with modified URL to trigger catch block
async function exercise4WithError() {
    console.log("\n=== Testing Error Handling ===");
    
    const urlsWithError = [
        "https://jsonplaceholder.typicode.com/users",
        "https://invalid-url-for-testing.com/posts", // This will cause an error
        "https://jsonplaceholder.typicode.com/albums"
    ];
    
    try {
        const [ users, posts, albums ] = await Promise.all(urlsWithError.map(async url => {
            const response = await fetch(url);
            return await response.json();
        }));
        
        console.log('users', users);
        console.log('posts', posts);
        console.log('albums', albums);
        
        return { users, posts, albums };
    } catch (error) {
        console.log('ooooooops');
        console.error("❌ Error caught:", error.message);
    }
}

// Run all exercises
async function runAllExercises() {
    console.log("\n🚀 Running all Exercises XP Gold...\n");
    
    try {
        await exercise1();
        await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay between exercises
        
        await exercise2();
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await exercise3();
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await exercise4();
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await exercise4WithError();
        
        console.log("\n🎉 All Exercises XP Gold completed!");
    } catch (error) {
        console.error("❌ Error running exercises:", error);
    }
}

// Individual exercise runners
function runExercise1() {
    return exercise1();
}

function runExercise2() {
    return exercise2();
}

function runExercise3() {
    return exercise3();
}

function runExercise4() {
    return exercise4();
}

function runExercise4WithError() {
    return exercise4WithError();
}

// Auto-run all exercises when the script loads
runAllExercises();
