// Exercise 1 : List of people
const people = ["Ahmed", "Fatima", "Youssef", "Amina"];

people.shift();
people[people.indexOf("Amina")] = "Khalid";
people.push("Yourname");
console.log(people.indexOf("Fatima"));
const copy = people.slice(1, 3);
console.log(people.indexOf("Foo"));
const last = people[people.length - 1];

for (let i = 0; i < people.length; i++) {
    console.log(people[i]);
}

for (let i = 0; i < people.length; i++) {
    console.log(people[i]);
    if (people[i] === "Youssef") break;
}

// Exercise 2 : Favorite colors
const colors = ["blue", "red", "green", "purple", "orange"];

for (let i = 0; i < colors.length; i++) {
    console.log(`My #${i + 1} choice is ${colors[i]}`);
}

const suffixes = ["st", "nd", "rd", "th", "th"];
for (let i = 0; i < colors.length; i++) {
    console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}

// Exercise 3 : Repeat question
let userNumber;
do {
    userNumber = Number(prompt("Please enter a number:"));
    console.log(typeof userNumber);
    if (userNumber < 10) {
        console.log("Number is smaller than 10");
    } else {
        break;
    }
} while (true);

// Exercise 4 : Building Management
const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}

console.log(building.numberOfFloors);
console.log(building.numberOfAptByFloor.firstFloor + building.numberOfAptByFloor.thirdFloor);
console.log(building.nameOfTenants[1]);
console.log(building.numberOfRoomsAndRent.dan[0]);

if (building.numberOfRoomsAndRent.sarah[1] + building.numberOfRoomsAndRent.david[1] > building.numberOfRoomsAndRent.dan[1]) {
    building.numberOfRoomsAndRent.dan[1] = 1300;
}

// Exercise 5 : Family
const family = {
    father: "Mohammed",
    mother: "Khadija", 
    son: "Omar",
    daughter: "Zineb"
};

for (let key in family) {
    console.log(key);
}

for (let key in family) {
    console.log(family[key]);
}

// Exercise 6 : Rudolf
const details = {
  my: 'name',
  is: 'Rudolf',
  the: 'reindeer'
}

let sentence = "";
for (let key in details) {
    sentence += details[key] + " ";
}
console.log(sentence.trim());

// Exercise 7 : Secret Group
const names = ["Ahmad", "Hassan", "Fatima", "Amina", "Brahim", "Karim"];

const secretSocName = names.sort().map(name => name[0]).join('');
console.log(secretSocName);
