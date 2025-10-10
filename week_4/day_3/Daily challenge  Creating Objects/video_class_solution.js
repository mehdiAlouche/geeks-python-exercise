// ========================================
// Daily Challenge: Creating Objects
// ========================================

// Create a class named Video
class Video {
    constructor(title, uploader, time) {
        this.title = title;
        this.uploader = uploader;
        this.time = time;
    }

    // Create a method called watch()
    watch() {
        return `${this.uploader} watched all ${this.time} of ${this.title}!`;
    }
}

console.log("\n--- Basic Implementation ---");

// Instantiate a new Video instance and call the watch() method
const video1 = new Video("JavaScript Tutorial", "John Doe", 1200);
console.log("Video 1:", video1.watch());

// Instantiate a second Video instance with different values
const video2 = new Video("Python Basics", "Jane Smith", 900);
console.log("Video 2:", video2.watch());

console.log("\n--- Bonus: Array Implementation ---");

// Bonus: Use an array to store data for five Video instances
// Best data structure: Array of objects with video data
const videoData = [
    { title: "React Fundamentals", uploader: "Alice Johnson", time: 1800 },
    { title: "Node.js Crash Course", uploader: "Bob Wilson", time: 2100 },
    { title: "CSS Grid Mastery", uploader: "Carol Brown", time: 1500 },
    { title: "MongoDB Tutorial", uploader: "David Lee", time: 2400 },
    { title: "Express.js Guide", uploader: "Eva Martinez", time: 1650 }
];

// Bonus: Loop through the array to instantiate those instances
const videos = videoData.map(data => new Video(data.title, data.uploader, data.time));

// Display all videos using the watch() method
console.log("All Videos:");
videos.forEach((video, index) => {
    console.log(`Video ${index + 1}:`, video.watch());
});

console.log("\n--- Alternative: Direct Array Creation ---");

// Alternative approach: Create videos directly in array
const directVideos = [
    new Video("Vue.js Basics", "Frank Green", 1350),
    new Video("Angular Tutorial", "Grace White", 1950),
    new Video("TypeScript Guide", "Henry Black", 1750)
];

directVideos.forEach((video, index) => {
    console.log(`Direct Video ${index + 1}:`, video.watch());
});

console.log("\n--- Video Information Access ---");

// Demonstrate accessing video properties
console.log("Video 1 Details:");
console.log(`Title: ${video1.title}`);
console.log(`Uploader: ${video1.uploader}`);
console.log(`Duration: ${video1.time} seconds`);
console.log(`Duration: ${Math.floor(video1.time / 60)} minutes and ${video1.time % 60} seconds`);
