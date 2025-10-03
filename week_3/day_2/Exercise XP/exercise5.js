// Exercise 5: Users - HTML DOM Manipulation

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("=== Exercise 5: Users - HTML DOM Manipulation ===\n");
    
    // 1. Retrieve the div and console.log it
    console.log("1. Retrieve and log the div:");
    let containerDiv = document.getElementById('container');
    console.log(containerDiv);
    console.log("Container text:", containerDiv.textContent);
    
    // 2. Change the name "Pete" to "Richard"
    console.log("\n2. Change 'Pete' to 'Richard':");
    let peteElement = document.querySelector('ul li:nth-child(2)'); // Second li in first ul
    console.log("Original text:", peteElement.textContent);
    peteElement.textContent = 'Richard';
    console.log("New text:", peteElement.textContent);
    
    // 3. Delete the second <li> of the second <ul>
    console.log("\n3. Delete the second <li> of the second <ul>:");
    let secondUL = document.querySelectorAll('ul')[1]; // Second ul
    let secondLI = secondUL.querySelectorAll('li')[1]; // Second li in second ul
    console.log("Deleting:", secondLI.textContent);
    secondUL.removeChild(secondLI);
    
    // 4. Change the name of the first <li> of each <ul> to your name
    console.log("\n4. Change the first <li> of each <ul> to 'Your Name':");
    let allUlElements = document.querySelectorAll('ul');
    allUlElements.forEach(function(ul, index) {
        let firstLi = ul.querySelector('li:first-child');
        console.log(`UL ${index + 1} - Original first li:`, firstLi.textContent);
        firstLi.textContent = 'Your Name';
        console.log(`UL ${index + 1} - New first li:`, firstLi.textContent);
    });
    
    // 5. Add a class called student_list to both of the <ul>'s
    console.log("\n5. Add class 'student_list' to both <ul> elements:");
    allUlElements.forEach(function(ul, index) {
        ul.classList.add('student_list');
        console.log(`UL ${index + 1} classes:`, ul.className);
    });
    
    // 6. Add the classes university and attendance to the first <ul>
    console.log("\n6. Add classes 'university' and 'attendance' to the first <ul>:");
    let firstUL = allUlElements[0];
    firstUL.classList.add('university', 'attendance');
    console.log("First UL classes:", firstUL.className);
    
    // 7. Add a "light blue" background color and some padding to the <div>
    // Note: This is already handled in CSS, but let's verify and add JS-based styling too
    console.log("\n7. Ensure 'light blue' background and padding for the div:");
    containerDiv.style.backgroundColor = 'lightblue';
    containerDiv.style.padding = '15px';
    console.log("Container div styling applied");
    
    // 8. Do not display the <li> that contains the text node "Dan"
    // Find "Dan" after changes and hide it
    console.log("\n8. Hide the <li> containing 'Dan':");
    setTimeout(function() {
        // Use a small delay to ensure all DOM changes are applied
        let allLis = document.querySelectorAll('li');
        allLis.forEach(function(li) {
            if (li.textContent === 'Dan') {
                console.log("Hiding:", li.textContent);
                li.style.display = 'none';
            }
        });
    }, 100);
    
    // 9. Add a border to the <li> that contains the text node "Richard"
    console.log("\n9. Add border to <li> containing 'Richard':");
    setTimeout(function() {
        let allLis = document.querySelectorAll('li');
        allLis.forEach(function(li) {
            if (li.textContent === 'Richard') {
                console.log("Adding border to:", li.textContent);
                li.setAttribute('id', 'richard-style');
                // The border styling is already handled in CSS via #richard-style
            }
        });
    }, 100);
    
    // 10. Change the font size of the whole body
    console.log("\n10. Change font size of the whole body:");
    document.body.style.fontSize = '18px';
    console.log("Body font size changed to 18px");
    
    // BONUS: If the background color of the div is "light blue", alert "Hello x and y"
    // where x and y are the users in the div
    console.log("\nBONUS: Check for light blue background and show users:");
    setTimeout(function() {
        let bgColor = window.getComputedStyle(containerDiv).backgroundColor;
        // Convert RGB to identifiable color name
        let isLightBlue = bgColor.includes('173') || bgColor.includes('216') || bgColor.includes('230') || 
                         containerDiv.style.backgroundColor === 'lightblue' ||
                         bgColor === 'rgb(173, 216, 230)';
        
        if (isLightBlue) {
            // Get all user names from the lists
            let allUsers = [];
            let allLis = document.querySelectorAll('ul li');
            
            allLis.forEach(function(li) {
                if (li.style.display !== 'none') {
                    allUsers.push(li.textContent);
                }
            });
            
            // Get unique users (if needed)
            let uniqueUsers = [...new Set(allUsers)];
            
            if (uniqueUsers.length >= 2) {
                alert(`Hello ${uniqueUsers[0]} and ${uniqueUsers[1]}!`);
                console.log(`Alert shown: Hello ${uniqueUsers[0]} and ${uniqueUsers[1]}!`);
            } else {
                alert(`Hello ${uniqueUsers.join(', ')}!`);
                console.log(`Alert shown: Hello ${uniqueUsers.join(', ')}!`);
            }
        }
    }, 200);
    
    // Display final state
    setTimeout(function() {
        console.log("\n=== Final DOM State ===");
        console.log("Container div:", containerDiv.outerHTML);
        let finalULs = document.querySelectorAll('ul');
        finalULs.forEach(function(ul, index) {
            console.log(`UL ${index + 1}:`, ul.outerHTML);
        });
        console.log("\nAll LI elements:");
        let finalLis = document.querySelectorAll('li');
        finalLis.forEach(function(li, index) {
            console.log(`LI ${index + 1}:`, li.textContent, li.style.display === 'none' ? '(HIDDEN)' : '(VISIBLE)');
        });
    }, 300);
});
