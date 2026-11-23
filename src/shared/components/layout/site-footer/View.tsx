"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";

const KEY_CLASS =
  "inline-flex h-7 min-w-7 items-center justify-center rounded border border-[#A78BFA]/40 bg-[#211832]/90 px-2 font-[family-name:var(--font-oxanium)] text-xs font-semibold text-[#C4B5FD] shadow-[0_2px_0_rgba(167,139,250,0.2)]";

const SHORTCUT_CLASS =
  "flex items-center gap-2 text-xs text-white/65 sm:text-sm";

export function SiteFooter() {
  const { dictionary } = useLanguage();
  const translations = dictionary.footer;

  return (
    <footer className="relative z-10 mt-auto w-full bg-[linear-gradient(to_top,rgba(8,5,22,0.75)_0%,rgba(8,5,22,0.25)_65%,rgba(8,5,22,0)_100%)] px-4 pt-8 pb-6 sm:px-8 lg:px-11">
      {/* Footer content */}
      <div className="flex w-full items-center justify-between gap-4">
        {/* Keyboard shortcuts */}
        <div
          role="group"
          aria-label={translations.keyboardShortcuts}
          className="flex flex-wrap items-center justify-start gap-x-5 gap-y-3 sm:gap-x-6"
        >
          <div className={SHORTCUT_CLASS}>
            <span className="flex items-center gap-1">
              <kbd className={KEY_CLASS}>←</kbd>
              <kbd className={KEY_CLASS}>→</kbd>
            </span>
            <span>{translations.navigate}</span>
          </div>

          <div className={SHORTCUT_CLASS}>
            <kbd className={KEY_CLASS}>Enter</kbd>
            <span>{translations.select}</span>
          </div>

          <div className={SHORTCUT_CLASS}>
            <kbd className={KEY_CLASS}>Esc</kbd>
            <span>{translations.back}</span>
          </div>
        </div>

        {/* Version */}
        <span className="shrink-0 font-[family-name:var(--font-oxanium)] text-xs tracking-wider text-white/40">
          / v1.0.0
        </span>
      </div>

      {/* Decorative top border */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-8 w-full"
        viewBox="0 0 1000 32"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="footer-border-gradient"
            x1="0"
            y1="0"
            x2="1000"
            y2="0"
            gradientUnits="userSpaceOnUse"
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

        {/* Diagonal left finish and straight right edge */}
        <path
          d="M0 31 L30 1 H1000"
          fill="none"
          stroke="url(#footer-border-gradient)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </footer>
  );
}
