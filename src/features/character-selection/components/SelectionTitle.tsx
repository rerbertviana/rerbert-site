"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";

export function SelectionTitle() {
  const { dictionary } = useLanguage();
  const translations = dictionary.characterSelection;

  return (
    <section
      aria-labelledby="selection-title"
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

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#B77AFF] sm:text-sm">
          {translations.sectionLabel}
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
        id="selection-title"
        className="mt-3 flex flex-wrap justify-center gap-x-3 font-[family-name:var(--font-oxanium)] text-3xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-4xl md:text-5xl"
      >
        <span>{translations.title.first}</span>

        <span className="text-[#8AFF00]">{translations.title.highlight}</span>
      </h1>

      {/* Description */}
      <p className="mt-3 max-w-xl text-sm font-medium text-white/90 sm:text-base">
        {translations.subtitle}
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
            id="selection-divider-left"
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
            id="selection-divider-right"
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
          stroke="url(#selection-divider-left)"
          strokeWidth="1.2"
        />

        <path
          d="M700 22 H655 L640 7 H520"
          stroke="url(#selection-divider-right)"
          strokeWidth="1.2"
        />
      </svg>
    </section>
  );
}
