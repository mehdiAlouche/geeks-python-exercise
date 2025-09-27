# exercise 1
birthdays = {
    "Alice": "1998/05/14",
    "Bob": "2000/11/23",
    "Charlie": "1995/07/02",
    "Diana": "2001/03/19",
    "Ethan": "1999/12/30"
}

print("Welcome!")
print("You can look up the birthdays of the people in the list!")

name = input("Enter a person's name: ")

if name in birthdays:
    print(f"{name}'s birthday is {birthdays[name]}.")
else:
    print(f"Sorry, I don't have the birthday for {name}.")

# exercise 2

birthdays = {
    "Alice": "1998/05/14",
    "Bob": "2000/11/23",
    "Charlie": "1995/07/02",
    "Diana": "2001/03/19",
    "Ethan": "1999/12/30"
}

print("Welcome!")
print("You can look up the birthdays of the people in the list!")
print("Here are the available names:")

for name in birthdays:
    print("-", name)

user_name = input("\nEnter a person's name: ")

if user_name in birthdays:
    print(f"{user_name}'s birthday is {birthdays[user_name]}.")
else:
    print(f"Sorry, we don’t have the birthday information for {user_name}.")


# exercise 3

def series_sum(x: int) -> int:
    x_str = str(x)
    return int(x_str) + int(x_str * 2) + int(x_str * 3) + int(x_str * 4)

# Example usage
num = int(input("Enter an integer X: "))
print("Result:", series_sum(num))

# exercise 4

import random

def throw_dice() -> int:
    return random.randint(1, 6)

def throw_until_doubles() -> int:
    throws = 0
    while True:
        d1 = throw_dice()
        d2 = throw_dice()
        throws += 1
        if d1 == d2:
            break
    return throws

def main():
    results = []
    for _ in range(100):
        results.append(throw_until_doubles())

    total_throws = sum(results)
    average_throws = total_throws / len(results)

    print("Total throws:", total_throws)
    print("Average throws to reach doubles:", round(average_throws, 2))

if __name__ == "__main__":
    main()
