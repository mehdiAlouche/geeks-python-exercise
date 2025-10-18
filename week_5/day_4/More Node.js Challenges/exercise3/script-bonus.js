/**
 * Exercise 3 BONUS: Display next holiday countdown using date-holidays module
 * 
 * This version uses the 'date-holidays' npm module to get actual holiday dates.
 * Install with: npm install date-holidays
 */

const timeUntilNextHoliday = require('./date-bonus.js');

console.log('=== Next Holiday Countdown ===\n');

const result = timeUntilNextHoliday('US'); // You can change 'US' to other country codes like 'GB', 'CA', 'FR', etc.

console.log(`Today is: ${result.today}`);
if (result.holidayDate) {
    console.log(`Holiday date: ${result.holidayDate}`);
}
console.log(result.message);

