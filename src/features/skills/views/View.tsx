"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { View as BackButton } from "@/shared/components/navigation/back-button/View";
import { View as DigitalReconstructionEntrance } from "@/shared/components/animations/digital-reconstruction-entrance/View";
import { SKILL_CATEGORIES, SKILL_CATEGORY_IDS } from "@/shared/data/skills";
import type { SkillCategoryId } from "@/shared/types/skills";
import { useLanguage } from "@/shared/i18n/LanguageProvider";

import { View as CategoryHeader } from "../components/category-header/View";
import { View as CategoryNavigation } from "../components/category-navigation/View";
import { View as SkillsGrid } from "../components/skills-grid/View";
import { View as SkillsTitle } from "../components/skills-title/View";

const DEFAULT_CATEGORY: SkillCategoryId = "frameworks-libraries";
const CATEGORY_QUERY_PARAM = "category";

function isSkillCategoryId(value: string | null): value is SkillCategoryId {
  return (
    value !== null &&
    SKILL_CATEGORY_IDS.some((categoryId) => categoryId === value)
  );
}

export function View() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { dictionary } = useLanguage();

  const categoryParam = searchParams.get(CATEGORY_QUERY_PARAM);

  const selectedCategoryId = isSkillCategoryId(categoryParam)
    ? categoryParam
    : DEFAULT_CATEGORY;

  const selectedCategory = SKILL_CATEGORIES.find(
    (category) => category.id === selectedCategoryId,
  );

  function handleCategoryChange(categoryId: SkillCategoryId) {
    const params = new URLSearchParams(searchParams.toString());

    params.set(CATEGORY_QUERY_PARAM, categoryId);

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  if (!selectedCategory) return null;

  return (
    <DigitalReconstructionEntrance>
      <main
        aria-labelledby="skills-title"
        className="flex w-full flex-1 flex-col"
      >
        <SkillsTitle />

        {/* Back button */}
        <section className="mx-auto w-full max-w-[1080px] px-4 pt-6">
          <BackButton href="/profile" label={dictionary.skills.backToProfile} />
        </section>

        {/* Category navigation */}
        <section className="mt-0 w-full min-w-0 overflow-x-clip">
          <CategoryNavigation
            selectedCategoryId={selectedCategoryId}
            onCategoryChange={handleCategoryChange}
          />
        </section>

        {/* Selected category header */}
        <section className="mx-auto mt-6 w-full max-w-[1080px] px-4">
          <CategoryHeader
            categoryId={selectedCategoryId}
            technologiesCount={selectedCategory.skills.length}
          />
        </section>

        {/* Technologies grid */}
        <section className="mx-auto mt-6 w-full max-w-[1080px] px-4 pb-8">
          <SkillsGrid selectedCategoryId={selectedCategoryId} />
        </section>
      </main>
    </DigitalReconstructionEntrance>
  );
}
