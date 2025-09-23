# Exercise 1: Cars
cars_str = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"
cars = [c.strip() for c in cars_str.split(",")]

print("Number of manufacturers:", len(cars))
print("Manufacturers Z-A:", sorted(cars, reverse=True))

count_o = sum(1 for c in cars if "o" in c.lower())
count_no_i = sum(1 for c in cars if "i" not in c.lower())
print("Names with letter 'o':", count_o)
print("Names without letter 'i':", count_no_i)

duplicates = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]
unique = list(set(duplicates))
print("Unique companies:", ", ".join(unique))
print("Number of unique companies:", len(unique))

reversed_letters = [name[::-1] for name in sorted(unique)]
print("A-Z with letters reversed:", reversed_letters)


# Exercise 2: What’s your name?
def get_full_name(first_name: str, last_name: str, middle_name: str = "") -> str:
    if middle_name:
        full = f"{first_name} {middle_name} {last_name}"
    else:
        full = f"{first_name} {last_name}"
    return full.title()

# Examples
print(get_full_name(first_name="john", middle_name="hooker", last_name="lee"))
print(get_full_name(first_name="bruce", last_name="lee"))


# Exercise 3: From English to Morse
MORSE_CODE = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
}

def english_to_morse(text: str) -> str:
    return " ".join(MORSE_CODE.get(ch.upper(), "") for ch in text)

def morse_to_english(code: str) -> str:
    rev = {v: k for k, v in MORSE_CODE.items()}
    return "".join(rev.get(c, "") for c in code.split())

# Examples
sample = "hello world"
morse = english_to_morse(sample)
back = morse_to_english(morse)
print("English to Morse:", morse)
print("Morse to English:", back)
