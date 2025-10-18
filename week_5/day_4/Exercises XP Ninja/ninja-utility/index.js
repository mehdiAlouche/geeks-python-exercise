#!/usr/bin/env node

const { Command } = require('commander');
const greet = require('./commands/greet');
const fetch = require('./commands/fetch');
const read = require('./commands/read');

const program = new Command();

// Configure the program
program
  .name('ninja-utility')
  .description('A command-line utility with advanced features')
  .version('1.0.0');

// Greet command
program
  .command('greet')
  .description('Display a colorful greeting message')
  .argument('[name]', 'Name to greet', 'User')
  .action((name) => {
    greet(name);
  });

// Fetch command
program
  .command('fetch')
  .description('Fetch data from a public API')
  .argument('[type]', 'Type of data to fetch (quotes, user)', 'quotes')
  .action(async (type) => {
    await fetch(type);
  });

// Read command
program
  .command('read')
  .description('Read and display the content of a file')
  .argument('<filepath>', 'Path to the file to read')
  .action((filepath) => {
    read(filepath);
  });

// Parse command-line arguments
program.parse(process.argv);

// Show help if no command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

