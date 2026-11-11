"use client";

import { useState } from "react";

import type { SkillCategoryId } from "@/shared/types/skills";

import { View as SkillsTitle } from "../components/skills-title/View";
import { View as CategoryNavigation } from "../components/category-navigation/View";

export function View() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<SkillCategoryId>(
    "frameworks-libraries",
  );

  return (
    <main
      aria-label="Skills"
      className="flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-x-clip"
    >
      <SkillsTitle />

      <section className="mt-8 w-full min-w-0 overflow-x-clip">
        <CategoryNavigation
          selectedCategoryId={selectedCategoryId}
          onCategoryChange={setSelectedCategoryId}
        />
      </section>
    </main>
  );
}
