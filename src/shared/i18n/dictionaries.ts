import en from "./dictionaries/en";
import ptBR from "./dictionaries/pt-BR";

import type { Locale } from "./config";
import type { Dictionary } from "./types";

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  "pt-BR": ptBR,
};
