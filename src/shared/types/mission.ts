export type MissionLocale = "en" | "pt-BR";

export interface MissionLocalizedContent {
  role: string;
  overview: string;
  responsibilities: string[];
}

export interface Mission {
  id: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  technologies: string[];
  content: Record<MissionLocale, MissionLocalizedContent>;
}
