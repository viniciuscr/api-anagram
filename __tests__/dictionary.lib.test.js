const Dictionary = require("../libs/dictionary.lib");

describe("Tests with dictionaries", () => {
  test("It should accept add new words to a empty dictionary", () => {
    const words = new Dictionary()
      .include(["abacate", "sorvete", "marmita"])
      .wordslist();

    expect(words).toStrictEqual(["abacate", "sorvete", "marmita"]);
  });

  test("It should accept remove words from a dictionary", () => {
    const words = new Dictionary()
      .include(["abacate", "sorvete", "marmita"])
      .exclude(["sorvete", "marmita"])
      .wordslist();

    expect(words).toStrictEqual(["abacate"]);
  });

  test("It should accept include multiple word lists", () => {
    const words = new Dictionary()
      .include(["abacate", "sorvete", "marmita"])
      .include(["carro", "cavalo"])
      .wordslist();

    expect(words).toStrictEqual([
      "abacate",
      "sorvete",
      "marmita",
      "carro",
      "cavalo"
    ]);
  });
});
