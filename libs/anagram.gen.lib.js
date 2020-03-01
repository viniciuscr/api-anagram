/**
 * Find all anagrams for a given word list
 * NOTE: it converts specials characters to the closest simple one ( é -> e, ç -> c, á ->a )
 * @param {Array.<string>} dictionary - the word list to search for words to compare.
 */
const Anagram = dictionary => {
  if (!Array.isArray(dictionary) || dictionary.length < 1) return null;

  let dic = new Map();

  const normalize = word =>
    word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const sortWord = word =>
    normalize(word)
      .toLowerCase()
      .split("")
      .sort()
      .join("");

  dictionary.forEach(word => {
    if (word) {
      const sortedWord = sortWord(word);
      const savedWord = dic.get(sortedWord);

      dic.set(
        sortedWord,
        savedWord && savedWord.length > 0 ? [...savedWord, word] : [word]
      );
    }
  });

  /**
   * @typedef {Object} FindParams
   * @property {string} word word to check
   * @property {boolean} [excludeSelf=false] - true if should not return the original word
   * @property {boolean} [onlyLargests=false] - true if it should return the longests matches
   */
  /**
   * Checks if there are any anagram on the word list using the given word
   *@param {FindParams} findparams { word, excludeSelf, onlyLargests }
   *@returns {Array.<string>}  list of anagrams found on the current dictionary
   */
  const find = ({ word, onlyLargests = false, excludeSelf = false }) => {
    let sortedWord = sortWord(word);
    let wordList = [];

    for (let length = sortedWord.length - 1; length >= -1; length--) {
      sortedWord = sortWord(word.slice(0, ~length + 1 || undefined));
      const match =
        sortedWord.length === word.length && excludeSelf
          ? dic.get(sortedWord).filter(w => w !== word)
          : dic.get(sortedWord);

      if (match && match.length > 0) {
        if (onlyLargests) {
          if (wordList[0] && match[0].length < wordList[0].length) continue;
          if (wordList[0] && match[0].length > wordList[0].length) wordList = [];
        }
        wordList = wordList.concat(match);
      }
    }

    return wordList;
  };
  /**
   * Given two words compare if they are anagrams
   * @param {string} word1 word to compare
   * @param {string} word2 word to be compared with
   * @return {boolean}  true if words are anagrams, otherwise false
   */
  const compare = (word1, word2) =>
    word1.length === word2.length && sortWord(word1) === sortWord(word2);

  return { find, compare };
};

module.exports = Anagram;
