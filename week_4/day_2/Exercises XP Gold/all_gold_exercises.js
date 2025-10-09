// =============================================================================
// Exercise 1 : Analyzing the map method
// =============================================================================
console.log("EXERCISE 1: ANALYZING THE MAP METHOD");
console.log("=".repeat(50));

console.log("Code to analyze:");
console.log("[1, 2, 3].map(num => {");
console.log("  if (typeof num === 'number') return num * 2;");
console.log("  return ;");
console.log("});");

console.log("\nAnalysis:");
console.log("- For each number (1, 2, 3), typeof num === 'number' is true");
console.log("- So each number gets multiplied by 2: 1*2=2, 2*2=4, 3*2=6");
console.log("- The return statement without value returns undefined");
console.log("- Expected output: [2, 4, 6]");

console.log("\nActual output:");
const result1 = [1, 2, 3].map(num => {
  if (typeof num === 'number') return num * 2;
  return ;
});
console.log(result1);

// =============================================================================
// Exercise 2: Analyzing the reduce method
// =============================================================================
console.log("\n\nEXERCISE 2: ANALYZING THE REDUCE METHOD");
console.log("=".repeat(50));

console.log("Code to analyze:");
console.log("[[0, 1], [2, 3]].reduce(");
console.log("  (acc, cur) => {");
console.log("    return acc.concat(cur);");
console.log("  },");
console.log("  [1, 2],");
console.log(");");

console.log("\nAnalysis:");
console.log("- Initial accumulator: [1, 2]");
console.log("- First iteration: acc=[1,2], cur=[0,1] -> acc.concat([0,1]) -> [1,2,0,1]");
console.log("- Second iteration: acc=[1,2,0,1], cur=[2,3] -> acc.concat([2,3]) -> [1,2,0,1,2,3]");
console.log("- Expected output: [1, 2, 0, 1, 2, 3]");

console.log("\nActual output:");
const result2 = [[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);
console.log(result2);

// =============================================================================
// Exercise 3 : Analyze this code
// =============================================================================
console.log("\n\nEXERCISE 3: ANALYZE THIS CODE");
console.log("=".repeat(50));

console.log("Code to analyze:");
console.log("const arrayNum = [1, 2, 4, 5, 8, 9];");
console.log("const newArray = arrayNum.map((num, i) => {");
console.log("    console.log(num, i);");
console.log("    alert(num);");
console.log("    return num * 2;");
console.log("})");
console.log("What is the value of i ?");

console.log("\nAnalysis:");
console.log("- The map method provides two parameters: (element, index)");
console.log("- 'i' is the index parameter, representing the position of each element");
console.log("- For array [1, 2, 4, 5, 8, 9], the indices will be: 0, 1, 2, 3, 4, 5");
console.log("- Expected console.log output:");
console.log("  1 0");
console.log("  2 1");
console.log("  4 2");
console.log("  5 3");
console.log("  8 4");
console.log("  9 5");

console.log("\nSimulating the output (without alert):");
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
    console.log(`num: ${num}, i: ${i}`);
    // alert(num); // Commented out to avoid browser alert
    return num * 2;
});

console.log("\nFinal newArray:", newArray);
console.log("Answer: The value of 'i' represents the index of each element: 0, 1, 2, 3, 4, 5");

// =============================================================================
// Exercise 4 : Nested arrays
// =============================================================================
console.log("\n\nEXERCISE 4: NESTED ARRAYS");
console.log("=".repeat(50));

// Part 1: Flatten nested arrays
console.log("Part 1: Flatten nested arrays");
console.log("Original: [[1],[2],[3],[[[4]]],[[[5]]]]");
console.log("Target: [1,2,3,[4],[5]]");

const array = [[1],[2],[3],[[[4]]],[[[5]]]];

// Method 1: Using flat() method (one line)
console.log("\nMethod 1: Using flat(2) - one line solution");
const flattened1 = array.flat(2);
console.log("Result:", flattened1);

// Method 2: Manual approach
console.log("\nMethod 2: Manual flattening");
const flattened2 = array.map((item, index) => {
  if (index < 3) {
    return item[0]; // [1] -> 1, [2] -> 2, [3] -> 3
  } else {
    return item.flat(2); // [[[4]]] -> [4], [[[5]]] -> [5]
  }
});
console.log("Result:", flattened2);

// Part 2: Flatten and join greeting array
console.log("\nPart 2: Greeting array manipulation");
const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];

console.log("Original:", greeting);
console.log("Target: [\"Hello young grasshopper!\",\"you are\",\"learning fast!\"]");

// Using map and join
const greetingJoined = greeting.map(subArray => subArray.join(" "));
console.log("Result:", greetingJoined);

// Part 3: Turn greeting into single string
console.log("\nPart 3: Turn greeting into single string");
console.log("Target: 'Hello young grasshopper! you are learning fast!'");

const greetingString = greetingJoined.join(" ");
console.log("Result:", `'${greetingString}'`);

// Alternative one-line approach
const greetingStringOneLine = greeting.map(subArray => subArray.join(" ")).join(" ");
console.log("One-line result:", `'${greetingStringOneLine}'`);

// Part 4: Extract trapped number
console.log("\nPart 4: Extract trapped number");
const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];

console.log("Original (deeply nested):", JSON.stringify(trapped));
console.log("Target: [3]");

// Method 1: Using flat with high number (one line)
const extracted1 = trapped.flat(25);
console.log("Method 1 (flat):", extracted1);

// Method 2: Using flat(Infinity) (one line)
const extracted2 = trapped.flat(Infinity);
console.log("Method 2 (flat Infinity):", extracted2);

// Method 3: Recursive approach
function flattenArray(arr) {
  return arr.reduce((acc, val) => {
    return Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val);
  }, []);
}

const extracted3 = flattenArray(trapped);
console.log("Method 3 (recursive):", extracted3);

// =============================================================================
// BONUS: Additional examples and explanations
// =============================================================================
console.log("\n\nBONUS: ADDITIONAL EXAMPLES");
console.log("=".repeat(50));

console.log("Understanding flat() method:");
console.log("flat(0) - no flattening:", [1, [2, [3]]].flat(0));
console.log("flat(1) - one level:", [1, [2, [3]]].flat(1));
console.log("flat(2) - two levels:", [1, [2, [3]]].flat(2));
console.log("flat(Infinity) - all levels:", [1, [2, [3]]].flat(Infinity));

console.log("\nUnderstanding map() with index:");
const numbers = [10, 20, 30];
numbers.map((num, index) => {
  console.log(`Element ${num} is at index ${index}`);
});

console.log("\nUnderstanding reduce() step by step:");
const stepByStep = [1, 2, 3].reduce((acc, curr, index) => {
  console.log(`Step ${index + 1}: acc=${acc}, curr=${curr}, result=${acc + curr}`);
  return acc + curr;
}, 0);
console.log("Final result:", stepByStep);