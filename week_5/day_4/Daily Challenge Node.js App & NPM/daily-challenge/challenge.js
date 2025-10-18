// challenge.js - Final challenge integrating all modules

console.log('\n' + '🎯 '.repeat(30));
console.log('STARTING THE COMPLETE NODE.JS DAILY CHALLENGE');
console.log('🎯 '.repeat(30) + '\n');

// Require all the modules from previous tasks
const greet = require('./task_1/greeting');
const displayColorfulMessage = require('./task_2/colorful-message');
const readFileContent = require('./task_3/read-file');

// Task 1: Use the greet function to greet the user
console.log('\n📋 TASK 1: Module System - Greeting\n');
const greeting = greet('Developer');
console.log(greeting);

// Task 2: Display the colorful message
console.log('\n📋 TASK 2: NPM Module - Colorful Message with Chalk\n');
displayColorfulMessage();

// Task 3: Read and display the file's content
console.log('\n📋 TASK 3: File Operations - Reading File Content\n');
readFileContent();

// Completion message
console.log('\n' + '✅ '.repeat(30));
console.log('CHALLENGE COMPLETED SUCCESSFULLY!');
console.log('✅ '.repeat(30) + '\n');

