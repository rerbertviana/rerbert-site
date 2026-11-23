import { dictionaries } from "@/shared/i18n/dictionaries";

import en from "@/shared/i18n/dictionaries/en";
import ptBR from "@/shared/i18n/dictionaries/pt-BR";

describe("dictionaries", () => {
  describe("Dictionary registration", () => {
    it("should register the English dictionary", () => {
      expect(dictionaries.en).toBe(en);
    });

    it("should register the Brazilian Portuguese dictionary", () => {
      expect(dictionaries["pt-BR"]).toBe(ptBR);
    });

    it("should register all supported locales", () => {
      expect(Object.keys(dictionaries)).toEqual(["en", "pt-BR"]);
    });
  });

  describe("Dictionary integrity", () => {
    it("should not contain undefined dictionaries", () => {
      Object.values(dictionaries).forEach((dictionary) => {
        expect(dictionary).toBeDefined();
      });
    });

    it("should contain the English and Portuguese dictionaries", () => {
      expect(dictionaries.en).toBeDefined();
      expect(dictionaries["pt-BR"]).toBeDefined();
    });
  });
});
