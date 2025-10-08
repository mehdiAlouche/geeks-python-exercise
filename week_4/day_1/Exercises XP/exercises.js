// ===========================================
// 🌟 Exercise 1 : Scope
// ===========================================

// #1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}

// #1.1 - run in the console:
// funcOne()
// PREDICTION: Will alert "inside the funcOne function 3"
// EXPLANATION: a is initialized to 5, then the if condition (5 > 1) is true, so a is reassigned to 3

// #1.2 What will happen if the variable is declared with const instead of let ?
// PREDICTION: Will throw an error "Assignment to constant variable"
// EXPLANATION: const variables cannot be reassigned after declaration

//#2
let a2 = 0;
function funcTwo() {
    a2 = 5;
}

function funcThree() {
    alert(`inside the funcThree function ${a2}`);
}

// #2.1 - run in the console:
// funcThree() // Will alert "inside the funcThree function 0"
// funcTwo()   // Will change global a2 to 5
// funcThree() // Will alert "inside the funcThree function 5"
// EXPLANATION: First call uses global a2 (0), funcTwo modifies global a2 to 5, second call shows updated value

// #2.2 What will happen if the variable is declared with const instead of let ?
// PREDICTION: Will throw an error "Assignment to constant variable" in funcTwo
// EXPLANATION: const variables cannot be reassigned

//#3
function funcFour() {
    window.a3 = "hello";
}

function funcFive() {
    alert(`inside the funcFive function ${a3}`);
}

// #3.1 - run in the console:
// funcFour() // Sets window.a3 to "hello"
// funcFive() // Will alert "inside the funcFive function hello"
// EXPLANATION: funcFour creates a global variable a3 on the window object, funcFive accesses it

//#4
let a4 = 1;
function funcSix() {
    let a4 = "test";
    alert(`inside the funcSix function ${a4}`);
}

// #4.1 - run in the console:
// funcSix() // Will alert "inside the funcSix function test"
// EXPLANATION: Local variable a4 shadows the global variable a4

// #4.2 What will happen if the variable is declared with const instead of let ?
// PREDICTION: Same result - will alert "inside the funcSix function test"
// EXPLANATION: const behaves the same as let for local scope shadowing

//#5
let a5 = 2;
if (true) {
    let a5 = 5;
    alert(`in the if block ${a5}`); // Will alert "in the if block 5"
}
alert(`outside of the if block ${a5}`); // Will alert "outside of the if block 2"

// #5.1 - run the code in the console
// EXPLANATION: Block-scoped variable a inside if block shadows the outer a

// #5.2 What will happen if the variable is declared with const instead of let ?
// PREDICTION: Same result - block scoping works the same for const and let

// ===========================================
// 🌟 Exercise 2 : Ternary operator
// ===========================================

// Transform winBattle() function to an arrow function
const winBattle = () => true;

// Create a variable called experiencePoints
// Assign to this variable, a ternary operator
const experiencePoints = winBattle() ? 10 : 1;

// Console.log the experiencePoints variable
console.log(experiencePoints); // Will output: 10

// ===========================================
// 🌟 Exercise 3 : Is it a string ?
// ===========================================

// Write a JavaScript arrow function that checks whether the value is a string
const isString = (value) => typeof value === 'string';

// Test the function
console.log(isString('hello')); // true
console.log(isString([1, 2, 4, 0])); // false

// ===========================================
// 🌟 Exercise 4 : Find the sum
// ===========================================

// Create a one line arrow function that receives two numbers and returns the sum
const sum = (a, b) => a + b;

// Test the function
console.log(sum(5, 3)); // 8
console.log(sum(10, -2)); // 8

// ===========================================
// 🌟 Exercise 5 : Kg and grams
// ===========================================

// First, use function declaration
function kgToGramsDeclaration(kg) {
    return kg * 1000;
}
console.log(kgToGramsDeclaration(2)); // 2000

// Then, use function expression
const kgToGramsExpression = function(kg) {
    return kg * 1000;
};
console.log(kgToGramsExpression(1.5)); // 1500

// Difference between function declaration and function expression:
// Function declarations are hoisted (can be called before they're defined), 
// while function expressions are not hoisted and must be defined before use.

// Finally, use a one line arrow function
const kgToGramsArrow = (kg) => kg * 1000;
console.log(kgToGramsArrow(3)); // 3000

// ===========================================
// 🌟 Exercise 6 : Fortune teller
// ===========================================

// Create a self invoking function that takes 4 arguments
(function(numChildren, partnerName, location, jobTitle) {
    const fortune = `You will be a ${jobTitle} in ${location}, and married to ${partnerName} with ${numChildren} kids.`;
    
    // Display in the DOM
    const div = document.createElement('div');
    div.textContent = fortune;
    div.style.cssText = 'padding: 20px; background-color: #f0f0f0; margin: 10px; border-radius: 5px;';
    document.body.appendChild(div);
    
    console.log(fortune);
})(2, 'Sarah', 'Paris', 'Software Engineer');

// ===========================================
// 🌟 Exercise 7 : Welcome
// ===========================================

// Create a self invoking function that takes 1 argument: the name of the user
(function(userName) {
    // Create navbar if it doesn't exist
    let navbar = document.getElementById('navbar');
    if (!navbar) {
        navbar = document.createElement('nav');
        navbar.id = 'navbar';
        navbar.style.cssText = 'background-color: #333; padding: 10px; color: white; display: flex; justify-content: space-between; align-items: center;';
        document.body.insertBefore(navbar, document.body.firstChild);
    }
    
    // Create welcome div
    const welcomeDiv = document.createElement('div');
    welcomeDiv.style.cssText = 'display: flex; align-items: center; gap: 10px;';
    
    // Add profile picture (placeholder)
    const profilePic = document.createElement('img');
    profilePic.src = 'https://via.placeholder.com/40x40/4CAF50/white?text=' + userName.charAt(0).toUpperCase();
    profilePic.style.cssText = 'width: 40px; height: 40px; border-radius: 50%;';
    
    // Add welcome text
    const welcomeText = document.createElement('span');
    welcomeText.textContent = `Welcome, ${userName}!`;
    
    welcomeDiv.appendChild(profilePic);
    welcomeDiv.appendChild(welcomeText);
    navbar.appendChild(welcomeDiv);
    
    console.log(`Welcome, ${userName}!`);
})('John');

// ===========================================
// 🌟 Exercise 8 : Juice Bar
// ===========================================

// Part I: Basic nested functions
function makeJuice(size) {
    function addIngredients(ingredient1, ingredient2, ingredient3) {
        const message = `The client wants a ${size} juice, containing ${ingredient1}, ${ingredient2}, ${ingredient3}`;
        
        // Display on DOM
        const div = document.createElement('div');
        div.textContent = message;
        div.style.cssText = 'padding: 15px; background-color: #e8f5e8; margin: 10px; border-radius: 5px; border-left: 4px solid #4CAF50;';
        document.body.appendChild(div);
        
        console.log(message);
    }
    
    // Invoke the inner function ONCE
    addIngredients('apple', 'orange', 'banana');
}

// Invoke the outer function in the global scope
makeJuice('medium');

// Part II: Enhanced version with array and multiple ingredients
function makeJuiceAdvanced(size) {
    const ingredients = [];
    
    function addIngredients(ingredient1, ingredient2, ingredient3) {
        ingredients.push(ingredient1, ingredient2, ingredient3);
        console.log(`Added ingredients: ${ingredient1}, ${ingredient2}, ${ingredient3}`);
    }
    
    function displayJuice() {
        const message = `The client wants a ${size} juice, containing ${ingredients.join(', ')}`;
        
        // Display on DOM
        const div = document.createElement('div');
        div.textContent = message;
        div.style.cssText = 'padding: 15px; background-color: #fff3cd; margin: 10px; border-radius: 5px; border-left: 4px solid #ffc107;';
        document.body.appendChild(div);
        
        console.log(message);
    }
    
    // Invoke addIngredients TWICE (6 ingredients total)
    addIngredients('apple', 'orange', 'banana');
    addIngredients('strawberry', 'mango', 'pineapple');
    
    // Invoke displayJuice ONCE
    displayJuice();
}

// Invoke the makeJuice function in the global scope
makeJuiceAdvanced('large');

// ===========================================
// Additional HTML structure for better display
// ===========================================

// Create a container for better organization
const container = document.createElement('div');
container.style.cssText = 'max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;';
document.body.appendChild(container);

// Move all existing content to the container
const existingContent = Array.from(document.body.children).filter(child => child !== container);
existingContent.forEach(child => {
    if (child !== container) {
        container.appendChild(child);
    }
});

// Add some styling to the body
document.body.style.cssText = 'margin: 0; padding: 20px; background-color: #f5f5f5;';

console.log('All exercises completed! Check the browser for visual results.');
