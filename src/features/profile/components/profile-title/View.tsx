"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";

export function View() {
  const { dictionary } = useLanguage();
  const { pageLabel, title, subtitle } = dictionary.profile;

  return (
    <header className="relative mb-8 flex w-full flex-col items-center gap-2">
      <span className="absolute left-0 top-1 text-xs font-semibold tracking-[0.3em] text-[#B8A8D9]">
        {pageLabel}
      </span>

      <h1 className="font-[var(--font-oxanium)] text-center text-2xl font-bold tracking-[0.12em] text-white sm:text-3xl md:text-4xl">
        {title}
      </h1>

      <p className="max-w-xl text-center text-sm text-white/60 sm:text-base">
        {subtitle}
      </p>
    </header>
  );
}
