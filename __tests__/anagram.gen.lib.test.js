const Anagram = require("../libs/anagram.gen.lib");

const dic = [
  "automat",
  "automta",
  "atuomta",
  "abas",
  "abase",
  "abased",
  "abasedly",
  "abasement",
  "abasements",
  "Characteristics",
  "Charms",
  "Cherish",
  "Children",
  "Collaborate",
  "Comfort",
  "Craft",
  "Crafter",
  "Culture",
  "Quality",
  "Quantity",
  "Victorian",
  "Vintage",
  "Volunteer",
  "automatic",
  "auto",
  "abatable",
  "abate",
  "abated",
  "abatement",
  "abatements",
  "abater",
  "abaters",
  "abates",
  "abating",
  "abatis",
  null,
  "",
  "abatises",
  "abator",
  "atmuota"
];

describe("Tests using personalized dic", () => {
  const anagram = Anagram(dic);

  test("It should find a single match", () => {
    expect(anagram.find({ word: "Vintages" })).toStrictEqual(["Vintage"]);
  });

  test("It should find 4 matches of same size", () => {
    expect(
      anagram.find({ word: "automatic", excludeSelf: true, onlyLargests: true })
    ).toStrictEqual(["automat", "automta", "atuomta", "atmuota"]);
  });

  test("It should not return the original word", () => {
    expect(
      anagram.find({ word: "automatic", excludeSelf: true })
    ).toStrictEqual(["auto", "automat", "automta", "atuomta", "atmuota"]);
  });

  test("It should not be case sensitivity", () => {
    expect(anagram.find({ word: "CRAFTERIES" })).toStrictEqual([
      "Craft",
      "Crafter"
    ]);
  });

  test("It should return null when the dictionary is not valid ", () => {
    expect(Anagram()).toBeNull();
    expect(Anagram(null)).toBeNull();
    expect(Anagram("")).toBeNull();
  });

  test("It should find all 4 matches including the original word", () => {
    expect(anagram.find({ word: "abasements" })).toStrictEqual([
      "abas",
      "abase",
      "abasement",
      "abasements"
    ]);
  });

  test("It should find 3 matches excluding the original word", () => {
    expect(
      anagram.find({ word: "abasements", excludeSelf: true })
    ).toStrictEqual(["abas", "abase", "abasement"]);
  });

  test("It should find 1 match excluding the original word", () => {
    expect(
      anagram.find({
        word: "abasements",
        excludeSelf: true,
        onlyLargests: true
      })
    ).toStrictEqual(["abasement"]);
  });

  test("It should find 1 match including the original word", () => {
    expect(
      anagram.find({
        word: "abasements",
        onlyLargests: true
      })
    ).toStrictEqual(["abasements"]);
  });

  test("It should return a empty array when no matches are found", () => {
    expect(anagram.find({ word: "pzpddd" })).toStrictEqual([]);
  });

  test("It should be consistent", () => {
    expect(anagram.find({ word: "abatements" })).toStrictEqual([
      "abate",
      "abatement",
      "abatements"
    ]);
    expect(anagram.find({ word: "abatements" })).toStrictEqual([
      "abate",
      "abatement",
      "abatements"
    ]);
    expect(anagram.find({ word: "abated" })).toStrictEqual(["abate", "abated"]);
  });
});

describe("Tests comparing words", () => {
  const anagram = Anagram(dic);

  test("It should return true for anagrams ", () => {
    expect(anagram.compare("abat", "taba")).toBeTruthy();
  });

  test("It should accept repeating the words", () => {
    expect(anagram.compare("aba", "aba")).toBeTruthy();
  });

  test("It should return false when words does not have the same lenght", () => {
    expect(anagram.compare("aba", "abatt")).toBeFalsy();
  });

  test("It should return false when it is not an anagram", () => {
    expect(anagram.compare("aba", "cba")).toBeFalsy();
  });
});
