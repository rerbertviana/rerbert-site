import { getCharacterTranslation } from "@/features/character-selection/utils/getCharacterTranslation";

type CharacterTranslations = Parameters<typeof getCharacterTranslation>[2];

const translations: CharacterTranslations = {
  rerbert: {
    role: "Frontend Developer",
    seniority: "Senior",
    education: "Information Systems",
    experience: "6 years of experience",
  },
  locked: {
    name: "Locked Character",
    role: "Unavailable",
  },
};

describe("getCharacterTranslation", () => {
  it("should return the translations for rerbert", () => {
    const result = getCharacterTranslation("rerbert", "Rerbert", translations);

    expect(result).toEqual({
      name: "Rerbert",
      role: translations.rerbert.role,
      seniority: translations.rerbert.seniority,
      education: translations.rerbert.education,
      experience: translations.rerbert.experience,
    });
  });

  it("should use the fallback name for rerbert", () => {
    const fallbackName = "Custom Name";

    const result = getCharacterTranslation(
      "rerbert",
      fallbackName,
      translations,
    );

    expect(result.name).toBe(fallbackName);
  });

  it("should return locked character translations for other character IDs", () => {
    const result = getCharacterTranslation(
      "other-character",
      "Other Character",
      translations,
    );

    expect(result).toEqual({
      name: translations.locked.name,
      role: translations.locked.role,
      seniority: undefined,
      education: undefined,
      experience: undefined,
    });
  });

  it("should return undefined profile fields for locked characters", () => {
    const result = getCharacterTranslation(
      "unknown-character",
      "Unknown Character",
      translations,
    );

    expect(result.seniority).toBeUndefined();
    expect(result.education).toBeUndefined();
    expect(result.experience).toBeUndefined();
  });
});
