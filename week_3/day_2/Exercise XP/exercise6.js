// Exercise 6: Navigation Bar DOM Manipulation

// Function to run the complete exercise
function runExercise6() {
    const output = document.getElementById('output');
    output.textContent = '';
    
    console.log("=== Exercise 6: Navigation Bar DOM Manipulation ===\n");
    
    try {
        // Step 1: Change the id attribute from navBar to socialNetworkNavigation
        console.log("Step 1: Changing ID attribute...");
        const navDiv = document.getElementById('navBar');
        
        if (navDiv) {
            console.log("Original element:", navDiv);
            console.log("Original ID:", navDiv.id);
            
            navDiv.setAttribute('id', 'socialNetworkNavigation');
            console.log("New ID:", navDiv.id);
            console.log("✓ ID successfully changed to 'socialNetworkNavigation'\n");
            
            output.textContent += `Step 1: Changed ID from 'navBar' to 'socialNetworkNavigation'\n`;
            
            // Highlight the element to show the change
            navDiv.classList.add('highlight');
        } else {
            console.log("❌ Navigation div not found!");
            output.textContent += "❌ Error: Navigation div not found!\n";
            return;
        }
        
        // Step 2: Get the unordered list
        const ulElement = document.querySelector('#socialNetworkNavigation ul');
        
        if (ulElement) {
            console.log("Found UL element:", ulElement);
            
            // Step it 3: Create a new <li> element
            console.log("\nStep 2-3: Creating new <li> element...");
            const newLiElement = document.createElement('li');
            console.log("Created new <li> element:", newLiElement);
            output.textContent += `\nStep 2-3: Created new <li> element\n`;
            
            // Step 4: Create a text node with "Logout"
            console.log("Step 4: Creating 'Logout' text node...");
            const logoutText = document.createTextNode('Logout');
            console.log("Created 'Logout' text node:", logoutText);
            output.textContent += `Step 4: Created 'Logout' text node\n`;
            
            // Step 5: Create an anchor element for the logout link
            const logoutLink = document.createElement('a');
            logoutLink.href = '#';
            logoutLink.appendChild(logoutText);
            
            // Append the anchor to the li element
            newLiElement.appendChild(logoutLink);
            console.log("✓ Added logout link to <li> element:", newLiElement);
            output.textContent += `Step 5: Created logout link and added to <li>\n`;
            
            // Step 6: Append the new <li> to the <ul>
            console.log("Step 6: Appending new <li> to <ul>...");
            ulElement.appendChild(newLiElement);
            console.log("✓ Successfully appended logout <li> to <ul>");
            console.log("Updated UL:", ulElement);
            output.textContent += `Step 6: Successfully appended logout <li> to <ul>\n`;
            
            // Highlight the new element
            setTimeout(() => {
                newLiElement.classList.add('highlight');
            }, 1000);
            
        } else {
            console.log("❌ UL element not found!");
            output.textContent += "❌ Error: UL element not found!");
            return;
        }
        
        // Step 7: Use firstElementChild and lastElementChild properties
        console.log("\nStep 7: Retrieving first and last <li> elements...");
        
        if (ulElement) {
            const firstLi = ulElement.firstElementChild;
            const lastLi = ulElement.lastElementChild;
            
            console.log("First <li> element:", firstLi);
            console.log("Last <li> element:", lastLi);
            
            if (firstLi) {
                const firstText = firstLi.textContent;
                console.log(`First link text: "${firstText}"`);
                output.textContent += `\nStep 7: First link text: "${firstText}"\n`;
            }
            
            if (lastLi) {
                const lastText = lastLi.textContent;
                console.log(`Last link text: "${lastText}"`);
                output.textContent += `Step 7: Last link text: "${lastText}"\n`;
            }
            
            output.textContent += `\n✅ Exercise 6 completed successfully!\n`;
            output.textContent += `The navigation bar now has ${ulElement.children.length} items and the ID has been changed.`;
            
            console.log("✅ Exercise 6 completed successfully!");
            
        } else {
            console.log("❌ Could not retrieve first/last elements!");
            output.textContent += "❌ Error: Could not retrieve first/last elements!\n";
        }
        
    } catch (error) {
        console.error("Error in Exercise 6:", error);
        output.textContent += `❌ Error: ${error.message}\n`;
    }
}

// Function to show detailed steps in console
function showDetailedSteps() {
    console.log("\n=== Detailed Steps Breakdown ===");
    console.log("1. document.getElementById('navBar') - Get the navigation div");
    console.log("2. element.setAttribute('id', 'socialNetworkNavigation') - Change ID");
    console.log("3. document.createElement('li') - Create new li element");
    console.log("4. document.createTextNode('Logout') - Create text node");
    console.log("5. document.createElement('a') - Create anchor for link");
    console.log("6. newLi.appendChild(logoutLink) - Add anchor to li");
    console.log("7. ulElement.appendChild(newLi) - Add li to ul");
    console.log("8. ulElement.firstElementChild - Get first li");
    console.log("9. ulElement.lastElementChild - Get last li");
    console.log("10. element.textContent - Get text content\n");
    
    const output = document.getElementById('output');
    output.textContent = "Detailed steps printed to console. Run Exercise 6 above to see the code in action!";
}

// Function to reset the navigation bar to original state
function resetNavigationBar() {
    // Remove any highlights
    document.querySelectorAll('.highlight').forEach(el => {
        el.classList.remove('highlight');
    });
    
    // Reset the ID if it was changed
    const navDiv = document.getElementById('socialNetworkNavigation');
    if (navDiv) {
        navDiv.setAttribute('id', 'navBar');
    }
    
    // Remove the logout li if it was added
    const logoutLi = document.querySelector('li:last-child');
    if (logoutLi && logoutLi.textContent.includes('Logout')) {
        logoutLi.remove();
    }
    
    const output = document.getElementById('output');
    output.textContent = "Navigation bar reset to original state. Click 'Run Exercise 6' to execute again.";
    
    console.log("Navigation bar reset to original state");
}

// Additional utility functions for demonstration
function demonstrateDOMProperties() {
    console.log("\n=== DOM Properties Demonstration ===");
    
    const ulElement = document.querySelector('#navBar ul') || document.querySelector('#socialNetworkNavigation ul');
    if (ulElement) {
        console.log("UL Element Properties:");
        console.log("- children.length:", ulElement.children.length);
        console.log("- firstElementChild:", ulElement.firstElementChild);
        console.log("- lastElementChild:", ulElement.lastElementChild);
        console.log("- firstChild:", ulElement.firstChild);
        console.log("- lastChild:", ulElement.lastChild);
        
        console.log("\nDifference between firstChild and firstElementChild:");
        console.log("- firstChild:", ulElement.firstChild, "(includes text nodes, comments)");
        console.log("- firstElementChild:", ulElement.firstElementChild, "(only elements)");
    }
}

function demonstrateElementCreation() {
    console.log("\n=== Element Creation Methods ===");
    
    const navDiv = document.getElementById('navBar') || document.getElementById('socialNetworkNavigation');
    if (navDiv) {
        // Method 1: createElement + createTextNode + appendChild
        const li1 = document.createElement('li');
        li1.appendChild(document.createTextNode('Method 1'));
        
        // Method 2: createElement + innerHTML/textContent
        const li2 = document.createElement('li');
        li2.innerHTML = '<a href="#">Method 2</a>';
        
        // Method 3: innerHTML (direct string insertion)
        const li3 = document.createElement('li');
        li3.textContent = 'Method 3 (only text)';
        
        console.log("Different ways to create elements:", li1, li2, li3);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log("🌟 Exercise 6: Navigation Bar DOM Manipulation");
    console.log("Ready to run! Click 'Run Exercise 6' to see the magic happen.");
    console.log("Use 'Show Detailed Steps' to understand the process.");
    console.log("Use 'Reset Navigation Bar' to restore original state.");
    
    const output = document.getElementById('output');
    output.textContent = "🌟 Exercise 6: Navigation Bar DOM Manipulation\n\nReady to run! Click 'Run Exercise 6' to execute the DOM manipulation exercise.\n\nWhat this exercise will do:\n1. Change div ID from 'navBar' to 'socialNetworkNavigation'\n2. Create a new <li> element with 'Logout' link\n3. Append the new <li> to the <ul>\n4. Display first and last link text\n\nClick the 'Run Exercise 6' button above to start!";
});
