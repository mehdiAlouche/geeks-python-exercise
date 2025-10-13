// 🌟 Exercises XP: Fetch API & Async/Await
// Open this file in a browser or Node.js environment to run the exercises

console.log("🌟 Exercises XP: Fetch API & Async/Await");
console.log("===========================================");

// Exercise 1: Giphy API - Basic Fetch
console.log("\n📝 Exercise 1: Giphy API - Basic Fetch");
console.log("Retrieving data from Giphy API for 'hilarious' gifs...");

async function exercise1() {
    const giphyUrl = "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

    try {
        const response = await fetch(giphyUrl);
        
        // Check the status of the response
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ Exercise 1 - Success!");
        console.log(`Found ${data.data.length} hilarious gifs`);
        console.log("Giphy API Response:", data);
        
        return data;
    } catch (error) {
        console.error("❌ Exercise 1 - Error:", error.message);
    }
}

// Exercise 2: Giphy API - Sun Gifs with offset
console.log("\n📝 Exercise 2: Giphy API - Sun Gifs");
console.log("Retrieving 10 gifs about 'sun' starting from position 2...");

async function exercise2() {
    const sunGifsUrl = "https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

    try {
        const response = await fetch(sunGifsUrl);
        
        // Check the status of the response
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ Exercise 2 - Success!");
        console.log(`Found ${data.data.length} sun gifs (starting from position 2)`);
        console.log("Sun Gifs Data:", data);
        
        return data;
    } catch (error) {
        console.error("❌ Exercise 2 - Error:", error.message);
    }
}

// Exercise 3: Async/Await Star Wars API
console.log("\n📝 Exercise 3: Async/Await Star Wars API");
console.log("Converting fetch request to async/await (no .then() methods)...");

async function exercise3() {
    try {
        const response = await fetch("https://www.swapi.tech/api/starships/9/");
        
        // Check the status of the response
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ Exercise 3 - Success!");
        console.log("Starship Name:", data.result.properties.name);
        console.log("Model:", data.result.properties.model);
        console.log("Star Wars Data:", data.result);
        
        return data.result;
    } catch (error) {
        console.error("❌ Exercise 3 - Error:", error.message);
    }
}

// Exercise 4: Analyze Async Function
console.log("\n📝 Exercise 4: Analyze Async Function");
console.log("Analyzing the provided async function code...");

// Original function from the exercise
function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function exercise4() {
    console.log("=== Original Code Analysis ===");
    console.log("function resolveAfter2Seconds() {");
    console.log("    return new Promise(resolve => {");
    console.log("        setTimeout(() => {");
    console.log("            resolve('resolved');");
    console.log("        }, 2000);");
    console.log("    });");
    console.log("}");
    console.log("");
    console.log("async function asyncCall() {");
    console.log("    console.log('calling');");
    console.log("    let result = await resolveAfter2Seconds();");
    console.log("    console.log(result);");
    console.log("}");
    console.log("");
    console.log("asyncCall();");
    
    console.log("\n=== Analysis ===");
    console.log("The code will output:");
    console.log("1. First: 'calling' (immediately when asyncCall() is invoked)");
    console.log("2. Then: 'resolved' (after 2 seconds when the promise resolves)");
    
    console.log("\n=== Step-by-step execution ===");
    console.log("1. asyncCall() is invoked");
    console.log("2. 'calling' is logged to console immediately");
    console.log("3. await resolveAfter2Seconds() pauses execution for 2 seconds");
    console.log("4. After 2 seconds, the promise resolves with 'resolved'");
    console.log("5. 'resolved' is logged to console");
    
    console.log("\n=== Running the actual function ===");
    console.log("calling");
    
    try {
        let result = await resolveAfter2Seconds();
        console.log(result);
        console.log("✅ Exercise 4 - Complete!");
        
        return result;
    } catch (error) {
        console.error("❌ Exercise 4 - Error:", error.message);
    }
}

// Run all exercises
async function runAllExercises() {
    console.log("\n🚀 Running all exercises...\n");
    
    try {
        await exercise1();
        await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay between exercises
        
        await exercise2();
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await exercise3();
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        await exercise4();
        
        console.log("\n🎉 All exercises completed!");
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

// Auto-run all exercises when the script loads
runAllExercises();
