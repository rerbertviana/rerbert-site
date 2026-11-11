import { SKILLS_BY_ID } from "@/shared/data/skills";

const PROFILE_SKILL_IDS = [
  "react",
  "typescript",
  "nextjs",
  "tailwindcss",
  "nodejs",
  "expressjs",
  "postgresql",
  "docker",
] as const;

export const SKILLS = PROFILE_SKILL_IDS.map((id) => SKILLS_BY_ID[id]);

export const MOBILE_SKILLS_LIMIT = 6;
