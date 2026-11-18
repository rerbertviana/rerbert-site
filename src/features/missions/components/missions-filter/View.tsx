"use client";

import { useCallback, useEffect } from "react";
import {
  LayoutGrid,
  BriefcaseBusiness,
  Code,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { playSound } from "@/shared/lib/audio/audioManager";

import type { MissionFilter } from "../../types/timeline";

interface Props {
  selectedFilter: MissionFilter;
  onFilterChange: (filter: MissionFilter) => void;
}

const FILTER_ORDER: MissionFilter[] = ["all", "experience", "project"];

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return (
    target.isContentEditable ||
    Boolean(target.closest('input, textarea, select, [role="textbox"]'))
  );
}

export function View({ selectedFilter, onFilterChange }: Props) {
  const { dictionary } = useLanguage();
  const content = dictionary.missions.filters;

  const filters = [
    {
      id: "all",
      label: content.all,
      icon: LayoutGrid,
    },
    {
      id: "experience",
      label: content.experience,
      icon: BriefcaseBusiness,
    },
    {
      id: "project",
      label: content.project,
      icon: Code,
    },
  ] as const;

  const activeIndex = Math.max(0, FILTER_ORDER.indexOf(selectedFilter));

  const handleSelectFilter = useCallback(
    (filter: MissionFilter) => {
      if (filter === selectedFilter) {
        return;
      }

      playSound("characterNavigation");
      onFilterChange(filter);
    },
    [selectedFilter, onFilterChange],
  );

  const handleNavigation = useCallback(
    (direction: "next" | "previous") => {
      const nextIndex =
        direction === "previous"
          ? (activeIndex - 1 + FILTER_ORDER.length) % FILTER_ORDER.length
          : (activeIndex + 1) % FILTER_ORDER.length;

      handleSelectFilter(FILTER_ORDER[nextIndex]);
    },
    [activeIndex, handleSelectFilter],
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

      // Prevent filter navigation while a modal is open.
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('[role="dialog"]')
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

  return (
    <section
      aria-label={content.label}
      className="
        mx-auto flex w-full items-center justify-center gap-1
        sm:gap-3
      "
    >
      {/* Previous filter */}
      <button
        type="button"
        aria-label="Previous filter"
        onClick={handlePrevious}
        className="
          flex size-8 shrink-0 cursor-pointer
          items-center justify-center
          text-white/60
          transition-colors duration-200
          hover:text-[#A78BFA]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#A78BFA]
          sm:size-10
        "
      >
        <ChevronLeft aria-hidden="true" className="size-6 sm:size-8" />
      </button>

      {/* Filters */}
      <nav
        aria-label={content.label}
        className="
          grid min-w-0 flex-1 grid-cols-3 gap-2
          sm:flex sm:items-center sm:justify-center sm:gap-3
        "
      >
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter.id;
          const Icon = filter.icon;

          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleSelectFilter(filter.id)}
              className={`
                flex min-h-[76px] w-full min-w-0
                flex-col items-center justify-center gap-2
                rounded-md border bg-transparent
                px-2 py-3
                font-[family-name:var(--font-oxanium)]
                text-[10px] font-semibold leading-tight
                tracking-wide text-white
                transition-colors duration-200
                ${
                  isSelected
                    ? "border-[#A78BFA]"
                    : "border-[#A78BFA]/50 hover:border-[#A78BFA]"
                }
                sm:min-h-10 sm:w-[220px] sm:min-w-[220px]
                sm:flex-row sm:flex-nowrap sm:gap-2.5
                sm:px-4 sm:py-2.5 sm:text-xs
                sm:whitespace-nowrap
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#A78BFA]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#080D18]
              `}
            >
              <Icon
                size={18}
                strokeWidth={1.8}
                className="shrink-0"
                aria-hidden="true"
              />

              <span className="text-center sm:whitespace-nowrap sm:text-left">
                {filter.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Next filter */}
      <button
        type="button"
        aria-label="Next filter"
        onClick={handleNext}
        className="
          flex size-8 shrink-0 cursor-pointer
          items-center justify-center
          text-white/60
          transition-colors duration-200
          hover:text-[#A78BFA]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#A78BFA]
          sm:size-10
        "
      >
        <ChevronRight aria-hidden="true" className="size-6 sm:size-8" />
      </button>
    </section>
  );
}
