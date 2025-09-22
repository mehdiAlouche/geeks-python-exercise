from game import Game

def get_user_menu_choice():
    while True:
        print("\nMenu:")
        print("(g) Play a new game")
        print("(x) Show scores and exit")
        choice = input("Enter your choice: ").lower().strip()
        if choice in ("g", "x"):
            return choice
        print("Invalid menu choice. Please try again.")

def print_results(results):

    print("\nGame Results:")
    print(f"You won  {results['wins']} times")
    print(f"You lost {results['losses']} times")
    print(f"You drew {results['draws']} times")
    print("\nThank you for playing!")

def main():
    game = Game()
    while True:
        user_choice = get_user_menu_choice()
        if user_choice == "g":
            game.play()
        else:  # 'x' to exit
            print_results(game.results)
            break

if __name__ == "__main__":
    main()
