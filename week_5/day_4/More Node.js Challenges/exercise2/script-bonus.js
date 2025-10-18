/**
 * Exercise 2 BONUS: Display minutes lived with user prompt
 * 
 * This version uses the 'prompt-sync' npm module to get user input.
 * Install with: npm install prompt-sync
 */

const minutesLived = require('./date.js');
const prompt = require('prompt-sync')();

console.log('=== Minutes Lived Calculator ===');
console.log('Please enter your birthdate in YYYY-MM-DD format (e.g., 1990-05-15)');

const birthdate = prompt('Your birthdate: ');

try {
    const minutes = minutesLived(birthdate);
    console.log(`\nYou have lived for ${minutes.toLocaleString()} minutes since your birth on ${birthdate}.`);
    console.log(`That's approximately ${Math.floor(minutes / 60).toLocaleString()} hours!`);
    console.log(`Or about ${Math.floor(minutes / 60 / 24).toLocaleString()} days!`);
} catch (error) {
    console.error(`Error: ${error.message}`);
}

