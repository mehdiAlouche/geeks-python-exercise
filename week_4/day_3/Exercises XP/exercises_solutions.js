// ========================================
// Exercise 1: Location Destructuring
// ========================================

const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
}

const {name, location: {country, city, coordinates: [lat, lng]}} = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);

// Analysis:
// The destructuring extracts:
// - name: 'John Doe'
// - country: 'Canada' (from location.country)
// - city: 'Vancouver' (from location.city)  
// - lat: 49.2827 (from coordinates[0])
// - lng: -123.1207 (from coordinates[1])
// Output: "I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)"

// ========================================
// Exercise 2: Display Student Info
// ========================================
console.log("\n=== Exercise 2: Display Student Info ===");

function displayStudentInfo(objUser){
    // Destructuring the parameter
    const {first, last} = objUser;
    return `Your full name is ${first} ${last}`;
}

console.log(displayStudentInfo({first: 'Elie', last:'Schoppik'}));

// ========================================
// Exercise 3: User & ID
// ========================================
console.log("\n=== Exercise 3: User & ID ===");

const users = { user1: 18273, user2: 92833, user3: 90315 };

// Part 1: Turn users object into an array
const usersArray = Object.entries(users);
console.log("Part 1 - Object to Array:", usersArray);

// Part 2: Multiply user IDs by 2
const usersArrayDoubled = usersArray.map(([user, id]) => [user, id * 2]);
console.log("Part 2 - IDs multiplied by 2:", usersArrayDoubled);

// ========================================
// Exercise 4: Person class
// ========================================
console.log("\n=== Exercise 4: Person class ===");

class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member);

// Analysis:
// When you create an instance of a class using 'new', it returns an object.
// Therefore, typeof member will be "object"

// ========================================
// Exercise 5: Dog class
// ========================================
console.log("\n=== Exercise 5: Dog class ===");

class Dog {
  constructor(name) {
    this.name = name;
  }
}

// Let's analyze each option:

// Option 1: WRONG - Missing super() call
// class Labrador extends Dog {
//   constructor(name, size) {
//     this.size = size; // Error: Must call super() before accessing 'this'
//   }
// };

// Option 2: CORRECT - Properly calls super() and passes name
class Labrador extends Dog {
  constructor(name, size) {
    super(name);  // Calls parent constructor with name
    this.size = size;
  }
}

// Option 3: WRONG - super() called with undefined name parameter
// class Labrador extends Dog {
//   constructor(size) {
//     super(name); // 'name' is undefined in this scope
//     this.size = size;
//   }
// };

// Option 4: WRONG - Missing super() call, tries to set this.name directly
// class Labrador extends Dog {
//   constructor(name, size) {
//     this.name = name; // Error: Must call super() before accessing 'this'
//     this.size = size;
//   }
// };

console.log("Option 2 is correct - it properly calls super(name) before setting this.size");

// ========================================
// Exercise 6: Challenges
// ========================================
console.log("\n=== Exercise 6: Challenges ===");

// Part 1: Evaluate these expressions
console.log("Part 1 - Array/Object Comparison:");
console.log("[2] === [2]:", false); // false - different object references
console.log("{} === {}:", false);     // false - different object references

// Part 2: Object property values
console.log("\nPart 2 - Object Properties:");
const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5};

object1.number = 4;

console.log("object2.number:", object2.number); // 4 - object2 references same object as object1
console.log("object3.number:", object3.number); // 4 - object3 references same object as object2 (which is object1)
console.log("object4.number:", object4.number); // 5 - object4 is a separate object

// Part 3: Animal and Mammal classes
console.log("\nPart 3 - Animal and Mammal Classes:");

class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

class Mammal extends Animal {
  constructor(name, type, color) {
    super(name, type, color);
  }
  
  sound(sound) {
    return `${sound} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
  }
}

const farmerCow = new Mammal('Lily', 'cow', 'brown and white');
console.log(farmerCow.sound('Moooo'));
