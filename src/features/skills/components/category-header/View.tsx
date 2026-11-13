"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import type { SkillCategoryId } from "@/shared/types/skills";

import { SKILL_CATEGORY_ICONS } from "../../data/category-config";

interface CategoryHeaderProps {
  categoryId: SkillCategoryId;
  technologiesCount: number;
}

export function View({ categoryId, technologiesCount }: CategoryHeaderProps) {
  const { dictionary } = useLanguage();

  const Icon = SKILL_CATEGORY_ICONS[categoryId];
  const details = dictionary.skills.categoryDetails[categoryId];

  const [firstWord, ...remainingWords] = details.title.split(" ");

  return (
    <header className="flex w-full min-w-0 items-center gap-3 sm:gap-4">
      {/* Category icon */}
      <div
        className="
          flex size-12 shrink-0 items-center justify-center
          rounded-xl border border-[#A78BFA]/70
          bg-[#100C24]/80
          sm:size-14
        "
      >
        <Icon
          size={30}
          strokeWidth={1.7}
          aria-hidden="true"
          className="text-white"
        />
      </div>

      {/* Category information */}
      <div className="min-w-0 flex-1">
        <h2
          className="
            truncate font-[family-name:var(--font-oxanium)]
            text-base font-bold uppercase
            sm:text-xl
          "
        >
          <span className="text-[#B77AFF]">{firstWord}</span>

          {remainingWords.length > 0 && (
            <span className="text-white"> {remainingWords.join(" ")}</span>
          )}
        </h2>

        <p
          className="
            mt-1 text-xs leading-relaxed text-white/70
            sm:text-sm lg:whitespace-nowrap
          "
        >
          {details.description}
        </p>
      </div>

      {/* Technology count */}
      <div
        className="
          hidden shrink-0 flex-col items-center justify-center
          rounded-lg border border-[#A78BFA]/40
          bg-[#100C24]/70 px-2 py-2
          font-[family-name:var(--font-oxanium)]
          text-white
          sm:flex sm:min-w-[132px] sm:px-4
        "
      >
        <span className="text-base font-bold leading-none sm:text-lg">
          {technologiesCount}
        </span>

        <span className="mt-1 text-[8px] font-bold uppercase tracking-wider sm:text-[10px]">
          {dictionary.skills.technologiesLabel}
        </span>
      </div>
    </header>
  );
}
