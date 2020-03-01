const express = require("express");
const app = express();
const ErrorHandler = require("./middlewares/ErrorHandler.mid");
const Anagram = require("./middlewares/anagram.mid");

/**
 * @api {get} /find Find Anagrams
 * @apiName FindAnagrams
 * @apiDescription This endpoint will find all anagrams in the dictionary based on the string sent
 * @apiGroup Anagram
 * @apiParam (query) {String} word
 * @apiExample {curl} Example usage:
 *   curl -X GET -H "Content-Type: application/json" http://localhost:3001/find?word=test
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *      "word1",
 *      "word2",
 *      "word3"
 *   ]
 */
app.get("/find", Anagram.find);

/**
 * @api {get} /find-longest Find only the longests Anagrams
 * @apiName FindLogestsAnagrams
 * @apiDescription This endpoint will find anagrams with the longest size in the dictionary based on the string sent
 * @apiGroup Anagram
 *
 * @apiParam (query) {String} word
 *
 * @apiExample {curl} Example usage:
 *   curl -X GET -H "Content-Type: application/json" http://localhost:3001/find?word=test
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   [
 *      "word1",
 *      "word2",
 *      "word3"
 *   ]
 */
app.get("/find-longest", Anagram.findLongest);

/**
 * @api {get} /compare Compare Anagrams
 * @apiName CompareAnagrams
 * @apiDescription This endpoint will receive two words, and compare them to see if they are anagrams
 * @apiGroup Anagram
 *
 * @apiParam (query) {String} word1
 * @apiParam (query) {String} word2
 *
 * @apiExample {curl} Example usage:
 *   curl -X GET -H "Content-Type: application/json" http://localhost:3001/compare?word1=test&word2=tset
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 *   false
 */
app.get("/compare", Anagram.compare);

app.use(ErrorHandler);

module.exports = app;
