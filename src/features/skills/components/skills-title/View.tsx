"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";

export function View() {
  const { dictionary } = useLanguage();
  const { pageLabel, title, subtitle } = dictionary.skills;

  return (
    <section
      aria-labelledby="skills-title"
      className="flex flex-col items-center px-4 pt-5 text-center sm:pt-6"
    >
      {/* Section label */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="text-xl font-bold leading-none text-[#8AFF00]"
        >
          ‹
        </span>

        <p className="font-[family-name:var(--font-oxanium)] text-xs font-bold uppercase tracking-[0.3em] text-[#B77AFF] sm:text-sm">
          {pageLabel}
        </p>

        <span
          aria-hidden="true"
          className="text-xl font-bold leading-none text-[#8AFF00]"
        >
          ›
        </span>
      </div>

      {/* Main heading */}
      <h1
        id="skills-title"
        className="mt-3 font-[family-name:var(--font-oxanium)] text-3xl font-extrabold uppercase leading-none tracking-tight text-[#8AFF00] sm:text-4xl md:text-5xl"
      >
        {title}
      </h1>

      {/* Description */}
      <p className="mt-3 max-w-xl text-sm font-medium text-white/90 sm:text-base">
        {subtitle}
      </p>

      {/* Decorative divider */}
      <svg
        aria-hidden="true"
        className="pointer-events-none mt-4 h-7 w-full max-w-[700px]"
        viewBox="0 0 700 28"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="skills-divider-left"
            x1="0"
            y1="0"
            x2="180"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
            <stop offset="25%" stopColor="#80FF00" stopOpacity="1" />
            <stop offset="45%" stopColor="#80FF00" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#A855F7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.35" />
          </linearGradient>

          <linearGradient
            id="skills-divider-right"
            x1="700"
            y1="0"
            x2="520"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
            <stop offset="25%" stopColor="#80FF00" stopOpacity="1" />
            <stop offset="45%" stopColor="#80FF00" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#A855F7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <path
          d="M0 22 H45 L60 7 H180"
          stroke="url(#skills-divider-left)"
          strokeWidth="1.2"
        />

        <path
          d="M700 22 H655 L640 7 H520"
          stroke="url(#skills-divider-right)"
          strokeWidth="1.2"
        />
      </svg>
    </section>
  );
}
