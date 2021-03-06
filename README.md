# API to work with anagrams.

> This is a old challenge that I've restored from a old repo.

:recycle: **Port to lambda function**: I have add a new folder "/api" to serve the endpoints as lambdas functions.

:warning: This is not a production ready project and it should not be used as base for one.

It was given a startup project with the expected endpoints using expressjs:

1. `/find`: receives a word and return all anagrams found on a preset dictionary.
    - https://api-anagram.now.sh/api/find?word=armored
2. `/find-longest`: receives a word and return only the longest anagrams found on a preset dictionary
    - https://api-anagram.now.sh/api/findLongest?word=armored
3. `/compare`: receives 2 word and return `true` or `false` if they are anagrams.
    - https://api-anagram.now.sh/api/find?word1=armored&word2=remora

The default dictionary to look for anagram should be the npm package [word-list](https://www.npmjs.com/package/word-list).

The trick part is that a given word should return all possible anagrams that could be made using part of the given word. This means that if the word `monolithics` was demanded to return anagrams from a dictionary with the words `monolithics`, `monolithic` and `mono` in it, all three words should be returned.

## Extra Challenges:

1. Add an extra param `language` where it should be a language that defines the dictionary to use, such as *english* or *french* default is *english*.
2. Add an extra param `includes` where it should be a list of word to _include_ on the current dictionary.
3. Add a extra param `excludes` where it should be a list of word to _exclude_ from the current dictionary
4. Give the option to not include the original word on the returned array.

## Solution

I end up coming with 2 similar solutions to the anagram problem, both are similar and both look for performance sacrificing memory, since both loads the entire dictionary in memory.

Both solutions creates a Map where groups all words inside the dictionary that are anagrams. This way when I look for anagrams for a given word I will get all possible anagrams for the given word at once.

The difference from each solution is that the first one sorts the letters and use it as key to the map, while the second one converts the letters to prime numbers and then multiplies the letters, generating a unique number for each word that's used as key on the map.

The solution with prime numbers should be slightly faster then the sorting letters one, because working with numbers should be faster then working with strings.

## Project structure
- **app.js** -> setups expressjs endpoints
- **index.js** -> serves express on port *3001*
- **libs/dictionary.lib** -> deals with the dictionary, it can receive a dictionary, add or remove word from it
- **libs/anagram.gen.lib** -> anagram solution implementing by sorting the words
- **anagram.prime.lib** -> anagram solution implementing by using prime numbers
- **middleware/anagram.mid** an expressjs middleware to handle the APIs call
- **middleware/ErrorHandler.mid** an express middleware to handle errors
