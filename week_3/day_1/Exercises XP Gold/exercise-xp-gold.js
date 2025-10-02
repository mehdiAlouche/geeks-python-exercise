// Exercise 1 : Divisible by three
let numbers = [123, 8409, 100053, 333333333, 7]

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i] % 3 === 0);
}

// Exercise 2 : Attendance
let guestList = {
  randy: "Germany",
  karla: "France",
  wendy: "Japan",
  norman: "England",
  sam: "Argentina"
}

let name = prompt("What is your name?");

if (name.toLowerCase() in guestList) {
    console.log(`Hi! I'm ${name}, and I'm from ${guestList[name.toLowerCase()]}.`);
} else {
    console.log("Hi! I'm a guest.");
}

// Exercise 3 : Playing with numbers
let age = [20,5,12,43,98,55];

let sum = 0;
for (let i = 0; i < age.length; i++) {
    sum += age[i];
}
console.log(sum);

let highest = age[0];
for (let i = 1; i < age.length; i++) {
    if (age[i] > highest) {
        highest = age[i];
    }
}
console.log(highest);
