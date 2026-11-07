"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";

export function View() {
  const { dictionary } = useLanguage();
  const { pageLabel, title, subtitle } = dictionary.profile;

  const titleWords = title.split(" ");
  const highlightedWord = titleWords.pop();

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
      <div className="relative mt-4 flex w-full max-w-[900px] items-center justify-center">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 h-7 w-full -translate-y-1/2"
          viewBox="0 0 900 28"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="profile-divider-left"
              x1="0"
              y1="0"
              x2="230"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
              <stop offset="50%" stopColor="#80FF00" stopOpacity="1" />
              <stop offset="100%" stopColor="#80FF00" stopOpacity="0" />
            </linearGradient>

            <linearGradient
              id="profile-divider-right"
              x1="900"
              y1="0"
              x2="670"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
              <stop offset="50%" stopColor="#80FF00" stopOpacity="1" />
              <stop offset="100%" stopColor="#80FF00" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M0 14 H230"
            stroke="url(#profile-divider-left)"
            strokeWidth="1.2"
          />

          <path
            d="M900 14 H670"
            stroke="url(#profile-divider-right)"
            strokeWidth="1.2"
          />
        </svg>

        <h1
          id="profile-title"
          className="relative z-10 flex flex-wrap justify-center gap-x-2 font-[family-name:var(--font-oxanium)] text-2xl font-extrabold uppercase leading-none tracking-tight sm:gap-x-3 sm:text-3xl md:text-4xl"
        >
          {titleWords.map((word, index) => (
            <span key={`${word}-${index}`} className="text-white">
              {word}
            </span>
          ))}

          {highlightedWord && (
            <span className="text-[#8AFF00]">{highlightedWord}</span>
          )}
        </h1>
      </div>

      {/* Description */}
      <p className="mt-4 max-w-xl text-sm font-medium text-white/90 sm:text-base">
        {subtitle}
      </p>
    </section>
  );
}
