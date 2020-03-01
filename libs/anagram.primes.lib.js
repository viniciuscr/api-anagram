/**
 * Find all anagrams for a given word using fundamental theorem of arithmetic.
 * The product of prime numbers is always unique, so calculating all letters as prime number gives a signature for each word.
 * NOTE: it converts specials characters to the closest simple one ( é -> e, ç -> c, á ->a )
 * @param  {Array.<string>} dictionary - the word list so search for words to compare.
 */
const Anagram = dictionary => {
  if (!Array.isArray(dictionary) || dictionary.length < 1) return null;

  const PRIMES = {
    a: 2,
    b: 3,
    c: 5,
    d: 7,
    e: 11,
    f: 13,
    g: 17,
    h: 19,
    i: 23,
    j: 29,
    k: 31,
    l: 37,
    m: 41,
    n: 43,
    o: 47,
    p: 53,
    q: 59,
    r: 61,
    s: 67,
    t: 71,
    u: 73,
    v: 79,
    x: 83,
    y: 89,
    z: 97,
    w: 101
  };

  const normalize = word =>
    word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const calculateHash = word =>
    word
      ? normalize(word)
          .toLowerCase()
          .split("")
          .reduce((prime, c) => prime * PRIMES[c], 1)
      : "";

  let dic = {};

  dictionary.forEach(word => {
    const hash = calculateHash(word);

    if (dic[hash]) {
      dic[hash].push(word);
    } else {
      dic[hash] = [word];
    }

    return dic;
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
    let slicedWord = word.toLowerCase();
    let anagramsList = [];

    let length = word.length;

    const shouldSkip = (match, onlyLargests, list) =>
      match && onlyLargests && list[0] && match.length < list[0].length;

    for (length; length > 0; length--) {
      slicedWord = normalize(word.slice(0, length));
      let match = dic[calculateHash(slicedWord)];

      if (shouldSkip(match, onlyLargests, anagramsList)) continue;

      if (match && excludeSelf) match = match.filter(w => word.localeCompare(w) !== 0);
      if (match) anagramsList = anagramsList.concat(match);
    }

    return anagramsList;
  };
  /**
   * Given two words compare if they are anagrams
   * @param {string} word1 word to compare
   * @param {string} word2 word to be compared with
   * @return {boolean}  true if words are anagrams, otherwise false
   */
  const compare = (word1, word2) =>
    word1.length === word2.length &&
    calculateHash(word1) === calculateHash(word2);

  return { find, compare };
};

module.exports = Anagram;
