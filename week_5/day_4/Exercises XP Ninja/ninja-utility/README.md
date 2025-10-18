# Ninja Utility

A command-line utility with advanced features built with Node.js.

## Installation

```bash
npm install
```

## Usage

### Greet Command
Display a colorful greeting message:
```bash
node index.js greet
node index.js greet "mehdi id"
```

### Fetch Command
Fetch data from a public API:
```bash
node index.js fetch
node index.js fetch quotes
node index.js fetch user
```

### Read Command
Read and display the content of a file:
```bash
node index.js read sample.txt
node index.js read path/to/your/file.txt
```

## Features

- **chalk**: Colorful terminal output
- **axios**: HTTP requests to public APIs
- **commander**: Command-line interface
- **fs**: File system operations

## Help

To see all available commands:
```bash
node index.js --help
```

