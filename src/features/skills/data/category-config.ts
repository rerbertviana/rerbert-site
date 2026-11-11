import {
  Braces,
  Code2,
  Database,
  FlaskConical,
  GitBranch,
  Layers3,
  Palette,
  Sparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import type { SkillCategoryId } from "@/shared/types/skills";

export const SKILL_CATEGORY_ICONS: Record<SkillCategoryId, LucideIcon> = {
  "frameworks-libraries": Code2,
  "languages-core": Braces,
  "state-management": Layers3,
  "apis-data-fetching": Database,
  "testing-quality": FlaskConical,
  "databases-infrastructure": GitBranch,
  "methodologies-workflow": Palette,
  "devops-collaboration-ai": Sparkles,
};
