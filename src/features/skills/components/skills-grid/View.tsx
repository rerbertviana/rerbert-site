import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { SKILL_CATEGORIES } from "@/shared/data/skills";
import type { SkillCategoryId } from "@/shared/types/skills";

import { View as SkillCard } from "../skill-card/View";

interface SkillsGridProps {
  selectedCategoryId: SkillCategoryId;
}

export function View({ selectedCategoryId }: SkillsGridProps) {
  const { dictionary } = useLanguage();

  const selectedCategory = SKILL_CATEGORIES.find(
    (category) => category.id === selectedCategoryId,
  );

  if (!selectedCategory) return null;

  return (
    <section
      aria-label={dictionary.skills.technologiesLabel}
      className="
        grid w-full min-w-0
        grid-cols-1 content-start gap-3
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      "
    >
      {selectedCategory.skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </section>
  );
}
