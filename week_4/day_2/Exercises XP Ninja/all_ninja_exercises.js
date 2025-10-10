// XP Ninja Exercises - Array methods and Destructuring

console.log("=== XP Ninja Exercises ===\n");

// Exercise 1 : Dog age to Human years

const data = [
  {
    name: 'Butters',
    age: 3,
    type: 'dog'
  },
   {
    name: 'Cuty',
    age: 5,
    type: 'rabbit'
  },
  {
    name: 'Lizzy',
    age: 6,
    type: 'dog'
  },
  {
    name: 'Red',
    age: 1,
    type: 'cat'
  },
  {
    name: 'Joey',
    age: 3,
    type: 'dog'
  },
  {
    name: 'Rex',
    age: 10,
    type: 'dog'
  },
];

// Using a loop to find the sum of the dogs' ages in human years
let sumLoop = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i].type === 'dog') {
    sumLoop += data[i].age * 7; // 1 dog year = 7 human years
  }
}
console.log("Sum using loop:", sumLoop, "human years");

// Using the reduce() method to find the sum of the dogs' ages in human years
const sumReduce = data.reduce((total, pet) => {
  if (pet.type === 'dog') {
    return total + (pet.age * 7);
  }
  return total;
}, 0);

console.log("Sum using reduce():", sumReduce, "human years");


// Exercise 2 : Email
console.log("Exercise 2: Email");

const userEmail3 = ' cannotfillemailformcorrectly@gmail.com ';

// Clean up email in a single line
const cleanEmail = userEmail3.trim();
console.log("Original email:", `'${userEmail3}'`);
console.log("Cleaned email:", `'${cleanEmail}'`);


// Exercise 3 : Employees #3
console.log("Exercise 3: Employees #3");

const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

// Step one: create an empty object
const usersObject = {};

// Change the structure - full name as key, role as value
for (let user of users) {
  const fullName = `${user.firstName} ${user.lastName}`;
  usersObject[fullName] = user.role;
}

console.log("Users object with full name as key and role as value:");
console.log(usersObject);


// Exercise 4 : Array to Object
console.log("Exercise 4: Array to Object");

const letters = ['x', 'y', 'z', 'z'];

// Using a for loop to get { x: 1, y: 1, z: 2 }
const resultForLoop = {};
for (let i = 0; i < letters.length; i++) {
  const letter = letters[i];
  if (resultForLoop[letter]) {
    resultForLoop[letter]++;
  } else {
    resultForLoop[letter] = 1;
  }
}
console.log("Result using for loop:", resultForLoop);

// Using the reduce() method to get { x: 1, y: 1, z: 2 }
const resultReduce = letters.reduce((acc, letter) => {
  acc[letter] = (acc[letter] || 0) + 1;
  return acc;
}, {});

console.log("Result using reduce():", resultReduce);
