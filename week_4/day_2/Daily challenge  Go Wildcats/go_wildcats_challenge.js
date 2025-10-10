// Daily Challenge: Go Wildcats - Advanced Array Methods

const gameInfo = [
  {
    username: "john",
    team: "red",
    score: 5,
    items: ["ball", "book", "pen"]
  },
  {
    username: "becky",
    team: "blue",
    score: 10,
    items: ["tape", "backpack", "pen"]
  },
  {
    username: "susy",
    team: "red",
    score: 55,
    items: ["ball", "eraser", "pen"]
  },
  {
    username: "tyson",
    team: "green",
    score: 1,
    items: ["book", "pen"]
  },
];

console.log("Original gameInfo array:");
console.log(gameInfo);

// 1. Create an array using forEach that contains all the usernames from the gameInfo array, 
console.log("1. Usernames with exclamation points:");
const usernames = [];
gameInfo.forEach(player => {
  usernames.push(player.username + "!");
});
console.log("const usernames =", usernames);
console.log("Expected: [\"john!\", \"becky!\", \"susy!\", \"tyson!\"]");
console.log("✓ Match:", JSON.stringify(usernames) === JSON.stringify(["john!", "becky!", "susy!", "tyson!"]));

// 2. Create an array using forEach that contains the usernames of all players with a score bigger than 5.
console.log("2. Winners (score > 5):");
const winners = [];
gameInfo.forEach(player => {
  if (player.score > 5) {
    winners.push(player.username);
  }
});
console.log("const winners =", winners);
console.log("Expected: [\"becky\", \"susy\"]");
console.log("✓ Match:", JSON.stringify(winners) === JSON.stringify(["becky", "susy"]));

// 3. Find and display the total score of the users.
console.log("3. Total score calculation:");
let totalScore = 0;
gameInfo.forEach(player => {
  totalScore += player.score;
  console.log(`${player.username}: ${player.score} points`);
});
console.log(`\nTotal score: ${totalScore}`);
console.log("Expected: 71");
console.log("✓ Match:", totalScore === 71);
