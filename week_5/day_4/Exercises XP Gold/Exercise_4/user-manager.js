const readlineSync = require('readline-sync');

// Create an empty array called users (array of objects)
let users = [];

// Function that adds objects to the users array using faker
async function addFakeUser() {
    const { faker } = await import('@faker-js/faker');
    
    const user = {
        name: faker.person.fullName(),
        address: {
            street: faker.location.streetAddress(),
            country: faker.location.country()
        }
    };
    
    users.push(user);
    console.log('Added fake user:', user);
    return user;
}

// Function that prompts the user for input and adds to users array
function addUserFromInput() {
    console.log('\n=== Add User Information ===');
    
    const name = readlineSync.question('Enter full name: ');
    const street = readlineSync.question('Enter street address: ');
    const country = readlineSync.question('Enter country: ');
    
    const user = {
        name: name,
        address: {
            street: street,
            country: country
        }
    };
    
    users.push(user);
    console.log('Added user from input:', user);
    return user;
}

// Function to display all users
function displayUsers() {
    console.log('\n=== All Users ===');
    if (users.length === 0) {
        console.log('No users in the array.');
    } else {
        users.forEach((user, index) => {
            console.log(`${index + 1}. Name: ${user.name}`);
            console.log(`   Street: ${user.address.street}`);
            console.log(`   Country: ${user.address.country}`);
            console.log('');
        });
    }
}

// Function to add multiple fake users
async function addMultipleFakeUsers(count = 5) {
    console.log(`\nAdding ${count} fake users...`);
    for (let i = 0; i < count; i++) {
        await addFakeUser();
    }
}

module.exports = {
    addFakeUser,
    addUserFromInput,
    displayUsers,
    addMultipleFakeUsers,
    users
};
