# Exercise 7: Reading and Copying Files

## Overview
This exercise demonstrates basic file operations using Node.js fs module, including reading files, copying content, and listing directory contents.

## Files Structure
```
file-explorer/
├── source.txt              # Source file with sample content
├── copy-file.js            # Script to copy source.txt to destination.txt
├── read-directory.js       # Script to list directory contents
├── verify-files.js         # Verification script
└── README.md              # This documentation
```

## Files Description

### source.txt
Contains sample content about file operations and Node.js fs module concepts.

### copy-file.js
Demonstrates:
- Reading files using `fs.readFileSync()`
- Writing files using `fs.writeFileSync()`
- Error handling for file operations
- File verification and statistics
- Content comparison

### read-directory.js
Demonstrates:
- Reading directory contents using `fs.readdirSync()`
- File type detection (file vs directory)
- File statistics and information
- File sorting and categorization
- Recent file filtering

### verify-files.js
Simple verification script to check if files exist and display basic information.

## Usage Instructions

```bash
# Navigate to the file-explorer directory
cd file-explorer

# Run the copy operation
node copy-file.js

# List directory contents
node read-directory.js

# Verify files (optional)
node verify-files.js
```

## Expected Output

### copy-file.js
- Reads content from source.txt
- Displays content preview and statistics
- Writes content to destination.txt
- Verifies the copy operation
- Shows file creation times and sizes

### read-directory.js
- Lists all files and directories
- Shows file types and sizes
- Provides directory statistics
- Categorizes files by extension
- Shows recently modified files

## Key Concepts Demonstrated

- **File Reading**: Using `fs.readFileSync()` for synchronous file reading
- **File Writing**: Using `fs.writeFileSync()` for synchronous file writing
- **Directory Reading**: Using `fs.readdirSync()` to list directory contents
- **File Statistics**: Using `fs.statSync()` to get file information
- **Error Handling**: Proper try-catch blocks for file operations
- **Path Handling**: Using `path.join()` for cross-platform path construction

## Error Handling
Both scripts include comprehensive error handling for:
- Missing files (ENOENT errors)
- Permission issues (EACCES errors)
- Invalid file paths
- File system errors

This exercise provides a solid foundation for understanding Node.js file system operations.
