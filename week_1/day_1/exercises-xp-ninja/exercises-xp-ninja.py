#Exercise 1 – Outputs
def exercise_1_outputs():
    print("=== Exercise 1: Outputs ===\n")
    print("3 < 6 < 9 ->", 3 < 6 < 9)
    print("bool(0) ->", bool(0))
    print('bool("0") ->', bool("0"))
    print('bool("") and bool("45") ->', bool("") and bool("45"))
    print('bool("") or bool("45") ->', bool("") or bool("45"))
    print("bool(bool(False)) ->", bool(bool(False)))
    print()
    x = (not True)
    y = (not False)
    a = True + 8
    b = False + 8
    print("x =", x, "| y =", y)
    print("a =", a, "| b =", b)
    print("a > b ->", a > b)
    print()

#Exercise 2 : Longest word without a specific character
def exercise_2_longest_sentence():
    print("=== Exercise 2: Longest Sentence Without 'A' ===\n")
    longest = ""
    while True:
        sentence = input("Enter a sentence without the letter 'A' (or 'quit' to stop): ")
        if sentence.lower() == "quit":
            break
        if "a" in sentence.lower():
            print("❌ Oops! The sentence contains 'A'. Try again.")
            continue
        if len(sentence) > len(longest):
            longest = sentence
            print("🎉 New longest sentence:", longest)
    print("Longest valid sentence entered:", longest, "\n")

#Exercise 3: Working on a paragraph
def exercise_3_paragraph_analysis():
    print("=== Exercise 3: Paragraph Analysis ===\n")
    paragraph = input("Paste a paragraph of text:\n")
    characters = len(paragraph)
    non_whitespace = sum(1 for c in paragraph if not c.isspace())
    words = paragraph.split()
    sentences = [s for s in paragraph.replace("\n", " ").split(".") if s.strip()]
    unique_words = set(w.strip(".,!?;:").lower() for w in words)
    avg_words_per_sentence = len(words) / len(sentences) if sentences else 0
    non_unique_words = len(words) - len(unique_words)
    print("\n--- Paragraph Stats ---")
    print("Characters:", characters)
    print("Non-whitespace characters:", non_whitespace)
    print("Words:", len(words))
    print("Unique words:", len(unique_words))
    print("Sentences:", len(sentences))
    print("Average words per sentence:", round(avg_words_per_sentence, 2))
    print("Non-unique words:", non_unique_words)
    print()

if __name__ == "__main__":
    exercise_1_outputs()
    proceed = input("Run Exercise 2 (longest sentence) and Exercise 3 (paragraph analysis)? (y/n): ").strip().lower()
    if proceed == "y":
        exercise_2_longest_sentence()
        exercise_3_paragraph_analysis()
    else:
        print("Exiting program. Goodbye!")
