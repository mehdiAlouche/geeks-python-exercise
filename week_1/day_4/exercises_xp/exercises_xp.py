#exercise 1
class Pet():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

# 1. Create Siamese cat breed
class Siamese(Cat):
    def sing(self, sounds):
        return f'{sounds}'

# 2. Create a list of three cat instances
all_cats = [
    Bengal("Whiskers", 3),
    Chartreux("Shadow", 5),
    Siamese("Luna", 2)
]

# 3. Create sara_pets instance
sara_pets = Pet(all_cats)

# 4. Take all cats for a walk
sara_pets.walk()

#exercises 2 

# Exercise 2: Dogs
class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        # Running speed formula: (weight / age) * 10
        return (self.weight / self.age) * 10

    def fight(self, other_dog):
        self_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight

        if self_power > other_power:
            return f"{self.name} won the fight"
        elif self_power < other_power:
            return f"{other_dog.name} won the fight"
        else:
            return "It's a tie"


# Create 3 dogs and run them through the class
dog1 = Dog("Rex", 5, 20)
dog2 = Dog("Buddy", 3, 25)
dog3 = Dog("Max", 4, 18)

print(dog1.bark())
print(dog2.bark())
print(dog3.bark())

print(f"{dog1.name} run speed: {dog1.run_speed()}")
print(f"{dog2.name} run speed: {dog2.run_speed()}")
print(f"{dog3.name} run speed: {dog3.run_speed()}")

print(dog1.fight(dog2))
print(dog2.fight(dog3))
print(dog3.fight(dog1))

#exercises 3
import random

class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *dog_names):
        names = ', '.join(dog_names)
        print(f"{names} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                f"{self.name} does a barrel roll.",
                f"{self.name} stands on his back legs.",
                f"{self.name} shakes your hand.",
                f"{self.name} plays dead."
            ]
            print(random.choice(tricks))
        else:
            print(f"{self.name} is not trained yet.")

#exercise 4

class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, **kwargs):
        """Add a new child to the family"""
        self.members.append(kwargs)
        print(f"Congratulations! A new child named {kwargs['name']} was born into the {self.last_name} family!")

    def is_18(self, name):
        """Check if a family member is over 18"""
        for member in self.members:
            if member["name"] == name:
                return member["age"] >= 18
        print(f"No member named {name} found in the {self.last_name} family.")
        return False

    def family_presentation(self):
        """Print the family last name and details of each member"""
        print(f"\n The {self.last_name} Family:")
        for member in self.members:
            details = ", ".join([f"{key}: {value}" for key, value in member.items()])
            print(f"- {details}")


# ---------------- Example usage ----------------
my_family = Family("Smith")

# Add some initial members
my_family.members = [
    {"name": "John", "age": 35, "gender": "Male"},
    {"name": "Jane", "age": 33, "gender": "Female"},
    {"name": "Jimmy", "age": 15, "gender": "Male"}
]

# Present the family
my_family.family_presentation()

# Add a new child
my_family.born(name="Emma", age=0, gender="Female")

# Check ages
print("Is John over 18?", my_family.is_18("John"))
print("Is Jimmy over 18?", my_family.is_18("Jimmy"))

# Final presentation
my_family.family_presentation()

#exercise 5

class TheIncredibles(Family):
    def __init__(self, last_name, members):
        super().__init__(last_name)
        self.members = members  # override members list to include powers and incredible_names

    def use_power(self, name):
        """Print the power of a member if they are over 18, else raise an exception"""
        for member in self.members:
            if member["name"] == name:
                if member["age"] >= 18:
                    print(f"{member['name']} uses their power: {member['power']}!")
                    return
                else:
                    raise Exception(f"{member['name']} is not over 18 years old and cannot use their power!")
        raise ValueError(f"No member named {name} found in the {self.last_name} family.")

    def incredible_presentation(self):
        print("*Here is our powerful family **")
        super().family_presentation()
# incredible_presentation method call
incredible_family.incredible_presentation()

# Add Baby Jack using the inherited born() method
incredible_family.born(
    name="Jack",
    age=1,
    gender="Male",
    is_child=True,
    power="Unknown Power",
    incredible_name="BabyJack"
)

# Call the incredible_presentation method again
incredible_family.incredible_presentation()
