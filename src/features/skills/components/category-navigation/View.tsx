"use client";

import { useCallback, useEffect } from "react";
import type { LucideIcon } from "lucide-react";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { playSound } from "@/shared/lib/audio/audioManager";
import type { SkillCategoryId } from "@/shared/types/skills";

import { SKILL_CATEGORY_ICONS } from "../../data/category-config";

interface Props {
  selectedCategoryId: SkillCategoryId;
  onCategoryChange: (categoryId: SkillCategoryId) => void;
}

interface CategoryItem {
  id: SkillCategoryId;
  icon: LucideIcon;
}

const CATEGORIES: CategoryItem[] = Object.entries(SKILL_CATEGORY_ICONS).map(
  ([id, icon]) => ({
    id: id as SkillCategoryId,
    icon,
  }),
);

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    Boolean(target.closest('input, textarea, select, [role="textbox"]'))
  );
}

export function View({ selectedCategoryId, onCategoryChange }: Props) {
  const { dictionary } = useLanguage();

  const handleSelectCategory = useCallback(
    (categoryId: SkillCategoryId) => {
      if (categoryId === selectedCategoryId) {
        return;
      }

      playSound("characterNavigation");
      onCategoryChange(categoryId);
    },
    [selectedCategoryId, onCategoryChange],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        isEditableTarget(event.target)
      ) {
        return;
      }

      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
      }

      event.preventDefault();

      const currentIndex = CATEGORIES.findIndex(
        (category) => category.id === selectedCategoryId,
      );

      const nextIndex =
        event.key === "ArrowLeft"
          ? (currentIndex - 1 + CATEGORIES.length) % CATEGORIES.length
          : (currentIndex + 1) % CATEGORIES.length;

      handleSelectCategory(CATEGORIES[nextIndex].id);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCategoryId, handleSelectCategory]);

  return (
    <section
      aria-label={dictionary.skills.categoryNavigationLabel}
      className="
        mx-auto grid w-full max-w-[1080px]
        grid-cols-4 gap-2 px-4
        sm:grid-cols-8 sm:gap-3
      "
    >
      {CATEGORIES.map((category) => {
        const isSelected = category.id === selectedCategoryId;
        const Icon = category.icon;

        return (
          <button
            key={category.id}
            type="button"
            data-category-id={category.id}
            aria-pressed={isSelected}
            onClick={() => handleSelectCategory(category.id)}
            className={`
              relative flex h-[88px] w-full min-w-0
              cursor-pointer flex-col items-center justify-center gap-2
              rounded-xl border-2 px-1 sm:px-2
              transition-all duration-300 ease-out
              hover:z-20 hover:scale-[1.04]
              focus-visible:outline-none
              focus-visible:ring-1
              focus-visible:ring-[#A78BFA]
              ${
                isSelected
                  ? "z-10 scale-[1.03] border-[#A78BFA] bg-[#A78BFA]/[0.06]"
                  : "border-[#A78BFA]/35 bg-[#171326]/80 hover:border-[#A78BFA]/80 hover:bg-[#211832]"
              }
            `}
          >
            <Icon
              size={21}
              strokeWidth={1.7}
              aria-hidden="true"
              className={isSelected ? "text-[#A78BFA]" : "text-white"}
            />

            <span
              className="
                max-w-full text-center
                font-[family-name:var(--font-oxanium)]
                text-[9px] font-semibold leading-tight text-white
                sm:text-[10px]
              "
            >
              {dictionary.skills.categories[category.id]}
            </span>
          </button>
        );
      })}
    </section>
  );
}
