// ========================================
// Exercise 1: Bird Class Analysis
// ========================================
console.log("=== Exercise 1: Bird Class Analysis ===");

class Bird {
  constructor() {
    console.log("I'm a bird. 🦢");
  }
}

class Flamingo extends Bird {
  constructor() {
    console.log("I'm pink. 🌸");
    super();
  }
}

const pet = new Flamingo();

// Analysis:
// When creating a new Flamingo instance:
// 1. Flamingo constructor runs first
// 2. "I'm pink. 🌸" is logged
// 3. super() calls the parent Bird constructor
// 4. "I'm a bird. 🦢" is logged
// 
// Expected output:
// I'm pink. 🌸
// I'm a bird. 🦢

console.log("\nExplanation:");
console.log("The Flamingo constructor runs first, logging 'I'm pink. 🌸',");
console.log("then calls super() which executes the Bird constructor,");
console.log("logging 'I'm a bird. 🦢'.");
