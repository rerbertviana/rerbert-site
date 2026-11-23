import { defaultLocale, isLocale, locales } from "@/shared/i18n/config";

describe("i18n config", () => {
  describe("locales", () => {
    it("should contain the supported locales", () => {
      expect(locales).toEqual(["en", "pt-BR"]);
    });
  });

  describe("defaultLocale", () => {
    it("should be English", () => {
      expect(defaultLocale).toBe("en");
    });
  });

  describe("isLocale", () => {
    it("should return true for English", () => {
      expect(isLocale("en")).toBe(true);
    });

    it("should return true for Brazilian Portuguese", () => {
      expect(isLocale("pt-BR")).toBe(true);
    });

    it("should return false for unsupported locales", () => {
      expect(isLocale("es")).toBe(false);
      expect(isLocale("fr")).toBe(false);
      expect(isLocale("pt")).toBe(false);
    });

    it("should return false for an empty string", () => {
      expect(isLocale("")).toBe(false);
    });

    it("should be case-sensitive", () => {
      expect(isLocale("EN")).toBe(false);
      expect(isLocale("pt-br")).toBe(false);
      expect(isLocale("PT-BR")).toBe(false);
    });
  });
});
