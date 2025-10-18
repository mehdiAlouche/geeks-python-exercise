// Exercise 7: Reading Directory Contents
// This script reads and displays the list of files in the current directory

const fs = require('fs');
const path = require('path');

console.log("Exercise 7: Reading Directory Contents");
console.log("=" .repeat(50));

// Get the current working directory
const currentDirectory = process.cwd();
console.log(`Current directory: ${currentDirectory}`);

try {
    console.log("\nReading directory contents...");
    
    // Read the directory contents
    const files = fs.readdirSync(currentDirectory);
    
    console.log(`Found ${files.length} items in the directory:`);
    console.log("-" .repeat(30));
    
    if (files.length === 0) {
        console.log("Directory is empty.");
    } else {
        // Sort files alphabetically
        const sortedFiles = files.sort();
        
        sortedFiles.forEach((file, index) => {
            try {
                // Get file stats to determine if it's a file or directory
                const filePath = path.join(currentDirectory, file);
                const stats = fs.statSync(filePath);
                
                if (stats.isDirectory()) {
                    console.log(`${index + 1}. [DIR]  ${file}`);
                } else if (stats.isFile()) {
                    console.log(`${index + 1}. [FILE] ${file} (${stats.size} bytes)`);
                } else {
                    console.log(`${index + 1}. [OTHER] ${file}`);
                }
            } catch (statError) {
                console.log(`${index + 1}. [UNKNOWN] ${file}`);
            }
        });
    }
    
    console.log("-" .repeat(30));
    
    // Additional directory information
    console.log("\nDirectory Statistics:");
    const fileStats = files.map(file => {
        try {
            const filePath = path.join(currentDirectory, file);
            const stats = fs.statSync(filePath);
            return {
                name: file,
                isDirectory: stats.isDirectory(),
                size: stats.isFile() ? stats.size : 0,
                modified: stats.mtime
            };
        } catch (error) {
            return {
                name: file,
                isDirectory: false,
                size: 0,
                modified: null
            };
        }
    });
    
    const directories = fileStats.filter(item => item.isDirectory);
    const files_only = fileStats.filter(item => !item.isDirectory);
    const totalSize = files_only.reduce((sum, file) => sum + file.size, 0);
    
    console.log(`Total items: ${files.length}`);
    console.log(`Directories: ${directories.length}`);
    console.log(`Files: ${files_only.length}`);
    console.log(`Total file size: ${totalSize} bytes`);
    
    // Show files by extension
    console.log("\nFiles by extension:");
    const extensions = {};
    files_only.forEach(file => {
        const ext = path.extname(file.name) || '(no extension)';
        extensions[ext] = (extensions[ext] || 0) + 1;
    });
    
    Object.entries(extensions).forEach(([ext, count]) => {
        console.log(`  ${ext}: ${count} file(s)`);
    });
    
    // Show recent files (modified in the last hour)
    console.log("\nRecent files (modified in last hour):");
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    const recentFiles = fileStats.filter(file => 
        file.modified && file.modified > oneHourAgo
    );
    
    if (recentFiles.length === 0) {
        console.log("  No files modified in the last hour.");
    } else {
        recentFiles.forEach(file => {
            console.log(`  ${file.name} - ${file.modified.toLocaleString()}`);
        });
    }
    
} catch (error) {
    console.error("Error reading directory:");
    console.error(`Error type: ${error.name}`);
    console.error(`Error message: ${error.message}`);
    
    if (error.code === 'ENOENT') {
        console.error("The specified directory does not exist.");
    } else if (error.code === 'EACCES') {
        console.error("Permission denied. You don't have access to this directory.");
    }
    
    process.exit(1);
}

console.log("\nDirectory reading completed successfully!");
console.log("=" .repeat(50));
