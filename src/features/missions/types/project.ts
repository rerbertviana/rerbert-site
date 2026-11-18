import type { MissionLocale } from "@/shared/types/mission";

export type ProjectStatus = "completed" | "in-progress";

export interface ProjectLocalizedContent {
  description: string;
  highlights: string[];
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  completedAt: string | null;
  image?: string;
  technologies: string[];
  repositoryUrl?: string;
  frontendUrl?: string;
  backendUrl?: string;
  content: Record<MissionLocale, ProjectLocalizedContent>;
}
