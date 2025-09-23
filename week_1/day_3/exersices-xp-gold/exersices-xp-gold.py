import math
import random


# Exercise 1 : Geometry
class Circle:
    def __init__(self, radius: float = 1.0):
        self.radius = radius

    def perimeter(self) -> float:
        return 2 * math.pi * self.radius

    def area(self) -> float:
        return math.pi * (self.radius ** 2)

    def definition(self) -> None:
        print("A circle is a set of all points in a plane that are at a fixed distance from a center.")


# Exercise 2 : Custom List Class
class MyList:
    def __init__(self, letters: list[str]):
        self.letters = letters

    def reversed_list(self) -> list[str]:
        return list(reversed(self.letters))

    def sorted_list(self) -> list[str]:
        return sorted(self.letters)

    def random_numbers(self) -> list[int]:
        return [random.randint(0, 100) for _ in range(len(self.letters))]


# Exercise 3 : Restaurant Menu Manager
class MenuManager:
    def __init__(self):
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice": "B", "gluten": True},
        ]

    def add_item(self, name: str, price: float, spice: str, gluten: bool):
        self.menu.append({"name": name, "price": price, "spice": spice, "gluten": gluten})
        print(f"{name} added to menu.")

    def update_item(self, name: str, price: float, spice: str, gluten: bool):
        for dish in self.menu:
            if dish["name"].lower() == name.lower():
                dish.update({"price": price, "spice": spice, "gluten": gluten})
                print(f"{name} updated.")
                return
        print(f"{name} not found in the menu.")

    def remove_item(self, name: str):
        for dish in self.menu:
            if dish["name"].lower() == name.lower():
                self.menu.remove(dish)
                print(f"{name} removed. Updated menu:")
                print(self.menu)
                return
        print(f"{name} not found in the menu.")


# === Example Usage ===
if __name__ == "__main__":
    # Circle example
    c = Circle(5)
    print("Perimeter:", round(c.perimeter(), 2))
    print("Area:", round(c.area(), 2))
    c.definition()

    # MyList example
    ml = MyList(["z", "b", "a", "m"])
    print("Reversed:", ml.reversed_list())
    print("Sorted:", ml.sorted_list())
    print("Random numbers:", ml.random_numbers())

    # MenuManager example
    manager = MenuManager()
    manager.add_item("Pasta", 12, "B", True)
    manager.update_item("Soup", 11, "A", False)
    manager.remove_item("Hamburger")
