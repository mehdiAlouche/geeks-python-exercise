# Ninja Utility - Usage Examples

## Quick Start Guide

### 1. View Available Commands
```bash
node index.js --help
```

### 2. Greet Command Examples

Basic greeting:
```bash
node index.js greet
```

Personalized greeting:
```bash
node index.js greet "mehdi"
```

### 3. Fetch Command Examples

Fetch a random quote (default):
```bash
node index.js fetch
node index.js fetch quotes
```

Fetch user data:
```bash
node index.js fetch user
```

### 4. Read Command Examples

Read the sample file:
```bash
node index.js read sample.txt
```

Read package.json:
```bash
node index.js read package.json
```

Read this file:
```bash
node index.js read USAGE_EXAMPLES.md
```

## Testing the Application

1. **Test the greet command:**
   ```bash
   node index.js greet "Ninja Developer"
   ```

2. **Test the fetch command:**
   ```bash
   node index.js fetch quotes
   ```

3. **Test the read command:**
   ```bash
   node index.js read sample.txt
   ```

## Expected Output

### Greet Command
You should see a colorful welcome message with:
- Blue header banner
- Cyan welcome text
- Green and yellow personalized greeting
- Magenta closing message

### Fetch Command
For quotes, you should see:
- Blue "Fetching data" message
- Green "Random Quote" header
- Cyan italic quote text
- Yellow author attribution
- Gray tags

### Read Command
You should see:
- Blue "Reading file" message with filename
- Cyan "File Content" header
- File contents displayed
- Green success message

## Common Issues

### Error: Cannot find module
Make sure you've run `npm install` first:
```bash
npm install
```

### Error: File not found (read command)
Make sure the file path is correct and the file exists:
```bash
node index.js read nonexistent.txt  # This will fail
node index.js read sample.txt       # This will work
```

## Advanced Usage

### Get Help for Specific Commands
```bash
node index.js greet --help
node index.js fetch --help
node index.js read --help
```

### Version Information
```bash
node index.js --version
```

