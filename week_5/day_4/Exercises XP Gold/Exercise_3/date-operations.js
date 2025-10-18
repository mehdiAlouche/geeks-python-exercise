const { addDays, format } = require('date-fns');

function performDateOperations() {
    // Get the current date and time
    const currentDate = new Date();
    
    console.log('Current date and time:', currentDate);
    
    // Add 5 days to the current date
    const futureDate = addDays(currentDate, 5);
    
    console.log('Date after adding 5 days:', futureDate);
    
    // Format the resulting date as a string
    const formattedDate = format(futureDate, 'EEEE, MMMM do, yyyy');
    
    console.log('Formatted date:', formattedDate);
    
    // Display additional formatted versions
    console.log('\nAdditional formatted dates:');
    console.log('Short format:', format(futureDate, 'MM/dd/yyyy'));
    console.log('ISO format:', format(futureDate, 'yyyy-MM-dd'));
    console.log('Full format:', format(futureDate, 'EEEE, MMMM do, yyyy \'at\' h:mm a'));
}

module.exports = { performDateOperations };
