// Robot data array
const robots = [
    {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        image: 'https://robohash.org/1?200x200'
    },
    {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        image: 'https://robohash.org/2?200x200'
    },
    {
        id: 3,
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        image: 'https://robohash.org/3?200x200'
    },
    {
        id: 4,
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        image: 'https://robohash.org/4?200x200'
    },
    {
        id: 5,
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        image: 'https://robohash.org/5?200x200'
    },
    {
        id: 6,
        name: 'Mrs. Dennis Schulist',
        username: 'Leopoldo_Corkery',
        email: 'Karley_Dach@jasper.info',
        image: 'https://robohash.org/6?200x200'
    },
    {
        id: 7,
        name: 'Kurtis Weissnat',
        username: 'Elwyn.Skiles',
        email: 'Telly.Hoeger@billy.biz',
        image: 'https://robohash.org/7?200x200'
    },
    {
        id: 8,
        name: 'Nicholas Runolfsdottir V',
        username: 'Maxime_Nienow',
        email: 'Sherwood@rosamond.me',
        image: 'https://robohash.org/8?200x200'
    },
    {
        id: 9,
        name: 'Glenna Reichert',
        username: 'Delphine',
        email: 'Chaim_McDermott@dana.io',
        image: 'https://robohash.org/9?200x200'
    },
    {
        id: 10,
        name: 'Clementina DuBuque',
        username: 'Moriah.Stanton',
        email: 'Rey.Padberg@karina.biz',
        image: 'https://robohash.org/10?200x200'
    }
];

// DOM elements
const searchBox = document.getElementById('searchBox');
const robotCards = document.getElementById('robotCards');

// Function to create a robot card element
const createRobotCard = (robot) => {
    const card = document.createElement('div');
    card.className = 'robot-card';
    card.innerHTML = `
        <img src="${robot.image}" alt="${robot.name}" class="robot-image" />
        <h2 class="robot-name">${robot.name}</h2>
        <p class="robot-username">@${robot.username}</p>
        <p class="robot-email">${robot.email}</p>
    `;
    return card;
};

// Function to display robot cards
const displayRobots = (robotsToDisplay) => {
    // Clear existing cards
    robotCards.innerHTML = '';
    
    if (robotsToDisplay.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'No robots found matching your search.';
        robotCards.appendChild(noResults);
        return;
    }
    
    // Create and append cards for each robot
    robotsToDisplay.forEach(robot => {
        const card = createRobotCard(robot);
        robotCards.appendChild(card);
    });
};

// Function to filter robots based on search input
const filterRobots = (searchTerm) => {
    const filteredRobots = robots.filter(robot => 
        robot.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayRobots(filteredRobots);
};

// Event listener for search input
searchBox.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    filterRobots(searchTerm);
});

// Initialize the page by displaying all robots
document.addEventListener('DOMContentLoaded', () => {
    displayRobots(robots);
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to search box
    searchBox.addEventListener('focus', () => {
        searchBox.style.transform = 'scale(1.05)';
    });
    
    searchBox.addEventListener('blur', () => {
        searchBox.style.transform = 'scale(1)';
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (event) => {
        // Press '/' to focus search box
        if (event.key === '/' && event.target !== searchBox) {
            event.preventDefault();
            searchBox.focus();
        }
        
        // Press 'Escape' to clear search
        if (event.key === 'Escape' && event.target === searchBox) {
            searchBox.value = '';
            displayRobots(robots);
        }
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.robot-image');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            img.src = 'https://robohash.org/robot-placeholder?200x200';
            img.alt = 'Robot placeholder';
        });
    });
});
