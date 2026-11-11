"use client";

import { useState } from "react";

import type { SkillCategoryId } from "@/shared/types/skills";

import { View as CategoryNavigation } from "../components/category-navigation/View";
import { View as SkillsGrid } from "../components/skills-grid/View";
import { View as SkillsTitle } from "../components/skills-title/View";

export function View() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<SkillCategoryId>(
    "frameworks-libraries",
  );

  return (
    <main aria-label="Skills" className="flex w-full flex-1 flex-col">
      <SkillsTitle />

      <section className="mt-8 w-full min-w-0 overflow-x-clip">
        <CategoryNavigation
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
        />
      </section>

      <section className="mx-auto mt-8 w-full max-w-[1080px] px-4 pb-8">
        <SkillsGrid selectedCategoryId={selectedCategoryId} />
      </section>
    </main>
  );
}
