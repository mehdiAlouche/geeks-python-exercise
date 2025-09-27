# Exercise 1 : Hello World
print("Hello world\n" * 4)
# exercise 2 : Some Math

some_match_result = (99 ** 3) * 8
print(some_match_result) 
# exercise 3 : What’s your name ?

username = input("what is your name: ")
if username.lower() == "mehdi":
    print("yay we have the same name")
else:
    print(f"Oh nevermind, hello {username}")
# exercise 4 : Tall enough to ride a roller coaster

user_height = input("what is your height in cm: ")
user_height = int(user_height)
if user_height > 145:
    print("you are tall enough to ride")
else:
    print("you need to grow some more to ride.")
# exercise 5 : Favorite Numbers

my_fav_numbers = [1, 2, 3]
my_fav_numbers.append(4)
my_fav_numbers.append(5)
print(my_fav_numbers)
my_fav_numbers.pop(len(my_fav_numbers)-1)
print(my_fav_numbers)
friend_fav_numbers = [6, 7, 8]
our_fav_numbers = my_fav_numbers + friend_fav_numbers
print("Our fav numbers:", our_fav_numbers)
# Exercise 6: Tuple

print("No tuples are immutable")
# Exercise 7: List

basket = ["Banana", "Apples", "Oranges", "Blueberries"] 
basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")
count_apples = basket.count("Apples")
print(count_apples)
# count using for loop

apple_count = 0
for item in basket:
    if item == "Apples":
        apple_count += 1
        print(count_apples)
basket.clear()
print(basket)

# Exercise 8 : Sandwich Orders
sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich", "Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
while "Pastrami sandwich" in sandwich_orders:
    sandwich_orders.remove("Pastrami sandwich")
finished_sandwiches = []
while sandwich_orders:
    sandwich = sandwich_orders.pop(0)  
    finished_sandwiches.append(sandwich)
for sandwich in finished_sandwiches:
    print(f"- I made your {sandwich}")    
