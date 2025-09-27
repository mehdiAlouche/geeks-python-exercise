from datetime import datetime

def get_birthdate():
    while True:
        try:
            birthdate_str = input("Please enter your birthdate (DD/MM/YYYY): ")
            birthdate = datetime.strptime(birthdate_str, "%d/%m/%Y")
            today = datetime.now()
            age = today.year - birthdate.year
            if (today.month, today.day) < (birthdate.month, birthdate.day):
                age -= 1
            if age < 0:
                print("Error: Birth date cannot be in the future!")
                continue
            elif age > 150:
                print("Error: Please enter a valid birth date!")
                continue
            return birthdate, age
        except ValueError:
            print("Invalid date format! Please use DD/MM/YYYY format (e.g., 15/06/1990)")

def draw_single_cake(candles):
    flames = "    " + "i" * candles
    sticks = "   " + "|" * candles
    print(flames)
    print(sticks)
    print("   |:H:a:p:p:y:|")
    print(" __|___________|__")
    print("|^^^^^^^^^^^^^^^^^|")
    print("|:B:i:r:t:h:d:a:y:|")
    print("|                 |")
    print("~~~~~~~~~~~~~~~~~~~")

def draw_double_cake():
    print("\nSpecial leap year birthday - You get TWO cakes!\n")
    print("Cake 1:")
    draw_single_cake(5)
    print("\n" + "="*30 + "\n")
    print("Cake 2:")
    draw_single_cake(5)

def is_leap_year_birthday(birthdate):
    return birthdate.month == 2 and birthdate.day == 29

def calculate_candles(age):
    last_digit = age % 10
    if age == 53:
        return 6
    if last_digit == 0:
        return 10
    else:
        return min(last_digit + 3, 10)

def main():
    print("=" * 50)
    print("HAPPY BIRTHDAY CAKE GENERATOR")
    print("=" * 50)
    print()
    birthdate, age
