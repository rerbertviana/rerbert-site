import {
  Braces,
  Blocks,
  Webhook,
  FlaskConical,
  Database,
  Layers3,
  Workflow,
  GitBranch,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import type { SkillCategoryId } from "@/shared/types/skills";

export const SKILL_CATEGORY_ICONS: Record<SkillCategoryId, LucideIcon> = {
  "frameworks-libraries": Blocks,
  "languages-core": Braces,
  "state-management": Layers3,
  "apis-data-fetching": Webhook,
  "testing-quality": FlaskConical,
  "databases-infrastructure": Database,
  "methodologies-workflow": Workflow,
  "devops-collaboration-ai": GitBranch,
};
