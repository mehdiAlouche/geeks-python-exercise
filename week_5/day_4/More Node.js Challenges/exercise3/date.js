/**
 * Exercise 3: Calculate time until next holiday
 */

function timeUntilNextHoliday() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Hardcoded holidays for the current year (format: month is 0-indexed)
    const holidays = [
        { name: "New Year's Day", date: new Date(currentYear, 0, 1) },
        { name: "Valentine's Day", date: new Date(currentYear, 1, 14) },
        { name: "Easter", date: new Date(currentYear, 3, 20) }, // Approximate
        { name: "Independence Day", date: new Date(currentYear, 6, 4) },
        { name: "Halloween", date: new Date(currentYear, 9, 31) },
        { name: "Thanksgiving", date: new Date(currentYear, 10, 28) }, // Approximate (4th Thursday)
        { name: "Christmas", date: new Date(currentYear, 11, 25) },
        { name: "New Year's Day (Next Year)", date: new Date(currentYear + 1, 0, 1) }
    ];
    
    // Find the next holiday
    let nextHoliday = null;
    for (let holiday of holidays) {
        if (holiday.date > now) {
            nextHoliday = holiday;
            break;
        }
    }
    
    if (!nextHoliday) {
        // If no holiday found, default to New Year's Day next year
        nextHoliday = { name: "New Year's Day", date: new Date(currentYear + 1, 0, 1) };
    }
    
    // Calculate time difference
    const timeDiff = nextHoliday.date - now;
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    const today = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    return {
        today: today,
        message: `The next holiday (${nextHoliday.name}) is in ${days} days and ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} hours`
    };
}

module.exports = timeUntilNextHoliday;

