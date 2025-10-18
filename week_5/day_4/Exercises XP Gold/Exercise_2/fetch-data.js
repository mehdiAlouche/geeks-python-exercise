const axios = require('axios');

async function fetchPosts() {
    try {
        // Make an HTTP GET request to the JSON placeholder API
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        
        console.log('Fetched posts from API:');
        console.log('======================');
        
        // Display the title of each post in the terminal
        response.data.forEach((post, index) => {
            console.log(`${index + 1}. ${post.title}`);
        });
        
        console.log(`\nTotal posts fetched: ${response.data.length}`);
        
    } catch (error) {
        console.error('Error fetching posts:', error.message);
    }
}

module.exports = { fetchPosts };
