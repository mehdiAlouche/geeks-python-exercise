// 1. normal function
function mergeWords(word) {
    return function(...args) {
        if (args.length === 0) {
            return word;
        } else {
            const nextWord = args[0];
            return mergeWords(word + ' ' + nextWord);
        }
    };
}

//3 currying function
const mergeWords = (string) => (nextString) => 
    nextString === undefined ? string : mergeWords(string + ' ' + nextString);

// Test the function
console.log(mergeWords('Hello')()); //  return 'Hello'
console.log(mergeWords('There')('is')('no')('spoon.')()); //  return 'There is no spoon.'