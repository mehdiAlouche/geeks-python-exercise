#exercise 1

keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

result_dict = dict(zip(keys, values))

print(result_dict)

#exercise 2
family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}

def ticket_price_for_age(age):
    if age < 3:
        return 0
    if 3 <= age <= 12:
        return 10
    return 15

per_person_cost = {}
total_cost = 0
for name, age in family.items():
    cost = ticket_price_for_age(age)
    per_person_cost[name] = cost
    total_cost += cost

print("Per-person ticket costs:")
for name, cost in per_person_cost.items():
    print(f"- {name.capitalize()}: ${cost}")

print(f"Total cost: ${total_cost}")

#exercise 3
# 1. Create the brand dictionary with correct value types
brand = {
    'name': 'Zara',
    'creation_date': 1975,
    'creator_name': 'Amancio Ortega Gaona',
    'type_of_clothes': ['men', 'women', 'children', 'home'],
    'international_competitors': ['Gap', 'H&M', 'Benetton'],
    'number_stores': 7000,
    'major_color': {
        'France': 'blue',
        'Spain': 'red',
        'US': ['pink', 'green'],
    },
}

# 2. Change the number of stores to 2
brand['number_stores'] = 2

# 3. Print who Zara's clients are
clients = ", ".join(brand['type_of_clothes'])
print(f"Zara's clients are: {clients}.")

# 4. Add country_creation
brand['country_creation'] = 'Spain'

# 5. If international_competitors key exists, add 'Desigual'
if 'international_competitors' in brand and isinstance(brand['international_competitors'], list):
    brand['international_competitors'].append('Desigual')

# 6. Delete the creation_date
if 'creation_date' in brand:
    del brand['creation_date']

# 7. Print the last international competitor
if brand.get('international_competitors'):
    print(brand['international_competitors'][-1])

# 8. Print the major clothes colors in the US
us_colors = brand['major_color'].get('US')
print(us_colors)

# 9. Print the amount of key-value pairs
print(len(brand))

# 10. Print the keys of the dictionary
print(list(brand.keys()))

# 11. Create more_on_zara
more_on_zara = {
    'creation_date': 1975,
    'number_stores': 10000,
}

# 12. Merge more_on_zara into brand
brand.update(more_on_zara)

# 13. Print number_stores and note what happened
print(brand['number_stores'])

#exercise 4

def describe_city(city, country='Iceland'):
    print(f"{city} is in {country}")

# Calls
describe_city('Reykjavik')
describe_city('Akureyri')
describe_city('Paris', country='France')

#exercise 5

import random

def compare_with_random(user_number):
    if not (1 <= user_number <= 100):
        print("Please provide a number between 1 and 100.")
        return
    generated = random.randint(1, 100)
    if user_number == generated:
        print(f"Success! Both numbers are {generated}.")
    else:
        print(f"Fail. Your number: {user_number}, Random number: {generated}.")

# Example call
compare_with_random(42)

#exercise 6

def make_shirt(size, message):
    print(f"The size of the shirt is {size} and the text is '{message}'")

make_shirt('S', 'Hello World')


def make_shirt(size='L', message='I love Python'):
    print(f"The size of the shirt is {size} and the text is '{message}'")

make_shirt()  # large with default message
make_shirt('M')  # medium with default message
make_shirt('XL', 'Keep Calm and Code On')  # custom size and message

make_shirt(message='Code > Sleep', size='XS')

#exercise 7

import random as _random

def get_random_temp(season=None):
    # Return a float temperature based on season-specific ranges
    season = (season or '').strip().lower()
    if season in ('winter',):
        low, high = -10, 16
    elif season in ('spring',):
        low, high = 5, 22
    elif season in ('summer',):
        low, high = 18, 40
    elif season in ('autumn', 'fall'):
        low, high = 5, 25
    else:
        low, high = -10, 40
    return round(_random.uniform(low, high), 1)


def _season_from_month(month_number):
    # Simple Northern Hemisphere mapping
    if month_number in (12, 1, 2):
        return 'winter'
    if month_number in (3, 4, 5):
        return 'spring'
    if month_number in (6, 7, 8):
        return 'summer'
    if month_number in (9, 10, 11):
        return 'autumn'
    return None


def main():
    # Ask for month first (bonus). If invalid/empty, ask for season string
    month_input = input("Enter month number (1-12) or press Enter to skip: ").strip()
    season = None
    if month_input:
        try:
            month_num = int(month_input)
            if 1 <= month_num <= 12:
                season = _season_from_month(month_num)
            else:
                print("Month must be between 1 and 12. Falling back to season input.")
        except ValueError:
            print("Invalid month. Falling back to season input.")

    if season is None:
        season_input = input("Enter a season (winter, spring, summer, autumn/fall) or press Enter for any: ").strip()
        season = season_input if season_input else None

    temp = get_random_temp(season)
    print(f"The temperature right now is {temp} degrees Celsius.")

    # Advice based on temperature
    if temp < 0:
        print("Brrr, that's freezing! Wear some extra layers today.")
    elif 0 <= temp < 16:
        print("Quite chilly! Don't forget your coat.")
    elif 16 <= temp < 23:
        print("Mild and pleasant. A light jacket should do.")
    elif 23 <= temp < 32:
        print("Warm weather. Stay hydrated and enjoy the day!")
    elif 32 <= temp <= 40:
        print("It's hot! Limit sun exposure and drink plenty of water.")
    else:
        print("Unusual temperature range detected.")


# Call main to run Exercise 7 interactively
# main()

