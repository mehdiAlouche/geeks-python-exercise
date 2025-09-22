import random

class Game:
    def __init__(self):
        # keep track of results
        self.results = {"wins": 0, "losses": 0, "draws": 0}

    def get_user_item(self):
        valid = {"r": "rock", "p": "paper", "s": "scissors"}
        while True:
            choice = input("Select (r)ock, (p)aper, or (s)cissors: ").lower().strip()
            if choice in valid:
                return valid[choice]
            print("Invalid choice, please try again.")

    def get_computer_item(self):
        return random.choice(["rock", "paper", "scissors"])

    def get_game_result(self, user_item, computer_item):
        """Determine win/lose/draw."""
        if user_item == computer_item:
            return "draw"
        wins = {
            "rock": "scissors",
            "paper": "rock",
            "scissors": "paper"
        }
        if wins[user_item] == computer_item:
            return "win"
        return "loss"

    def play(self):
        user_item = self.get_user_item()
        comp_item = self.get_computer_item()
        result = self.get_game_result(user_item, comp_item)
        print(f"You chose: {user_item}. The computer chose: {comp_item}. Result: {result}")
        # update statistics
        if result == "win":
            self.results["wins"] += 1
        elif result == "loss":
            self.results["losses"] += 1
        else:
            self.results["draws"] += 1
        return result
