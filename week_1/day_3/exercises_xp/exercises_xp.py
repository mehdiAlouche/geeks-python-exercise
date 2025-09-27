#exercises 1

class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age


# Instantiate three cats
cat1 = Cat("Milo", 2)
cat2 = Cat("Luna", 5)
cat3 = Cat("Simba", 3)


# Function to find the oldest cat
def find_oldest_cat(cats):
    return max(cats, key=lambda cat: cat.age)


# Find and print the oldest cat
oldest = find_oldest_cat([cat1, cat2, cat3])
print(f"The oldest cat is {oldest.name}, and is {oldest.age} years old.")

#exercises 2

class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height

    def bark(self):
        print(f"{self.name} goes woof!")

    def jump(self):
        print(f"{self.name} jumps {self.height * 2} cm high!")


# Create mehdi's dog
mehdi_dog = Dog("Rex", 50)
print(f"mehdi  dog is named {mehdi_dog.name} and is {mehdi_dog.height} cm tall.")
mehdi_dog.bark()
mehdi_dog.jump()


# Create Sarah's dog
sarahs_dog = Dog("Teacup", 20)
print(f"Sarah's dog is named {sarahs_dog.name} and is {sarahs_dog.height} cm tall.")
sarahs_dog.bark()
sarahs_dog.jump()


# Check which dog is bigger
if mehdi_dog.height > sarahs_dog.height:
    print(f"The bigger dog is {mehdi_dog.name}.")
else:
    print(f"The bigger dog is {sarahs_dog.name}.")


#exercises 3

class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics

    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)


# Create the song object
stairway = Song([
    "There’s a lady who's sure",
    "all that glitters is gold",
    "and she’s buying a stairway to heaven"
])

# Call the method
stairway.sing_me_a_song()

#exercise 4 

class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []

    def add_animal(self, new_animal):
        """Add a new animal if not already in the zoo"""
        if new_animal not in self.animals:
            self.animals.append(new_animal)
            print(f"{new_animal} has been added to {self.name}.")
        else:
            print(f"{new_animal} is already in the zoo.")

    def get_animals(self):
        """Print all animals in the zoo"""
        if self.animals:
            print(f"Animals in {self.name}: {', '.join(self.animals)}")
        else:
            print(f"There are no animals in {self.name}.")

    def sell_animal(self, animal_sold):
        """Remove an animal if it exists in the zoo"""
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"{animal_sold} has been sold from {self.name}.")
        else:
            print(f"{animal_sold} is not in the zoo.")

    def sort_animals(self):
        """Sort animals alphabetically and group by first letter"""
        sorted_animals = sorted(self.animals)
        self.grouped_animals = {}

        for animal in sorted_animals:
            first_letter = animal[0].upper()
            if first_letter not in self.grouped_animals:
                self.grouped_animals[first_letter] = [animal]
            else:
                self.grouped_animals[first_letter].append(animal)

    def get_groups(self):
        """Print the animal groups"""
        if hasattr(self, 'grouped_animals') and self.grouped_animals:
            print(f"Animal groups in {self.name}:")
            for letter, animals in self.grouped_animals.items():
                if len(animals) == 1:
                    print(f"{letter}: {animals[0]}")
                else:
                    print(f"{letter}: {animals}")
        else:
            print("No groups available. Run sort_animals() first.")


# ---------------- Example usage ----------------
new_york_zoo = Zoo("New York Zoo")

# Add animals
new_york_zoo.add_animal("Lion")
new_york_zoo.add_animal("Tiger")
new_york_zoo.add_animal("Elephant")
new_york_zoo.add_animal("Zebra")
new_york_zoo.add_animal("Leopard")
new_york_zoo.add_animal("Eagle")
new_york_zoo.add_animal("Giraffe")

# Display all animals
new_york_zoo.get_animals()

# Sell an animal
new_york_zoo.sell_animal("Tiger")
new_york_zoo.get_animals()

# Sort animals and create groups
new_york_zoo.sort_animals()

# Display animal groups
new_york_zoo.get_groups()
