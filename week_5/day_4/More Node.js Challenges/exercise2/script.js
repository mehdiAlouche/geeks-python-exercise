/**
 * Exercise 2: Display minutes lived
 */

const minutesLived = require('./date.js');

// Hardcoded birthdate (format: YYYY-MM-DD)
const birthdate = '1990-05-15';

const minutes = minutesLived(birthdate);
console.log(`You have lived for ${minutes.toLocaleString()} minutes since your birth on ${birthdate}.`);

