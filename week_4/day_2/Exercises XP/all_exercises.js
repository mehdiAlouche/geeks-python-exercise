// =============================================================================
// 🌟 Exercise 1 : Colors
// =============================================================================
console.log("🌟 EXERCISE 1: COLORS");
console.log("=".repeat(50));

const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

// 1. Display colors with ordinal numbers
console.log("Part 1: Display colors with ordinal numbers");
colors.forEach((color, index) => {
    console.log(`${index + 1}# choice is ${color}.`);
});

// 2. Check if at least one element equals "Violet"
console.log("\nPart 2: Check for Violet");
const hasViolet = colors.includes("Violet");
console.log(hasViolet ? "Yeah" : "No...");

// Alternative approach using some() method
const hasVioletSome = colors.some(color => color === "Violet");
console.log(`Using some() method: ${hasVioletSome ? "Yeah" : "No..."}`);

// =============================================================================
// 🌟 Exercise 2 : Colors #2
// =============================================================================
console.log("\n\n🌟 EXERCISE 2: COLORS #2");
console.log("=".repeat(50));

const ordinal = ["th", "st", "nd", "rd"];

console.log("Colors with proper ordinal suffixes:");
colors.forEach((color, index) => {
    const position = index + 1;
    const suffix = (position % 100 >= 11 && position % 100 <= 13) ? "th" :
                   (position % 10 === 1) ? "st" :
                   (position % 10 === 2) ? "nd" :
                   (position % 10 === 3) ? "rd" : "th";
    
    console.log(`${position}${suffix} choice is ${color}.`);
});

// =============================================================================
// Exercise 3 : Analyzing
// =============================================================================
console.log("\n\nEXERCISE 3: ANALYZING");
console.log("=".repeat(50));

console.log("------1------");
console.log("Code: const result = ['bread', ...vegetables, 'chicken', ...fruits];");
console.log("Analysis: The spread operator expands the arrays into individual elements.");
console.log("Expected output: ['bread', 'carrot', 'potato', 'chicken', 'apple', 'orange']");

const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];
const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log("Actual output:", result);

console.log("\n------2------");
console.log("Code: console.log([...country]);");
console.log("Analysis: The spread operator on a string converts it to an array of characters.");
console.log("Expected output: ['U', 'S', 'A']");

const country = "USA";
console.log("Actual output:", [...country]);

console.log("\n------Bonus------");
console.log("Code: let newArray = [...[,,]];");
console.log("Analysis: [,,] creates an array with 2 empty slots. When spread, creates 2 undefined values.");
console.log("Expected output: [undefined, undefined]");

let newArray = [...[,,]];
console.log("Actual output:", newArray);
console.log("Array length:", newArray.length);

// =============================================================================
// 🌟 Exercise 4 : Employees
// =============================================================================
console.log("\n\n🌟 EXERCISE 4: EMPLOYEES");
console.log("=".repeat(50));

const users = [
    { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
    { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
    { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
    { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
    { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
    { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
    { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

// 1. Using map() to create welcome messages
console.log("Part 1: Welcome messages using map()");
const welcomeStudents = users.map(user => `Hello ${user.firstName}`);
console.log(welcomeStudents);

// 2. Using filter() to get Full Stack Residents
console.log("\nPart 2: Full Stack Residents using filter()");
const fullStackResidents = users.filter(user => user.role === 'Full Stack Resident');
console.log("Full Stack Residents:");
fullStackResidents.forEach(user => {
    console.log(`- ${user.firstName} ${user.lastName}`);
});

// 3. Bonus: Chain filter() and map() to get lastNames
console.log("\nPart 3: Bonus - LastNames of Full Stack Residents");
const fullStackLastNames = users
    .filter(user => user.role === 'Full Stack Resident')
    .map(user => user.lastName);
console.log("LastNames:", fullStackLastNames);

// =============================================================================
// 🌟 Exercise 5 : Star Wars
// =============================================================================
console.log("\n\n🌟 EXERCISE 5: STAR WARS");
console.log("=".repeat(50));

const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

console.log("Original array:", epic);
console.log("Using reduce() to combine into a single string:");

const epicString = epic.reduce((accumulator, currentValue, index) => {
    // Add space between words, except for the first word
    return index === 0 ? currentValue : `${accumulator} ${currentValue}`;
}, '');

console.log(`"${epicString}"`);

// Alternative approach with more control over spacing
const epicString2 = epic.reduce((acc, curr) => acc + ' ' + curr);
console.log("Alternative result:", `"${epicString2}"`);

// =============================================================================
// 🌟 Exercise 6 : Employees #2
// =============================================================================
console.log("\n\n🌟 EXERCISE 6: EMPLOYEES #2");
console.log("=".repeat(50));

const students = [
    {name: "Ray", course: "Computer Science", isPassed: true}, 
    {name: "Liam", course: "Computer Science", isPassed: false}, 
    {name: "Jenner", course: "Information Technology", isPassed: true}, 
    {name: "Marco", course: "Robotics", isPassed: true}, 
    {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
    {name: "Jamie", course: "Big Data", isPassed: false}
];

// Using filter() to get students who passed
console.log("Part 1: Students who passed the course");
const passedStudents = students.filter(student => student.isPassed);
console.log("Passed students:");
passedStudents.forEach(student => {
    console.log(`- ${student.name} (${student.course})`);
});

// Bonus: Chain filter() and forEach() to congratulate students
console.log("\nBonus: Congratulating students who passed");
students
    .filter(student => student.isPassed)
    .forEach(student => {
        console.log(`Good job ${student.name}, you passed the course in ${student.course}!`);
    });