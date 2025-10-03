// Exercise 7: My Book List - DOM Rendering

// Function to handle image loading errors with a fallback
function handleImageError(imgElement, bookTitle) {
    console.log(`⚠️ Image failed to load for: ${bookTitle}`);
    
    // Replace with a placeholder image using a placeholder service
    imgElement.src = `https://via.placeholder.com/100x140/f5f5f5/999999?text=📚`;
    imgElement.alt = `${bookTitle} - Cover Not Available`;
    imgElement.title = 'Book cover image not available';
    
    // Add a visual indicator that this is a placeholder
    imgElement.style.border = '2px dashed #ccc';
    imgElement.style.backgroundColor = '#f9f9f9';
}

// Array of books - each book is an object with 4 properties
const allBooks = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        image: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
        alreadyRead: true
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        image: "https://covers.openlibrary.org/b/isbn/9780446310789-L.jpg",
        alreadyRead: false
    },
    {
        title: "1984",
        author: "George Orwell",
        image: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
        alreadyRead: true
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        image: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
        alreadyRead: false
    }
];

// Function to render all books in the DOM
function renderBooks() {
    console.log("=== Exercise 7: Rendering Book List ===");
    console.log("Books to render:", allBooks);
    
    // Get the section element
    const booksSection = document.querySelector('.listBooks');
    
    if (!booksSection) {
        console.error("❌ Error: Could not find .listBooks section");
        return;
    }
    
    // Clear any existing content
    booksSection.innerHTML = '';
    
    // Show loading state
    booksSection.classList.add('loading');
    
    // Render each book
    allBooks.forEach((book, index) => {
        console.log(`\nRendering book ${index + 1}:`, book);
        
        // Create a div for each book
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book-card';
        
        // Add 'read' class if the book is already read
        if (book.alreadyRead) {
            bookDiv.classList.add('read');
            console.log(`📖 "${book.title}" - Already read (RED color applied)`);
        } else {
            console.log(`📚 "${book.title}" - Not yet read`);
        }
        
        // Create the book HTML structure
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="${book.title} Cover" class="book-image" 
                 onerror="handleImageError(this, '${book.title}');">
            <div class="book-details">
                <div class="book-title">${book.title}</div>
                <div class="book-author">written by ${book.author}</div>
                <span class="book-status ${book.alreadyRead ? 'read' : 'unread'}">
                    ${book.alreadyRead ? 'Already Read' : 'Not Read Yet'}
                </span>
            </div>
        `;
        
        // Add click event to book card
        bookDiv.addEventListener('click', () => {
            console.log(`Clicked on: ${book.title} by ${book.author}`);
        });
        
        // Append the book div to the section
        booksSection.appendChild(bookDiv);
        
        console.log(`✅ Book "${book.title}" rendered successfully`);
    });
    
    // Remove loading state after a delay
    setTimeout(() => {
        booksSection.classList.remove('loading');
        booksSection.classList.add('loaded');
        console.log(`🎉 Successfully rendered ${allBooks.length} books!`);
    }, 500);
    
    // Display final summary
    const readBooks = allBooks.filter(book => book.alreadyRead);
    const unreadBooks = allBooks.filter(book => !book.alreadyRead);
    
    console.log(`\n📊 Book Summary:`);
    console.log(`- Total books: ${allBooks.length}`);
    console.log(`- Already read (RED): ${readBooks.length}`);
    console.log(`- Not yet read: ${unreadBooks.length}`);
}

// Function to clear all books from the display
function clearBooks() {
    console.log("🗑️ Clearing all books from display...");
    
    const booksSection = document.querySelector('.listBooks');
    if (booksSection) {
        booksSection.innerHTML = '<div class="placeholder">{{👆}} Click "Render Books" to display your book collection!</div>';
        console.log("✅ Books cleared successfully");
    }
}

// Function to add sample books (bonus functionality)
function addSampleBooks() {
    console.log("➕ Adding sample books to the array...");
    
    const sampleBook = {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        image: "https://covers.openlibrary.org/b/isbn/9780316769174-L.jpg",
        alreadyRead: Math.random() > 0.5 // Random true/false
    };
    
    allBooks.push(sampleBook);
    console.log(`✅ Added "${sampleBook.title}" - Status: ${sampleBook.alreadyRead ? 'Already Read' : 'Not Read Yet'}`);
    
    // Auto-render after adding
    setTimeout(() => {
        renderBooks();
    }, 1000);
}

// Function to toggle a book's read status
function toggleBookStatus(bookIndex) {
    if (bookIndex >= 0 && bookIndex < allBooks.length) {
        const book = allBooks[bookIndex];
        book.alreadyRead = !book.alreadyRead;
        
        console.log(`🔄 Toggled "${book.title}" status to: ${book.alreadyRead ? 'Already Read' : 'Not Read Yet'}`);
        
        // Re-render to show updated colors
        setTimeout(() => {
            renderBooks();
        }, 500);
    } else {
        console.log("❌ Invalid book index:", bookIndex);
    }
}

// Function to show book array information
function showBookInfo() {
    console.log("\n📖 All Books Array Information:");
    console.log("==================================");
    
    allBooks.forEach((book, index) => {
        console.log(`\nBook ${index + 1}:`);
        console.log(`  Title: "${book.title}"`);
        console.log(`  Author: ${book.author}`);
        console.log(`  Image URL: ${book.image}`);
        console.log(`  Already Read: ${book.alreadyRead} ${book.alreadyRead ? '(RED color will be applied)' : '(Normal color)'}`);
    });
    
    // Also show in alert for quick reference
    const bookTitles = allBooks.map(book => `• ${book.title} by ${book.author}`).join('\n');
    alert(`📚 Current Book List:\n\n${bookTitles}`);
}

// Function to demonstrate DOM manipulation methods used
function showDOMTechniques() {
    console.log("\n🔧 DOM Manipulation Techniques Used:");
    console.log("===================================");
    console.log("1. document.querySelector('.listBooks') - Select the container");
    console.log("2. document.createElement('div') - Create new div elements");
    console.log("3. element.innerHTML = ... - Set HTML content");
    console.log("4. element.classList.add('class-name') - Add CSS classes");
    console.log("5. element.appendChild(child) - Add elements to DOM");
    console.log("6. element.addEventListener('click', ...) - Add event handlers");
    
    console.log("\n📋 Exercise Requirements Completed:");
    console.log("✅ Created array of book objects with 4 properties each");
    console.log("✅ Used DOM to render books in div containers");
    console.log("✅ Displayed book title and author (e.g., 'Harry Potter written by J.K. Rolling')");
    console.log("✅ Set image width to 100px");
    console.log("✅ Applied red color to already read books");
}

// Function to validate book data structure
function validateBookData() {
    console.log("\n🔍 Validating Book Data Structure:");
    console.log("==================================");
    
    let isValid = true;
    
    allBooks.forEach((book, index) => {
        const requiredProperties = ['title', 'author', 'image', 'alreadyRead'];
        const missingProperties = requiredProperties.filter(prop => !(prop in book));
        
        if (missingProperties.length > 0) {
            console.error(`❌ Book ${index + 1} missing properties:`, missingProperties);
            isValid = false;
        } else {
            console.log(`✅ Book ${index + 1} (${book.title}) - All required properties present`);
        }
        
        // Validate property types
        if (typeof book.title !== 'string') {
            console.error(`❌ Book ${index + 1} title should be a string`);
            isValid = false;
        }
        
        if (typeof book.author !== 'string') {
            console.error(`❌ Book ${index + 1} author should be a string`);
            isValid = false;
        }
        
        if (typeof book.image !== 'string') {
            console.error(`❌ Book ${index + 1} image should be a string (URL)`);
            isValid = false;
        }
        
        if (typeof book.alreadyRead !== 'boolean') {
            console.error(`❌ Book ${index + 1} alreadyRead should be a boolean`);
            isValid = false;
        }
    });
    
    console.log(isValid ? "✅ All books have valid data structure!" : "❌ Some books have invalid data structure");
    return isValid;
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("📚 Exercise 7: My Book List - Initialization");
    console.log("==============================================");
    
    // Validate the book data structure
    validateBookData();
    
    // Show DOM techniques used
    showDOMTechniques();
    
    // Display initial book info
    showBookInfo();
    
    console.log("\n🌟 Ready to run Exercise 7!");
    console.log("Click 'Render Books' to see the books displayed with proper styling and colors.");
    
    // Auto-render books after a short delay for demo
    setTimeout(() => {
        console.log("\n🚀 Auto-rendering books in 2 seconds...");
        setTimeout(() => {
            renderBooks();
        }, 2000);
    }, 1000);
});

// Bonus: Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        allBooks,
        renderBooks,
        toggleBookStatus,
        validateBookData
    };
}
