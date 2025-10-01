def display_board(board):
    print("\n" + "="*13)
    for i in range(3):
        print(f"| {board[i*3]} | {board[i*3+1]} | {board[i*3+2]} |")
        if i < 2:
            print("|---|---|---|")
    print("="*13 + "\n")

def initialize_board():
    return [' ' for _ in range(9)]

def is_valid_move(board, position):
    return 0 <= position <= 8 and board[position] == ' '

def player_input(player, board):
    while True:
        try:
            print(f"Player {player}'s turn")
            print("Enter position (1-9): ", end="")
            position = int(input()) - 1
            
            if is_valid_move(board, position):
                return position
            else:
                print("Invalid move! Position is either taken or out of range. Try again.")
        except ValueError:
            print("Invalid input! Please enter a number between 1 and 9.")

def make_move(board, position, player):
    board[position] = player

def check_win(board):
    winning_combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for combo in winning_combinations:
        if (board[combo[0]] == board[combo[1]] == board[combo[2]] != ' '):
            return board[combo[0]]
    
    return None

def is_board_full(board):
    return ' ' not in board

def switch_player(current_player):
    return 'O' if current_player == 'X' else 'X'

def print_position_guide():
    print("\nPosition Guide:")
    print("="*13)
    for i in range(3):
        print(f"| {i*3+1} | {i*3+2} | {i*3+3} |")
        if i < 2:
            print("|---|---|---|")
    print("="*13 + "\n")

def play():
    print("Welcome to Tic Tac Toe!")
    print("Player 1 will be X and Player 2 will be O")
    print_position_guide()
    
    board = initialize_board()
    current_player = 'X'
    game_over = False
    
    while not game_over:
        display_board(board)
        position = player_input(current_player, board)
        make_move(board, position, current_player)
        winner = check_win(board)
        if winner:
            display_board(board)
            print(f"🎉 Congratulations! Player {winner} wins! 🎉")
            game_over = True
        elif is_board_full(board):
            display_board(board)
            print("🤝 It's a tie! The board is full. 🤝")
            game_over = True
        else:
            current_player = switch_player(current_player)
    while True:
        play_again = input("Would you like to play again? (y/n): ").lower().strip()
        if play_again in ['y', 'yes']:
            play()
            break
        elif play_again in ['n', 'no']:
            print("Thanks for playing! Goodbye!")
            break
        else:
            print("Please enter 'y' for yes or 'n' for no.")

if __name__ == "__main__":
    play()
