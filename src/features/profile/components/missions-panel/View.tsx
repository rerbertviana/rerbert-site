"use client";

import Link from "next/link";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { playSound } from "@/shared/lib/audio/audioManager";

import { missions } from "../../data/missions";
import type { MissionLocale } from "../../types/mission";

const FEATURED_MISSIONS_LIMIT = 3;

function formatDate(date: string, locale: MissionLocale) {
  const [year, month] = date.split("-").map(Number);

  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "pt-BR", {
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));
}

export function View() {
  const { locale, dictionary } = useLanguage();
  const content = dictionary.profile.missions;

  const featuredMissions = missions.slice(0, FEATURED_MISSIONS_LIMIT);

  return (
    <article className="group relative mx-auto w-full max-w-5xl rounded-2xl bg-[#100C24]/55 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] motion-reduce:transform-none">
      <div className="flex min-h-[100px] flex-col items-center gap-4 rounded-2xl px-5 py-5 lg:flex-row lg:gap-4 lg:px-5 lg:py-4">
        {/* Panel heading */}
        <div className="flex w-full items-center justify-center lg:w-auto lg:shrink-0">
          {/* Icon - desktop only */}
          <div className="hidden h-full shrink-0 items-center justify-center lg:flex">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/70 bg-[#17112E]">
              <BriefcaseBusiness
                aria-hidden="true"
                className="h-6 w-6 text-white"
                strokeWidth={2.2}
              />
            </div>
          </div>

          {/* Title and description */}
          <div className="w-full min-w-0 text-center lg:ml-5 lg:w-[320px] lg:text-left">
            <h2 className="font-[family-name:var(--font-oxanium)] text-lg font-extrabold uppercase tracking-wide text-white">
              {content.title}
            </h2>

            <p className="mt-1 text-center text-xs leading-relaxed text-gray-300 lg:text-justify">
              {content.description}
            </p>
          </div>
        </div>

        {/* Vertical divider */}
        <div
          aria-hidden="true"
          className="hidden h-12 w-px shrink-0 bg-gradient-to-b from-transparent via-violet-400/60 to-transparent lg:block"
        />

        {/* Professional experience timeline */}
        <ol
          aria-label={content.title}
          className="relative flex w-full flex-col gap-4 pl-5 lg:min-w-0 lg:flex-1 lg:flex-row lg:items-start lg:justify-between lg:gap-2 lg:pl-0"
        >
          {/* Mobile timeline line */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-[#80FF00]/80 via-violet-400/60 to-violet-400/30 lg:hidden"
          />

          {/* Desktop timeline line */}
          <div
            aria-hidden="true"
            className="
              absolute left-0 right-0 top-[5px] hidden h-px lg:block
              [background:linear-gradient(to_right,transparent_0%,rgba(128,255,0,0.8)_16.66%,rgba(168,85,247,0.7)_50%,rgba(168,85,247,0.4)_83.33%,transparent_100%)]
            "
          />

          {featuredMissions.map((mission, index) => {
            const isCurrentHighlight = index === 0;
            const localizedContent = mission.content[locale];

            const accentColor = isCurrentHighlight
              ? "bg-[#80FF00] shadow-[0_0_10px_rgba(128,255,0,0.65)]"
              : "bg-[#A855F7] shadow-[0_0_10px_rgba(168,85,247,0.5)]";

            const textColor = isCurrentHighlight
              ? "text-[#80FF00]"
              : "text-[#C4B5FD]";

            return (
              <li
                key={mission.id}
                className="relative flex min-w-0 flex-1 flex-col gap-1"
              >
                {/* Timeline marker */}
                <span
                  aria-hidden="true"
                  className={`absolute -left-5 top-1 h-[11px] w-[11px] rounded-full lg:static lg:mx-auto lg:mb-2 lg:block ${accentColor}`}
                />

                <div className="min-w-0 lg:text-center">
                  <h3
                    className={`truncate text-xs font-semibold ${textColor}`}
                    title={mission.company}
                  >
                    {mission.company}
                  </h3>

                  <p className="mt-0.5 truncate text-[10px] font-medium text-white/90">
                    {localizedContent.role}
                  </p>

                  <p className="mt-1 text-[9px] text-gray-400">
                    {formatDate(mission.startDate, locale)} –{" "}
                    {formatDate(mission.endDate, locale)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {/* View more */}
        <div className="w-full shrink-0 self-end lg:w-auto lg:self-auto">
          <Link
            href={`/${locale}/missions`}
            onClick={() => playSound("interfaceOpen")}
            className="group/button ml-auto flex h-8 w-fit items-center justify-center gap-1.5 rounded-lg border border-[#80FF00]/80 bg-[#80FF00]/5 px-3 text-[9px] font-extrabold uppercase text-white shadow-[0_0_10px_rgba(128,255,0,0.12)] transition-all hover:bg-[#80FF00]/15 hover:shadow-[0_0_16px_rgba(128,255,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#100C24]"
          >
            {content.viewMore}

            <ArrowRight
              aria-hidden="true"
              size={12}
              className="text-[#80FF00] transition-transform group-hover/button:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      {/* Decorative gradient border */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full rounded-2xl"
      >
        <defs>
          <linearGradient
            id="missions-border-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.7" />
            <stop offset="15%" stopColor="#A855F7" stopOpacity="0.55" />

            <stop offset="20%" stopColor="#80FF00" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#80FF00" stopOpacity="1" />
            <stop offset="32%" stopColor="#80FF00" stopOpacity="0.65" />
            <stop offset="38%" stopColor="#80FF00" stopOpacity="0" />

            <stop offset="65%" stopColor="#A855F7" stopOpacity="0" />
            <stop offset="75%" stopColor="#A855F7" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        <rect
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx="16"
          ry="16"
          fill="none"
          stroke="url(#missions-border-gradient)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </article>
  );
}
