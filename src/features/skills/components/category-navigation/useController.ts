"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";

import type { LucideIcon } from "lucide-react";

import { playSound } from "@/shared/lib/audio/audioManager";
import type { SkillCategoryId } from "@/shared/types/skills";

import { SKILL_CATEGORY_ICONS } from "../../data/category-config";

const SWIPE_THRESHOLD = 45;
const MOBILE_BREAKPOINT = 1024;

type NavigationDirection = "next" | "previous";

interface CategoryItem {
  id: SkillCategoryId;
  icon: LucideIcon;
}

export interface CategoryNavigationProps {
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

export function useController({
  selectedCategoryId,
  onCategoryChange,
}: CategoryNavigationProps) {
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

  const handleSelectCategory = useCallback(
    (categoryId: SkillCategoryId) => {
      if (categoryId === selectedCategoryId) return;

      playSound("characterNavigation");
      onCategoryChange(categoryId);
    },
    [selectedCategoryId, onCategoryChange],
  );

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

      handleSelectCategory(CATEGORIES[nextIndex].id);
    },
    [activeIndex, handleSelectCategory],
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

  return {
    visibleCategories,
    handleSelectCategory,
    handlePrevious,
    handleNext,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
    handleClickCapture,
  };
}
