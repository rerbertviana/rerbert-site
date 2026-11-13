"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useController, type CategoryNavigationProps } from "./useController";

export function View({
  selectedCategoryId,
  onCategoryChange,
}: CategoryNavigationProps) {
  const { dictionary } = useLanguage();

  const {
    visibleCategories,
    handleSelectCategory,
    handlePrevious,
    handleNext,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
    handleClickCapture,
  } = useController({
    selectedCategoryId,
    onCategoryChange,
  });

  return (
    <section
      aria-label={dictionary.skills.categoryNavigationLabel}
      className="
        relative mx-auto flex w-full min-w-0 max-w-[1080px]
        box-border items-center justify-center
        gap-1 px-2 sm:gap-3 sm:px-4
      "
    >
      {/* Selected category icon gradient */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <linearGradient
            id="category-icon-gradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="45%" stopColor="#A855F7" />
            <stop offset="65%" stopColor="#80FF00" />
            <stop offset="100%" stopColor="#80FF00" />
          </linearGradient>
        </defs>
      </svg>

      {/* Previous */}
      <button
        type="button"
        aria-label="Previous category"
        onClick={handlePrevious}
        className="
          flex size-8 shrink-0 cursor-pointer items-center justify-center
          text-white/60 transition-colors duration-300
          hover:text-[#80FF00]
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-[#80FF00]
          sm:size-10
        "
      >
        <ChevronLeft aria-hidden="true" className="size-6 sm:size-8" />
      </button>

      {/* Carousel viewport */}
      <div
        className="relative min-w-0 flex-1 overflow-hidden touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClickCapture={handleClickCapture}
      >
        <div
          key={`${selectedCategoryId}-${visibleCategories.length}`}
          className="
            flex min-w-0 items-center justify-center
            gap-2 overflow-hidden py-3
          "
        >
          {visibleCategories.map((category) => {
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
                  relative flex h-[88px] w-[108px] shrink-0
                  cursor-pointer flex-col items-center justify-center gap-2
                  rounded-xl border px-2
                  origin-center
                  transition-all duration-300 ease-out
                  hover:z-20 hover:scale-[1.06]
                  focus-visible:outline-none
                  focus-visible:ring-1
                  focus-visible:ring-[#80FF00]
                  ${
                    isSelected
                      ? "z-10 scale-[1.03] border-[#80FF00] bg-[#80FF00]/[0.06]"
                      : "border-[#A78BFA]/25 bg-[#171326]/80 hover:border-[#A78BFA]/70 hover:bg-[#211832]"
                  }
                `}
              >
                <Icon
                  size={21}
                  strokeWidth={1.7}
                  aria-hidden="true"
                  stroke={
                    isSelected ? "url(#category-icon-gradient)" : "currentColor"
                  }
                  className={isSelected ? "text-[#80FF00]" : "text-white"}
                />

                <span className="max-w-full text-center font-[family-name:var(--font-oxanium)] text-[10px] font-semibold leading-tight text-white">
                  {dictionary.skills.categories[category.id]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Next */}
      <button
        type="button"
        aria-label="Next category"
        onClick={handleNext}
        className="
          flex size-8 shrink-0 cursor-pointer items-center justify-center
          text-white/60 transition-colors duration-300
          hover:text-[#80FF00]
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-[#80FF00]
          sm:size-10
        "
      >
        <ChevronRight aria-hidden="true" className="size-6 sm:size-8" />
      </button>
    </section>
  );
}
