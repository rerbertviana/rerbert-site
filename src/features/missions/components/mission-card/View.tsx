"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { playSound } from "@/shared/lib/audio/audioManager";
import { View as DecorativeGradientBorder } from "@/shared/components/decorative-gradient-border/View";

import type { TimelineEntry } from "../../types/timeline";

import { View as MissionModal } from "../mission-modal/View";

interface Props {
  entry: TimelineEntry;
}

const MISSION_IMAGES: Record<string, string> = {
  portfolio: "/images/missions/projects/portfolio.png",
  edupresence: "/images/missions/projects/edupresence.png",
  kombigogh: "/images/missions/projects/kombigogh.png",
  "compass-uol": "/images/missions/companies/compass-uol.png",
  "izap-softworks": "/images/missions/companies/izap-softworks.png",
  "elleven-tecnologia": "/images/missions/companies/elleven-tecnologia.png",
  "vitoria-da-conquista-city-hall":
    "/images/missions/companies/prefeitura-vitoria-da-conquista.png",
};

function formatDate(date: string, locale: string): string {
  const [year, month] = date.split("-").map(Number);

  if (!year || !month) {
    return date;
  }

  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));
}

export function View({ entry }: Props) {
  const { locale, dictionary } = useLanguage();
  const content = dictionary.missions.card;

  const isExperience = entry.type === "experience";

  let title: string;
  let description: string;
  let details: string[];
  let period: string;

  if (entry.type === "experience") {
    title = entry.data.company;

    const localizedContent = entry.data.content[locale];

    description = localizedContent.responsibilities[0] ?? "";
    details = localizedContent.responsibilities;

    period = `${formatDate(entry.data.startDate, locale)} — ${formatDate(
      entry.data.endDate,
      locale,
    )}`;
  } else {
    title = entry.data.name;

    const localizedContent = entry.data.content[locale];

    description = localizedContent.description;
    details = localizedContent.highlights;

    period = entry.data.completedAt
      ? formatDate(entry.data.completedAt, locale)
      : content.inProgress;
  }

  const image =
    entry.type === "project"
      ? (entry.data.image ?? MISSION_IMAGES[entry.id])
      : MISSION_IMAGES[entry.id];

  const categoryLabel = isExperience
    ? dictionary.missions.categories.experience
    : dictionary.missions.categories.project;

  const imageSource = image ?? "/images/missions/placeholder.png";
  const technologies = entry.data.technologies;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [visibleTechnologyCount, setVisibleTechnologyCount] = useState(
    technologies.length,
  );

  const cardRef = useRef<HTMLElement>(null);
  const wasModalOpenRef = useRef(false);

  const technologiesContainerRef = useRef<HTMLDivElement>(null);
  const technologyMeasureRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleOpenModal = () => {
    if (isModalOpen) {
      return;
    }

    playSound("buttonConfirm");
    setIsModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Return focus to the card after closing the modal.
  useEffect(() => {
    if (wasModalOpenRef.current && !isModalOpen) {
      cardRef.current?.focus();
    }

    wasModalOpenRef.current = isModalOpen;
  }, [isModalOpen]);

  // Calculate how many technology tags fit in the available space.
  useEffect(() => {
    const container = technologiesContainerRef.current;

    if (!container || technologies.length === 0) {
      return;
    }

    const calculateVisibleTechnologies = () => {
      const availableWidth = container.clientWidth;
      const gap = 4;

      let occupiedWidth = 0;
      let visibleCount = 0;

      for (let index = 0; index < technologies.length; index++) {
        const technologyElement = technologyMeasureRefs.current[index];

        if (!technologyElement) {
          break;
        }

        const technologyWidth = technologyElement.getBoundingClientRect().width;

        const nextOccupiedWidth =
          occupiedWidth + technologyWidth + (visibleCount > 0 ? gap : 0);

        if (nextOccupiedWidth > availableWidth) {
          break;
        }

        occupiedWidth = nextOccupiedWidth;
        visibleCount++;
      }

      setVisibleTechnologyCount(visibleCount);
    };

    const resizeObserver = new ResizeObserver(calculateVisibleTechnologies);

    resizeObserver.observe(container);
    calculateVisibleTechnologies();

    return () => resizeObserver.disconnect();
  }, [technologies]);

  const visibleTechnologies = technologies.slice(0, visibleTechnologyCount);

  const remainingTechnologies =
    technologies.length - visibleTechnologies.length;

  const handleCardKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpenModal();
    }
  };

  return (
    <>
      {/* Mission card */}
      <article
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        aria-label={`${title} - ${categoryLabel}. View details`}
        onClick={handleOpenModal}
        onKeyDown={handleCardKeyDown}
        className="
          group relative z-10 isolate h-full min-h-[200px]
          cursor-pointer
          transition-transform duration-300 ease-out
          hover:scale-[1.05]
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-[#A78BFA]
          focus-visible:ring-offset-2 focus-visible:ring-offset-[#080D18]
        "
      >
        <div
          className="
            relative flex h-full min-h-[200px]
            flex-col overflow-hidden rounded-lg
          "
        >
          <Image
            src={imageSource}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="z-0 object-cover"
          />

          <div
            className="
              absolute inset-0 z-0
              bg-gradient-to-t
              from-[#080D18]/80 via-transparent to-black/20
            "
          />

          {/* Category */}
          <div className="relative z-10 flex items-start justify-between p-2.5">
            <span
              className="
                rounded border border-white/40
                bg-[#080D18]/75 px-2 py-1
                font-[family-name:var(--font-oxanium)]
                text-[9px] font-semibold tracking-wide
                text-white backdrop-blur-md
              "
            >
              {categoryLabel}
            </span>
          </div>

          {/* Information and technologies */}
          <div className="relative z-10 mt-auto flex flex-col gap-2 p-2.5">
            <div
              className="
                min-h-[82px] rounded-md border border-white/15
                bg-[#080D18]/40 p-2.5
                backdrop-blur-md
              "
            >
              <div className="mb-1.5 flex items-center justify-between gap-2">
                <h3 className="min-w-0 truncate font-[family-name:var(--font-oxanium)] text-sm font-semibold leading-tight text-white">
                  {title}
                </h3>

                <span className="shrink-0 text-right text-[9px] font-medium uppercase tracking-wide text-white">
                  {period}
                </span>
              </div>

              <p className="line-clamp-2 text-[11px] leading-relaxed text-white">
                {description}
              </p>
            </div>

            {/* Technologies */}
            <div
              className="
                grid min-h-[26px] min-w-0
                grid-cols-[15%_60%_25%]
                items-center
              "
            >
              <span
                className="
                  whitespace-nowrap
                  font-[family-name:var(--font-oxanium)]
                  text-[9px] font-semibold tracking-widest
                  text-white
                "
              >
                TECH
              </span>

              <div
                ref={technologiesContainerRef}
                className="flex min-w-0 items-center gap-1 overflow-hidden"
              >
                {visibleTechnologies.map((technology) => (
                  <span
                    key={technology}
                    className="
                      shrink-0 rounded border border-white/15
                      bg-[#080D18]/65 px-1.5 py-1
                      text-[9px] text-white
                      backdrop-blur-sm
                    "
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <span
                className="
                  min-w-0 whitespace-nowrap text-right
                  text-[9px] font-semibold text-white
                "
              >
                {remainingTechnologies > 0
                  ? `+${remainingTechnologies} MORE`
                  : ""}
              </span>
            </div>

            {/* Hidden technology measurements */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute -left-[9999px] top-0
                flex gap-1 whitespace-nowrap opacity-0
              "
            >
              {technologies.map((technology, index) => (
                <span
                  key={technology}
                  ref={(element) => {
                    technologyMeasureRefs.current[index] = element;
                  }}
                  className="
                    shrink-0 rounded border border-white/15
                    bg-[#080D18]/65 px-1.5 py-1
                    text-[9px] text-white
                  "
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          <DecorativeGradientBorder radius={8} />
        </div>
      </article>

      {/* Mission details modal */}
      {isModalOpen && (
        <MissionModal
          id={entry.id}
          title={title}
          description={description}
          details={details}
          period={period}
          image={imageSource}
          technologies={technologies}
          isExperience={isExperience}
          frontendUrl={
            entry.type === "project" ? entry.data.frontendUrl : undefined
          }
          backendUrl={
            entry.type === "project" ? entry.data.backendUrl : undefined
          }
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
