"use client";

import { useState } from "react";

import { View as BackButton } from "@/shared/components/navigation/back-button/View";
import { SKILL_CATEGORIES } from "@/shared/data/skills";
import type { SkillCategoryId } from "@/shared/types/skills";
import { useLanguage } from "@/shared/i18n/LanguageProvider";

import { View as CategoryHeader } from "../components/category-header/View";
import { View as CategoryNavigation } from "../components/category-navigation/View";
import { View as SkillsGrid } from "../components/skills-grid/View";
import { View as SkillsTitle } from "../components/skills-title/View";

export function View() {
  const { locale } = useLanguage();

  const [selectedCategoryId, setSelectedCategoryId] = useState<SkillCategoryId>(
    "frameworks-libraries",
  );

  const selectedCategory = SKILL_CATEGORIES.find(
    (category) => category.id === selectedCategoryId,
  );

  if (!selectedCategory) return null;

  const backButtonLabel =
    locale === "pt-BR" ? "VOLTAR AO PERFIL" : "BACK TO PROFILE";

  return (
    <main aria-label="Skills" className="flex w-full flex-1 flex-col">
      <SkillsTitle />

      {/* Back button */}
      <section className="mx-auto w-full max-w-[1080px] px-4 pt-6">
        <BackButton href="/profile" label={backButtonLabel} />
      </section>

      {/* Category navigation */}
      <section className="mt-0 w-full min-w-0 overflow-x-clip">
        <CategoryNavigation
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
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
  );
}
