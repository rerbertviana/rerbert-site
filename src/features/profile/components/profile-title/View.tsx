"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";

export function View() {
  const { dictionary } = useLanguage();
  const { pageLabel, title, subtitle } = dictionary.profile;

  const lastSpaceIndex = title.lastIndexOf(" ");
  const titlePrefix = title.slice(0, lastSpaceIndex);
  const highlightedWord = title.slice(lastSpaceIndex + 1);

  return (
    <section
      aria-labelledby="profile-title"
      className="flex flex-col items-center px-4 pt-5 text-center sm:pt-6"
    >
      {/* Section label */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="text-xl font-bold leading-none text-[#8AFF00]"
        >
          {"<"}
        </span>

        <p className="font-[family-name:var(--font-oxanium)] text-xs font-bold uppercase tracking-[0.3em] text-[#B77AFF] sm:text-sm">
          {pageLabel}
        </p>

        <span
          aria-hidden="true"
          className="text-xl font-bold leading-none text-[#8AFF00]"
        >
          {">"}
        </span>
      </div>

      {/* Main heading and decorative lines */}
      <div className="relative mt-3 flex w-full max-w-[900px] items-center justify-center">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 h-7 w-full -translate-y-1/2"
          viewBox="0 0 900 28"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Desktop gradients */}
            <linearGradient
              id="profile-divider-left-desktop"
              x1="0"
              y1="0"
              x2="160"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
              <stop offset="35%" stopColor="#80FF00" stopOpacity="0.7" />
              <stop offset="75%" stopColor="#80FF00" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#80FF00" stopOpacity="0" />
            </linearGradient>

            <linearGradient
              id="profile-divider-right-desktop"
              x1="900"
              y1="0"
              x2="740"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
              <stop offset="35%" stopColor="#80FF00" stopOpacity="0.7" />
              <stop offset="75%" stopColor="#80FF00" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#80FF00" stopOpacity="0" />
            </linearGradient>

            {/* Mobile gradients */}
            <linearGradient
              id="profile-divider-left-mobile"
              x1="0"
              y1="0"
              x2="90"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
              <stop offset="35%" stopColor="#80FF00" stopOpacity="0.7" />
              <stop offset="75%" stopColor="#80FF00" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#80FF00" stopOpacity="0" />
            </linearGradient>

            <linearGradient
              id="profile-divider-right-mobile"
              x1="900"
              y1="0"
              x2="810"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
              <stop offset="35%" stopColor="#80FF00" stopOpacity="0.7" />
              <stop offset="75%" stopColor="#80FF00" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#80FF00" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Desktop */}
          <g className="hidden sm:block">
            <path
              d="M0 14 H160"
              stroke="url(#profile-divider-left-desktop)"
              strokeWidth="1.2"
            />

            <path
              d="M900 14 H740"
              stroke="url(#profile-divider-right-desktop)"
              strokeWidth="1.2"
            />
          </g>

          {/* Mobile */}
          <g className="sm:hidden">
            <path
              d="M0 14 H90"
              stroke="url(#profile-divider-left-mobile)"
              strokeWidth="1.2"
            />

            <path
              d="M900 14 H810"
              stroke="url(#profile-divider-right-mobile)"
              strokeWidth="1.2"
            />
          </g>
        </svg>

        <h1
          id="profile-title"
          className="relative z-10 flex flex-wrap justify-center gap-x-3 font-[family-name:var(--font-oxanium)] text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-4xl md:text-5xl"
        >
          {titlePrefix && <span className="text-white">{titlePrefix}</span>}

          <span className="text-[#8AFF00]">{highlightedWord}</span>
        </h1>
      </div>

      {/* Description */}
      <p className="mt-3 max-w-xl text-sm font-medium text-white/90 sm:text-base">
        {subtitle}
      </p>
    </section>
  );
}
