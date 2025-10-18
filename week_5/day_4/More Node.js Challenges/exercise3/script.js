/**
 * Exercise 3: Display next holiday countdown
 */

const timeUntilNextHoliday = require('./date.js');

const result = timeUntilNextHoliday();
console.log(`Today is: ${result.today}`);
console.log(result.message);

