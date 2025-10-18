# Node.js Date Challenges

This project contains solutions for three Node.js exercises focused on date manipulation and module usage.

## Setup

1. Install dependencies:
```bash
npm install
```

## Exercises

### Exercise 1: Countdown to New Year
Calculate and display the time remaining until January 1st.

**Run:**
```bash
npm run ex1
# or
node exercise1/script.js
```

**Files:**
- `exercise1/date.js` - Contains the countdown function
- `exercise1/script.js` - Displays the result

---

### Exercise 2: Minutes Lived Calculator
Calculate how many minutes you've lived since your birthdate.

**Basic Version:**
```bash
npm run ex2
# or
node exercise2/script.js
```

**Bonus Version (with user input):**
```bash
npm run ex2-bonus
# or
node exercise2/script-bonus.js
```

The bonus version uses the `prompt-sync` npm module to accept user input for the birthdate.

**Files:**
- `exercise2/date.js` - Function to calculate minutes lived
- `exercise2/script.js` - Basic version with hardcoded birthdate
- `exercise2/script-bonus.js` - Interactive version with user prompt (BONUS)

---

### Exercise 3: Next Holiday Countdown
Display today's date and countdown to the next holiday.

**Basic Version:**
```bash
npm run ex3
# or
node exercise3/script.js
```

**Bonus Version (with date-holidays module):**
```bash
npm run ex3-bonus
# or
node exercise3/script-bonus.js
```

The bonus version uses the `date-holidays` npm module to get actual holiday dates for different countries.

**Files:**
- `exercise3/date.js` - Basic version with hardcoded holidays
- `exercise3/script.js` - Displays the result (basic version)
- `exercise3/date-bonus.js` - Function using date-holidays module (BONUS)
- `exercise3/script-bonus.js` - Displays holidays from the module (BONUS)

---

## NPM Modules Used

- **prompt-sync** (^4.2.0) - Synchronous prompt for user input in the terminal
- **date-holidays** (^4.3.4) - Library for getting official holidays by country

## Running Individual Exercises

You can run any exercise using the npm scripts defined in `package.json`:

- `npm run ex1` - Exercise 1
- `npm run ex2` - Exercise 2 (basic)
- `npm run ex2-bonus` - Exercise 2 (with user input)
- `npm run ex3` - Exercise 3 (basic)
- `npm run ex3-bonus` - Exercise 3 (with holiday module)

## Learning Outcomes

- Working with Node.js Date objects
- Creating and exporting modules
- Using `require()` to import modules
- Installing and using NPM packages
- Calculating time differences
- Formatting dates and times

