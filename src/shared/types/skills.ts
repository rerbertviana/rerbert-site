export type SkillCategoryId =
  | "frameworks-libraries"
  | "languages-core"
  | "state-management"
  | "apis-data-fetching"
  | "testing-quality"
  | "databases-infrastructure"
  | "methodologies-workflow"
  | "devops-collaboration-ai";

export type ProficiencyLevel = "basic" | "intermediate" | "advanced";

export interface Skill {
  id: string;
  name: string;
  image: string;
  proficiency: ProficiencyLevel;
}

export interface SkillCategory {
  id: SkillCategoryId;
  skills: Skill[];
}
