// Import the TodoList class from the todo.js module using ES6 syntax
import { TodoList } from './todo.js';

console.log("Exercise 4: Todo List using ES6 module syntax");
console.log("=" .repeat(60));

// Create an instance of the TodoList class
const myTodoList = new TodoList();

console.log("\nCreating a new TodoList instance...");

// Add a few tasks
console.log("\nAdding tasks to the todo list:");
console.log("-" .repeat(40));

try {
    myTodoList.addTask("Learn Node.js modules");
    myTodoList.addTask("Complete Exercise 4");
    myTodoList.addTask("Practice ES6 import/export");
    myTodoList.addTask("Build a todo application");
    myTodoList.addTask("Review JavaScript fundamentals");
} catch (error) {
    console.error("Error adding tasks:", error.message);
}

// List all tasks
console.log("\nListing all tasks:");
myTodoList.listAllTasks();

// Get initial statistics
myTodoList.getStatistics();

// Mark some tasks as complete
console.log("\nMarking some tasks as complete:");
console.log("-" .repeat(40));

try {
    myTodoList.markTaskComplete(1); // Learn Node.js modules
    myTodoList.markTaskComplete(2); // Complete Exercise 4
    myTodoList.markTaskComplete(5); // Review JavaScript fundamentals
} catch (error) {
    console.error("Error marking tasks complete:", error.message);
}

// List all tasks again to see the changes
console.log("\nListing all tasks after marking some as complete:");
myTodoList.listAllTasks();

// Get updated statistics
myTodoList.getStatistics();

// Show only pending tasks
console.log("\nShowing pending tasks:");
myTodoList.getTasksByStatus(false);

// Show only completed tasks
console.log("\nShowing completed tasks:");
myTodoList.getTasksByStatus(true);

// Demonstrate error handling
console.log("\nTesting error handling:");
console.log("-" .repeat(40));

try {
    myTodoList.markTaskComplete(999); // Non-existent task ID
} catch (error) {
    console.log(`Expected error: ${error.message}`);
}

try {
    myTodoList.addTask(""); // Empty task description
} catch (error) {
    console.log(`Expected error: ${error.message}`);
}

// Add one more task and demonstrate incomplete marking
console.log("\nAdding one more task:");
myTodoList.addTask("Test the todo application");

// Mark it complete then incomplete
console.log("\nTesting mark as incomplete:");
myTodoList.markTaskComplete(6);
myTodoList.markTaskIncomplete(6);

// Final list of all tasks
console.log("\nFinal todo list:");
myTodoList.listAllTasks();

// Final statistics
myTodoList.getStatistics();

console.log("\nTodo list operations completed successfully!");
console.log("=" .repeat(60));
