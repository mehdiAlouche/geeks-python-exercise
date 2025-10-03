// Create an array which value is the planets of the solar system
const planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

// Bonus: Array of objects for planets with moons data
const planetsWithMoons = [
    { name: "Mercury", moons: [], colorClass: "mercury-color" },
    { name: "Venus", moons: [], colorClass: "venus-color" },
    { name: "Earth", moons: ["Moon"], colorClass: "earth-color" },
    { name: "Mars", moons: ["Phobos", "Deimos"], colorClass: "mars-color" },
    { name: "Jupiter", moons: ["Io", "Europa", "Ganymede", "Callisto"], colorClass: "jupiter-color" },
    { name: "Saturn", moons: ["Titan", "Enceladus", "Mimas", "Tethys"], colorClass: "saturn-color" },
    { name: "Uranus", moons: ["Miranda", "Ariel", "Umbriel", "Titania", "Oberon"], colorClass: "uranus-color" },
    { name: "Neptune", moons: ["Triton", "Proteus"], colorClass: "neptune-color" }
];

// Get the section element where we'll append the planets
const planetsSection = document.querySelector(".listPlanets");

// For each planet in the array, create a <div> using createElement
planets.forEach((planetName, index) => {
    // Create div element
    const planetDiv = document.createElement("div");
    
    // This div should have a class named "planet"
    planetDiv.className = "planet " + planetsWithMoons[index].colorClass;
    
    // Add planet name
    const planetText = document.createElement("p");
    planetText.className = "planet-name";
    planetText.textContent = planetName;
    planetDiv.appendChild(planetText);
    
    // Finally append each div to the <section> in the HTML
    planetsSection.appendChild(planetDiv);
});

// Bonus: Do the same process to create the moons
// Should you still use an array for the planets? Or an array of objects?
// Answer: Use array of objects for bonus as it allows storing both planet name and moons data

planetsWithMoons.forEach((planetData, planetIndex) => {
    // Get the planet div we just created
    const planetDiv = planetsSection.children[planetIndex];
    
    // Create moons for planets that have them
    planetData.moons.forEach((moonName, moonIndex) => {
        const moonDiv = document.createElement("div");
        moonDiv.className = "moon";
        moonDiv.textContent = moonName.charAt(0); // Show first letter
        
        // Add staggered animation delay for multiple moons
        moonDiv.style.animationDelay = `${moonIndex * 1.2}s`;
        
        planetDiv.appendChild(moonDiv);
    });
});

// Add some background stars for extra space effect
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.style.position = 'fixed';
    starsContainer.style.top = '0';
    starsContainer.style.left = '0';
    starsContainer.style.width = '100%';
    starsContainer.style.height = '100%';
    starsContainer.style.pointerEvents = 'none';
    starsContainer.style.zIndex = '-1';
    
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.style.position = 'absolute';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.8 + 0.2;
        
        // Add twinkling animation
        star.style.animation = `twinkle ${Math.random() * 3 + 1}s ease-in-out infinite alternate`;
        
        starsContainer.appendChild(star);
    }
    
    document.body.appendChild(starsContainer);
}

// Create stars when page loads
createStars();