/**
 * Exercise 3 BONUS: Calculate time until next holiday using date-holidays module
 */

const Holidays = require('date-holidays');

function timeUntilNextHoliday(countryCode = 'US') {
    const now = new Date();
    const hd = new Holidays(countryCode);
    
    // Get holidays for current and next year
    const currentYearHolidays = hd.getHolidays(now.getFullYear());
    const nextYearHolidays = hd.getHolidays(now.getFullYear() + 1);
    
    // Combine and filter public holidays
    const allHolidays = [...currentYearHolidays, ...nextYearHolidays]
        .filter(h => h.type === 'public')
        .map(h => ({
            name: h.name,
            date: new Date(h.date)
        }))
        .sort((a, b) => a.date - b.date);
    
    // Find the next holiday
    let nextHoliday = null;
    for (let holiday of allHolidays) {
        if (holiday.date > now) {
            nextHoliday = holiday;
            break;
        }
    }
    
    if (!nextHoliday) {
        return {
            today: now.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
            message: 'No upcoming holidays found in the database.'
        };
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
        message: `The next holiday (${nextHoliday.name}) is in ${days} days and ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} hours`,
        holidayDate: nextHoliday.date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    };
}

module.exports = timeUntilNextHoliday;

