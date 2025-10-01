# Daily Challenge: Web API to DB

This project implements a solution for the daily challenge that fetches 10 random countries from the REST Countries API and stores them in a PostgreSQL database.

## Features

- Fetches data from the REST Countries API (https://restcountries.com/v3.1/all)
- Extracts the required attributes: name, capital, flag, subregion, population
- Randomly selects 10 countries from the API response
- Stores the data in a PostgreSQL database
- Displays the fetched and stored data in a formatted table

## Requirements

- Python 3.6+
- PostgreSQL database
- requests library
- psycopg2 library

## Installation

1. Install PostgreSQL on your system
2. Create a database (e.g., `countries_db`)
3. Install the required Python dependencies:
```bash
pip install -r requirements.txt
```

4. Configure your database connection by creating a `.env` file:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=countries_db
DB_USER=your_username
DB_PASSWORD=your_password
```

## Usage

Run the main script:
```bash
python countries_api.py
```

## Database Schema

The PostgreSQL database contains a `countries` table with the following structure:

| Column     | Type        | Description                    |
|------------|-------------|--------------------------------|
| id         | SERIAL      | Primary key (auto-increment)   |
| name       | VARCHAR(255)| Country name (common name)     |
| capital    | VARCHAR(255)| Capital city                   |
| flag       | TEXT        | URL to flag image              |
| subregion  | VARCHAR(255)| Geographic subregion           |
| population | BIGINT      | Population count               |

## API Response Handling

The script handles the REST Countries API requirements by:
- Specifying required fields in the API request to avoid the 'fields' query error
- Extracting nested JSON data (name.common, flags.png, etc.)
- Providing fallback values for missing data

## Sample Output

```
Database 'countries.db' initialized successfully.
Starting Daily Challenge: Web API to DB
==================================================
Fetching 10 random countries from REST Countries API...
Successfully fetched 10 countries.

Fetched countries:
1. North Macedonia - Capital: Skopje, Population: 2,077,132
2. Djibouti - Capital: Djibouti, Population: 988,002
...

Countries successfully stored in database!

Database contents:
ID  Name                 Capital         Flag  Subregion            Population  
-------------------------------------------------------------------------------------
1   North Macedonia      Skopje          https://flagcdn.com/w320/mk.png Southeast Europe     2077132     
2   Djibouti             Djibouti        https://flagcdn.com/w320/dj.png Eastern Africa       988002      
...
```

## Files

- `countries_api.py` - Main implementation file
- `config.py` - Database configuration
- `requirements.txt` - Python dependencies
- `.env` - Environment variables (create this file with your database credentials)
- `README.md` - This documentation file

## Database Setup

1. **Install PostgreSQL** (if not already installed)
2. **Create a database**:
   ```sql
   CREATE DATABASE countries_db;
   ```
3. **Create a user** (optional, you can use the default postgres user):
   ```sql
   CREATE USER your_username WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE countries_db TO your_username;
   ```
4. **Create the `.env` file** with your database credentials
