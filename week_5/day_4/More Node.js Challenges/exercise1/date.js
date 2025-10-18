/**
 * Exercise 1: Calculate time remaining until January 1st
 */

function timeUntilNewYear() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Determine the next January 1st
    let nextNewYear = new Date(currentYear + 1, 0, 1, 0, 0, 0);
    
    // If we're already past Jan 1st of current year, use next year
    // (This is already handled above, but keeping for clarity)
    
    // Calculate the difference in milliseconds
    const timeDiff = nextNewYear - now;
    
    // Convert to days, hours, minutes, seconds
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    return `The 1st January is in ${days} days and ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} hours`;
}

module.exports = timeUntilNewYear;

