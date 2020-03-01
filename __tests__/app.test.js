const request = require("supertest");
const app = require("../app");

global.console = {
  warn: jest.fn(),
  log: jest.fn()
};


describe("GET /find", () => {
  test("it should return a array with 2 matches", () => {
    return request(app)
      .get("/find")
      .set("Accept", "application/json")
      .query({ word: "banana" })
      .then(response => {
        expect(response.text).toMatchSnapshot();
        expect(response.statusCode).toBe(200);
      });
  });

  test("it should return a empty array when there is no matches", () => {
    return request(app)
      .get("/find")
      .set("Accept", "application/json")
      .query({ word: "ppzo" })
      .then(response => {
        expect(response.text).toMatchSnapshot();
        expect(response.statusCode).toBe(200);
      });
  });

  test('it should return a array with 4 matches for "aahed"', () => {
    return request(app)
      .get("/find")
      .set("Accept", "application/json")
      .query({ word: "aahed" })
      .then(response => {
        expect(response.body).toMatchSnapshot();
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("GET /compare", () => {
  test("it should return false when words aren´t anagrams", () => {
    return request(app)
      .get("/compare")
      .query({ word1: "banana", word2: "babab" })
      .then(response => {
        expect(response.text).toBe("false");
        expect(response.statusCode).toBe(200);
      });
  });

  test("it should return true when words are anagrams", () => {
    return request(app)
      .get("/compare")
      .query({ word1: "arbo", word2: "broa" })
      .then(response => {
        expect(response.text).toBe("true");
        expect(response.statusCode).toBe(200);
      });
  });

  test("it should return true when words are anagrams", () => {
    return request(app)
      .get("/compare")
      .query({
        word1: "guarana",
        word2: "guarana"
          .split("")
          .reverse()
          .join("")
      })
      .then(response => {
        expect(response.text).toBe("true");
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("GET /find-longest", () => {
  test("it should return a array with 1 match", () => {
    return request(app)
      .get("/find-longest")
      .set("Accept", "application/json")
      .query({ word: "aahed" })
      .then(response => {
        expect(response.text).toStrictEqual(JSON.stringify(["ahead"]));
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Handling errors", () => {
  test("respond with a 400 when no word is given to /find", () => {
    return request(app)
      .get("/find")
      .then(response => {
        expect(response.error.text).toBe(
          JSON.stringify({
            error: "Word must be a string of lenght 1 or bigger",
            params: {}
          })
          );
          expect(response.statusCode).toBe(400);
      });
  });
  test("respond with a 400 when an empty word is given to /find", () => {
    return request(app)
      .get("/find")
      .query({ word: "" })
      .then(response => {
        expect(response.error.text).toBe(
          JSON.stringify({
            error: "Word must be a string of lenght 1 or bigger",
            params: { word: "" }
          })
          );
          expect(response.statusCode).toBe(400);
        });
  });

  test("respond with a 400 when no params are given to /compare", () => {
    return request(app)
      .get("/compare")
      .then(response => {
        expect(response.error.text).toBe(
          JSON.stringify({
            error: "You must send 2 words [word1 word2]",
            params: {}
          })
          );
          expect(response.statusCode).toBe(400);
      });
  });

  test("respond with a 400 when only one word is given to /compare", () => {
    return request(app)
      .get("/compare")
      .query({ word1: "arbo" })
      .then(response => {
        expect(response.error.text).toBe(
          JSON.stringify({
            error: "You must send 2 words [word1 word2]",
            params: { word1: "arbo" }
          })
          );
          expect(response.statusCode).toBe(400);
      });
  });
});
