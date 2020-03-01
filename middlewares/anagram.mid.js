const Dictionary = require("../libs/dictionary.lib");
const Anagram = require("../libs/anagram.primes.lib");

/**
 * Hold all endpoints for Anagrams functions
 */
class AnagramMid {
  static checkParam(param) {
    return !param || param.lenght === 0 ? null : param.trim();
  }

  static parseParams(query) {
    const word = AnagramMid.checkParam(query.word);
    const words = [];
    if (!word) {
      const word1 = AnagramMid.checkParam(query.word1);
      const word2 = AnagramMid.checkParam(query.word2);
      words.push(word1, word2);
    }

    const includes = query.includes
      ? JSON.parse(query.includes).map(word => AnagramMid.checkParam(word))
      : null;
    const excludes = query.excludes
      ? JSON.parse(query.excludes).map(word => AnagramMid.checkParam(word))
      : null;
    const language = AnagramMid.checkParam(query.language) || "english";

    return { word, includes, excludes, language, words };
  }
  /**
   * Find only the longest anagrams for a given word
   *
   * @param{ import("express").Request} req
   * @param{ import("express").Response} res
   * @param{ import("express").NextFunction} next
   */
  static findLongest(req, res, next = e => console.log(e)) {
    try {
      const { word, includes, excludes, language } = AnagramMid.parseParams(
        req.query
      );
      const dictionary = new Dictionary()
        .load(language)
        .include(includes)
        .exclude(excludes)
        .wordslist();

      if (!word) {
        res.status(400);
        next(new Error("Word must be a string of lenght 1 or bigger"));
      }

      const anagrams = Anagram(dictionary).find({
        word,
        excludeSelf: true,
        onlyLargests: true
      });

      res.send(anagrams);
    } catch (err) {
      res.status(500);
      next(err);
    }
  }
  /**
   * Find all anagrams for a given word
   * @param{ import("express").Request} req
   * @param{ import("express").Response} res
   * @param{ import("express").NextFunction} next
   */
  static find(req, res, next = e => console.log(e)) {
    try {
      const { word, includes, excludes, language } = AnagramMid.parseParams(
        req.query
      );

      const dictionary = new Dictionary()
        .load(language)
        .include(includes)
        .exclude(excludes)
        .wordslist();

      if (!word) {
        res.status(400);
        next(new Error("Word must be a string of lenght 1 or bigger"));
      }

      const anagrams = Anagram(dictionary).find({ word, excludeSelf: true });

      res.status(200).send(anagrams);
    } catch (err) {
      res.status(500);
      next(err);
    }
  }
  /**
   * Check if 2 words are anagrams
   * @param{ import("express").Request} req
   * @param{ import("express").Response} res
   * @param{ import("express").NextFunction} next
   */
  static compare(req, res, next = e => console.log(e)) {
    try {
      const [word1, word2] = AnagramMid.parseParams(req.query).words;

      if (!word1 || !word2) {
        res.status(400);
        next(new Error("You must send 2 words [word1 word2]"));
      }

      const anagram = Anagram([""]);

      res.status(200).send(anagram.compare(word1, word2));
    } catch (err) {
      res.status(500);
      next(err);
    }
  }
}
module.exports = AnagramMid;
