const fs = require("fs");

/**
 * @class
 * Manipulate dictionaries[list of words].
 */
class Dictionary {
  constructor() {
    this.language = null;
    this.current = [];
    this.dicList = { english: () => require("word-list") };
  }

  /**
   * Loads a a list of word based on the language given.
   * the language must be a valid one, from the list Dictionary.list()
   * @param {string} language
   */
  load(language) {
    this.language = language;
    const dic = this.dicList[this.language];
    if (!dic) return this;

    this.current = fs.readFileSync(dic(), "utf8").split("\n");
    return this;
  }

  /**
   * Removes a list of word from the current dictionary
   * @param {Array.<string>} words
   */
  exclude(words) {
    if (!this.current || !words) return this;
    this.current = this.current.filter(word => !words.includes(word));
    return this;
  }

  /**
   * Add a list of words to the current dictionary
   * @param {Array.<string>} words
   */
  include(words) {
    if (!words) return this;
    this.current = this.current.concat(words);
    return this;
  }

  /**
   * Return the list of word from the current loaded dictionary
   */
  wordslist() {
    return this.current;
  }

  /**
   * List the name of pre-defined dictionaries
   */
  list() {
    return Object.keys(this.dicList);
  }
}
module.exports = Dictionary;
