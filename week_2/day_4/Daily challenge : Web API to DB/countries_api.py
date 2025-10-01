import requests
import psycopg2
import psycopg2.extras
import random
import json
from typing import List, Dict, Any
from config import DB_CONFIG


class CountriesAPI:
    """Class to handle REST Countries API integration and PostgreSQL database operations."""
    
    def __init__(self):
        """Initialize the CountriesAPI with PostgreSQL database connection."""
        self.db_config = DB_CONFIG
        self.base_url = "https://restcountries.com/v3.1"
        self.init_database()
    
    def init_database(self):
        """Initialize the PostgreSQL database and create countries table."""
        try:
            # Connect to PostgreSQL
            conn = psycopg2.connect(**self.db_config)
            cursor = conn.cursor()
            
            # Create countries table with required attributes
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS countries (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    capital VARCHAR(255),
                    flag TEXT,
                    subregion VARCHAR(255),
                    population BIGINT
                )
            ''')
            
            conn.commit()
            cursor.close()
            conn.close()
            print(f"PostgreSQL database '{self.db_config['database']}' initialized successfully.")
            
        except psycopg2.Error as e:
            print(f"Error initializing PostgreSQL database: {e}")
            print("Please ensure PostgreSQL is running and the database configuration is correct.")
            raise
    
    def fetch_all_countries(self) -> List[Dict[str, Any]]:
        """Fetch all countries from the REST Countries API."""
        try:
            # Specify the fields we need to avoid the 'fields' query error
            fields = "name,capital,flags,subregion,population"
            response = requests.get(f"{self.base_url}/all?fields={fields}")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error fetching countries: {e}")
            return []
    
    def get_random_countries(self, count: int = 10) -> List[Dict[str, Any]]:
        """Get a random selection of countries from the API."""
        all_countries = self.fetch_all_countries()
        
        if not all_countries:
            print("No countries fetched from API.")
            return []
        
        # Select random countries
        random_countries = random.sample(all_countries, min(count, len(all_countries)))
        
        # Extract required attributes
        processed_countries = []
        for country in random_countries:
            processed_country = {
                'name': country.get('name', {}).get('common', 'Unknown'),
                'capital': country.get('capital', ['Unknown'])[0] if country.get('capital') else 'Unknown',
                'flag': country.get('flags', {}).get('png', 'Unknown'),
                'subregion': country.get('subregion', 'Unknown'),
                'population': country.get('population', 0)
            }
            processed_countries.append(processed_country)
        
        return processed_countries
    
    def insert_countries_to_db(self, countries: List[Dict[str, Any]]) -> bool:
        """Insert countries data into the PostgreSQL database."""
        if not countries:
            print("No countries to insert.")
            return False
        
        try:
            conn = psycopg2.connect(**self.db_config)
            cursor = conn.cursor()
            
            # Clear existing data (optional - remove if you want to keep previous data)
            cursor.execute("DELETE FROM countries")
            
            # Insert new countries using executemany for better performance
            insert_query = '''
                INSERT INTO countries (name, capital, flag, subregion, population)
                VALUES (%s, %s, %s, %s, %s)
            '''
            
            country_data = [
                (
                    country['name'],
                    country['capital'],
                    country['flag'],
                    country['subregion'],
                    country['population']
                )
                for country in countries
            ]
            
            cursor.executemany(insert_query, country_data)
            conn.commit()
            print(f"Successfully inserted {len(countries)} countries into the PostgreSQL database.")
            return True
            
        except psycopg2.Error as e:
            print(f"PostgreSQL database error: {e}")
            if 'conn' in locals():
                conn.rollback()
            return False
        finally:
            if 'cursor' in locals():
                cursor.close()
            if 'conn' in locals():
                conn.close()
    
    def display_countries_from_db(self):
        """Display all countries from the PostgreSQL database."""
        try:
            conn = psycopg2.connect(**self.db_config)
            cursor = conn.cursor()
            
            cursor.execute("SELECT * FROM countries ORDER BY id")
            countries = cursor.fetchall()
            
            if not countries:
                print("No countries found in the database.")
            else:
                print(f"\n{'ID':<3} {'Name':<20} {'Capital':<15} {'Flag':<5} {'Subregion':<20} {'Population':<12}")
                print("-" * 85)
                for country in countries:
                    print(f"{country[0]:<3} {country[1]:<20} {country[2]:<15} {country[3]:<5} {country[4]:<20} {country[5]:<12}")
            
        except psycopg2.Error as e:
            print(f"Error displaying countries from PostgreSQL database: {e}")
        finally:
            if 'cursor' in locals():
                cursor.close()
            if 'conn' in locals():
                conn.close()
    
    def run_daily_challenge(self):
        """Run the complete daily challenge functionality."""
        print("Starting Daily Challenge: Web API to DB")
        print("=" * 50)
        
        # Get 10 random countries from API
        print("Fetching 10 random countries from REST Countries API...")
        random_countries = self.get_random_countries(10)
        
        if not random_countries:
            print("Failed to fetch countries from API.")
            return False
        
        print(f"Successfully fetched {len(random_countries)} countries.")
        
        # Display fetched countries
        print("\nFetched countries:")
        for i, country in enumerate(random_countries, 1):
            print(f"{i}. {country['name']} - Capital: {country['capital']}, Population: {country['population']:,}")
        
        # Insert countries into database
        print("\nInserting countries into database...")
        success = self.insert_countries_to_db(random_countries)
        
        if success:
            print("\nCountries successfully stored in database!")
            print("\nDatabase contents:")
            self.display_countries_from_db()
            return True
        else:
            print("Failed to insert countries into database.")
            return False


def main():
    """Main function to run the daily challenge."""
    api = CountriesAPI()
    api.run_daily_challenge()


if __name__ == "__main__":
    main()