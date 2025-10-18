const { addFakeUser, addUserFromInput, displayUsers, addMultipleFakeUsers } = require('./user-manager');

async function main() {
    console.log('=== Faker Module Exercise ===\n');

    // Add some fake users
    console.log('1. Adding fake users using Faker:');
    await addMultipleFakeUsers(3);

    // Display all users
    displayUsers();

    // Interactive menu for user input
    console.log('\n=== Interactive User Input ===');
    console.log('You can now add users manually or add more fake users.');
    console.log('Choose an option:');
    console.log('1. Add user from input');
    console.log('2. Add fake user');
    console.log('3. Display all users');
    console.log('4. Exit');

    const readlineSync = require('readline-sync');

    while (true) {
        const choice = readlineSync.question('\nEnter your choice (1-4): ');
        
        switch (choice) {
            case '1':
                addUserFromInput();
                break;
            case '2':
                await addFakeUser();
                break;
            case '3':
                displayUsers();
                break;
            case '4':
                console.log('Goodbye!');
                process.exit(0);
            default:
                console.log('Invalid choice. Please enter 1, 2, 3, or 4.');
        }
    }
}

// Run the main function
main().catch(console.error);
