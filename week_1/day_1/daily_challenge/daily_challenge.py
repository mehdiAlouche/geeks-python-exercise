# Challenge 1
number = int(input("Enter a number: "))
length = int(input("Enter the length: "))

multiples = []
count = 1

while len(multiples) < length:
    multiples.append(number * count)
    count += 1

print(multiples)
# Challenge 2

word = input("Enter a word: ")
word = list(word) 
i = 0

while i < len(word) - 1:
    if word[i] == word[i + 1]:
        del word[i + 1] 
    else:
        i += 1 

cleaned_word = ""
for char in word:
    cleaned_word += char

print(cleaned_word)
