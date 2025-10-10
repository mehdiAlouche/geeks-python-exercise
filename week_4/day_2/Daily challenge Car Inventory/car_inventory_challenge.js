// Daily Challenge: Car Inventory - Advanced Array Methods

const inventory = [
  { id: 1, car_make: "Lincoln", car_model: "Navigator", car_year: 2009 },
  { id: 2, car_make: "Mazda", car_model: "Miata MX-5", car_year: 2001 },
  { id: 3, car_make: "Honda", car_model: "Accord", car_year: 1983 },
  { id: 4, car_make: "Land Rover", car_model: "Defender Ice Edition", car_year: 2010 },
  { id: 5, car_make: "Honda", car_model: "Accord", car_year: 1995 },
];

console.log("Original inventory:");
console.log(inventory);

// Part I: Create a function getCarHonda(carInventory)

function getCarHonda(carInventory) {
  const hondaCar = carInventory.find(car => car.car_make === "Honda");
  if (hondaCar) {
    return `This is a ${hondaCar.car_make} ${hondaCar.car_model} from ${hondaCar.car_year}.`;
  } else {
    return "No Honda found in inventory.";
  }
}

// Test the function
const hondaResult = getCarHonda(inventory);
console.log("Result:", hondaResult);
console.log("Expected: This is a Honda Accord from 1983.");

// Part II: Create a function sortCarInventoryByYear(carInventory)
console.log("Part II: sortCarInventoryByYear function");

function sortCarInventoryByYear(carInventory) {
  // Create a copy of the array to avoid mutating the original
  const sortedInventory = [...carInventory];
  
  // Sort by car_year in ascending order
  return sortedInventory.sort((car1, car2) => car1.car_year - car2.car_year);
}

// Test the function
const sortedInventory = sortCarInventoryByYear(inventory);
console.log("Sorted inventory by year (ascending):");
console.log(sortedInventory);

console.log("\nExpected output:");
const expectedOutput = [
  { id: 3, car_make: "Honda", car_model: "Accord", car_year: 1983 },
  { id: 5, car_make: "Honda", car_model: "Accord", car_year: 1995 },
  { id: 2, car_make: "Mazda", car_model: "Miata MX-5", car_year: 2001 },
  { id: 1, car_make: "Lincoln", car_model: "Navigator", car_year: 2009 },
  { id: 4, car_make: "Land Rover", car_model: "Defender Ice Edition", car_year: 2010 },
];
console.log(expectedOutput);

// Verify the result matches expected output
const isCorrect = JSON.stringify(sortedInventory) === JSON.stringify(expectedOutput);
console.log("\n✓ Result matches expected output:", isCorrect);

// Additional demonstration
console.log("Additional demonstrations:");
// Show that original inventory is not mutated
console.log("Original inventory (unchanged):");
console.log(inventory);

// Show individual car years for verification
console.log("\nCar years in sorted order:");
sortedInventory.forEach((car, index) => {
  console.log(`${index + 1}. ${car.car_make} ${car.car_model}: ${car.car_year}`);
});
