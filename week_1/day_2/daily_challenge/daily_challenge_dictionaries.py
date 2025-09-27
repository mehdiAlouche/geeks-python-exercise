"""
Challenge: Create a dictionary that stores the indexes of each letter in a word.

Approach:
---------
1. Ask the user for input (a word).
2. Iterate over the word using `enumerate()` to get both the index and the letter.
3. For each letter:
   - Use the letter as a dictionary key (must be a string, which it already is).
   - Store all positions (indexes) of the letter inside a list.
   - If the letter is not yet in the dictionary, initialize it with an empty list.
   - Append the current index to the list.
4. Print the final dictionary.

This approach is efficient (O(n) time complexity), 
because each letter is processed only once, and appending to a list is constant time.
"""

def create_letter_index_dict(word: str) -> dict:
    """
    Given a word (string), return a dictionary where:
    - keys are letters (str)
    - values are lists of indexes where each letter appears
    """
    letter_dict = {}  # Initialize empty dictionary

    for index, letter in enumerate(word):
        # If the letter is not already a key, add it with an empty list
        if letter not in letter_dict:
            letter_dict[letter] = []

        # Append the index of the current letter
        letter_dict[letter].append(index)

    return letter_dict


# --- Main program execution ---
if __name__ == "__main__":
    # Step 1: Get user input
    user_word = input("Enter a word: ").strip()  # .strip() removes accidental spaces

    # Step 2: Process and create the dictionary
    result = create_letter_index_dict(user_word)

    # Step 3: Display the result
    print("Letter index dictionary:", result)
