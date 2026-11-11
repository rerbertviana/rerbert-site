"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent, MouseEvent } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";

import type { LucideIcon } from "lucide-react";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import type { SkillCategoryId } from "@/shared/types/skills";

import { SKILL_CATEGORY_ICONS } from "../../data/category-config";

const SWIPE_THRESHOLD = 45;
const MOBILE_BREAKPOINT = 1024;

type NavigationDirection = "next" | "previous";

interface CategoryItem {
  id: SkillCategoryId;
  icon: LucideIcon;
}

interface CategoryNavigationProps {
  selectedCategoryId: SkillCategoryId;
  onCategoryChange: (categoryId: SkillCategoryId) => void;
}

const CATEGORIES: CategoryItem[] = Object.entries(SKILL_CATEGORY_ICONS).map(
  ([id, icon]) => ({
    id: id as SkillCategoryId,
    icon,
  }),
);

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.isContentEditable ||
    Boolean(target.closest('input, textarea, select, [role="textbox"]'))
  );
}

function getVisibleCount(width: number) {
  if (width >= 1536) return 8;
  if (width >= 1280) return 7;
  if (width >= 1024) return 5;

  return 3;
}

export function View({
  selectedCategoryId,
  onCategoryChange,
}: CategoryNavigationProps) {
  const { dictionary } = useLanguage();

  const [visibleCount, setVisibleCount] = useState(3);
  const [isMobile, setIsMobile] = useState(true);

  const pointerStartX = useRef<number | null>(null);
  const suppressClick = useRef(false);

  const activeIndex = Math.max(
    0,
    CATEGORIES.findIndex((category) => category.id === selectedCategoryId),
  );

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;

      setVisibleCount(getVisibleCount(width));
      setIsMobile(width < MOBILE_BREAKPOINT);
    };

    updateViewport();

    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const visibleCategories = isMobile
    ? Array.from({ length: visibleCount }, (_, index) => {
        const half = Math.floor(visibleCount / 2);

        const categoryIndex =
          (activeIndex - half + index + CATEGORIES.length) % CATEGORIES.length;

        return CATEGORIES[categoryIndex];
      })
    : Array.from({ length: visibleCount }, (_, index) => {
        const startIndex = Math.min(
          Math.max(0, activeIndex - visibleCount + 1),
          CATEGORIES.length - visibleCount,
        );

        const categoryIndex = startIndex + index;

        return CATEGORIES[categoryIndex];
      });

  const handleNavigation = useCallback(
    (direction: NavigationDirection) => {
      const nextIndex =
        direction === "previous"
          ? (activeIndex - 1 + CATEGORIES.length) % CATEGORIES.length
          : (activeIndex + 1) % CATEGORIES.length;

      onCategoryChange(CATEGORIES[nextIndex].id);
    },
    [activeIndex, onCategoryChange],
  );

  const handlePrevious = useCallback(() => {
    handleNavigation("previous");
  }, [handleNavigation]);

  const handleNext = useCallback(() => {
    handleNavigation("next");
  }, [handleNavigation]);

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

      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else {
        handleNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrevious, handleNext]);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!event.isPrimary) return;

      pointerStartX.current = event.clientX;
      suppressClick.current = false;
    },
    [],
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (pointerStartX.current === null) return;

      const distance = event.clientX - pointerStartX.current;

      pointerStartX.current = null;

      if (Math.abs(distance) < SWIPE_THRESHOLD) return;

      suppressClick.current = true;

      if (distance < 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    },
    [handleNext, handlePrevious],
  );

  const handlePointerCancel = useCallback(() => {
    pointerStartX.current = null;
    suppressClick.current = false;
  }, []);

  const handleClickCapture = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!suppressClick.current) return;

      event.preventDefault();
      event.stopPropagation();

      suppressClick.current = false;
    },
    [],
  );

  const renderCategoryCard = (category: CategoryItem, isSelected: boolean) => {
    const Icon = category.icon;

    return (
      <button
        key={category.id}
        type="button"
        data-category-id={category.id}
        aria-pressed={isSelected}
        onClick={() => onCategoryChange(category.id)}
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
          className={isSelected ? "text-[#80FF00]" : "text-white"}
        />

        <span className="max-w-full text-center font-[family-name:var(--font-oxanium)] text-[10px] font-semibold leading-tight text-white">
          {dictionary.skills.categories[category.id]}
        </span>
      </button>
    );
  };

  return (
    <section
      aria-label={dictionary.skills.categoryNavigationLabel}
      className="
        relative mx-auto flex w-full min-w-0 max-w-[1080px]
        box-border items-center justify-center
        gap-1 px-2 sm:gap-3 sm:px-4
      "
    >
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
          key={`${selectedCategoryId}-${visibleCount}-${isMobile}`}
          className="
            flex min-w-0 items-center justify-center
            gap-2 overflow-hidden py-3
          "
        >
          {visibleCategories.map((category) =>
            renderCategoryCard(category, category.id === selectedCategoryId),
          )}
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
