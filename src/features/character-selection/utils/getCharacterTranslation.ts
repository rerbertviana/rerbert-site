import type { Dictionary } from "@/shared/i18n/types";

type CharacterTranslations = Dictionary["characterSelection"]["characters"];

export function getCharacterTranslation(
  characterId: string,
  fallbackName: string,
  translations: CharacterTranslations,
) {
  if (characterId === "rerbert") {
    return {
      name: fallbackName,
      role: translations.rerbert.role,
      seniority: translations.rerbert.seniority,
      education: translations.rerbert.education,
      experience: translations.rerbert.experience,
    };
  }

  return {
    name: translations.locked.name,
    role: translations.locked.role,
    seniority: undefined,
    education: undefined,
    experience: undefined,
  };
}
