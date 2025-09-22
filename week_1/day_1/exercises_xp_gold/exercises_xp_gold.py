# exercise 1
user_input = input("Enter a month from (1 to 12): ")
month = int(user_input)
season = ""
if month in range(1, 3):
    season = "Winter"
elif month in range(4, 6):
    season = "Spring"
elif month in range(7, 9):
    season = "Summer"
elif month in range(10, 12):
    season = "Autumn"
else:
    season = "Invalid month"
print(season)

# exercise 2
for i in range(1, 21) :
    print(i)
    
numbers = list(range(1, 21))

for index in range(len(numbers)):
    if index % 2 == 0:
        print(numbers[index])

# exercise 3
my_name = "mehdi"
user_name = ""
while user_name != my_name:
    user_name = input("Enter your name: ")
print("Hello, we have the same name!")
# exercise 4

names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']

user_name = input("Enter your name: ")

if user_name in names:
    index = names.index(user_name)
    print(f"index :{index}")

# exercise 5

num1 = int(input("Input the 1st number: "))
num2 = int(input("Input the 2nd number: "))
num3 = int(input("Input the 3rd number: "))

greatest = max(num1, num2, num3)

print("The greatest number is:", greatest)

# exercise 6

import random  


print("Welcome to the Number Guessing Game!")
print("Guess a number between 1 and 9.")
print("Type 'quit' anytime to stop playing.\n")

wins = 0
losses = 0

while True:
    user_input = input("Enter your guess (1-9): ")


    if user_input.lower() == "quit":
        print("\nThanks for playing!")
        break  

    if not user_input.isdigit():
        print("Oops! Please type a number between 1 and 9, or 'quit' to stop.")
        continue  

    guess = int(user_input)

    if guess < 1 or guess > 9:
        print("Please pick a number BETWEEN 1 and 9.")
        continue
    
    secret_number = random.randint(1, 9)

    if guess == secret_number:
        print("🎉 Winner! You guessed it right!")
        wins += 1
    else:
        print(f"🙁 Better luck next time! The correct number was {secret_number}.")
        losses += 1

print("\n📊 Game Summary:")
print(f"Total games won: {wins}")
print(f"Total games lost: {losses}")
print("Goodbye! 👋")
