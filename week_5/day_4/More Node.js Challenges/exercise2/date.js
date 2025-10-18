/**
 * Exercise 2: Calculate minutes lived since birthdate
 */

function minutesLived(birthdate) {
    const birth = new Date(birthdate);
    const now = new Date();
    
    // Validate the date
    if (isNaN(birth.getTime())) {
        throw new Error('Invalid date format. Please use YYYY-MM-DD format.');
    }
    
    // Calculate the difference in milliseconds
    const timeDiff = now - birth;
    
    // Convert to minutes
    const minutes = Math.floor(timeDiff / (1000 * 60));
    
    return minutes;
}

module.exports = minutesLived;

