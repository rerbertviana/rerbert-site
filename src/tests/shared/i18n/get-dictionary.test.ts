import { getDictionary } from "@/shared/i18n/get-dictionary";
import { dictionaries } from "@/shared/i18n/dictionaries";

describe("getDictionary", () => {
  it("should return the English dictionary", () => {
    const result = getDictionary("en");

    expect(result).toBe(dictionaries.en);
  });

  it("should return the Brazilian Portuguese dictionary", () => {
    const result = getDictionary("pt-BR");

    expect(result).toBe(dictionaries["pt-BR"]);
  });

  it("should return the dictionary associated with the requested locale", () => {
    const locales = Object.keys(dictionaries) as Array<
      keyof typeof dictionaries
    >;

    locales.forEach((locale) => {
      expect(getDictionary(locale)).toBe(dictionaries[locale]);
    });
  });
});
