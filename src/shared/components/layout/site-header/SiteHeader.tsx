"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Download,
  ChevronsLeftRightEllipsis,
  Volume2,
  VolumeX,
} from "lucide-react";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import type { Locale } from "@/shared/i18n/config";
import {
  isAmbientMusicPlaying,
  playSound,
  toggleAmbientMusic,
} from "@/shared/lib/audio/audioManager";

interface LanguageOption {
  code: Locale;
  label: string;
  shortLabel: string;
  flag: string;
}

const LANGUAGE_OPTIONS: Record<Locale, LanguageOption> = {
  en: {
    code: "en",
    label: "English",
    shortLabel: "EN",
    flag: "/images/flags/us.svg",
  },
  "pt-BR": {
    code: "pt-BR",
    label: "Português (Brasil)",
    shortLabel: "PT",
    flag: "/images/flags/br.svg",
  },
};

const languages = Object.values(LANGUAGE_OPTIONS);

export function SiteHeader() {
  const { locale, dictionary, resumeUrl, changeLanguage } = useLanguage();

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(() =>
    isAmbientMusicPlaying(),
  );

  const languageMenuRef = useRef<HTMLDivElement>(null);
  const languageListRef = useRef<HTMLDivElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);

  const currentLanguage = LANGUAGE_OPTIONS[locale];

  useEffect(() => {
    function handleClickOutside(event: PointerEvent) {
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isLanguageMenuOpen) return;

    const selectedOption = languageListRef.current?.querySelector<HTMLElement>(
      '[role="menuitemradio"][aria-checked="true"]',
    );

    selectedOption?.focus();
  }, [isLanguageMenuOpen]);

  async function handleSoundToggle() {
    const isPlaying = await toggleAmbientMusic();

    setIsSoundEnabled(isPlaying);
  }

  function handleLanguageMenuToggle() {
    setIsLanguageMenuOpen((previous) => {
      playSound(previous ? "interfaceClose" : "interfaceOpen");

      return !previous;
    });
  }

  function handleLanguageChange(language: Locale) {
    if (language === locale) {
      setIsLanguageMenuOpen(false);
      playSound("interfaceClose");
      languageButtonRef.current?.focus();
      return;
    }

    setIsLanguageMenuOpen(false);
    playSound("interfaceClose");
    changeLanguage(language);
  }

  function handleLanguageMenuKeyDown(
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) {
    const menuItems =
      languageListRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="menuitemradio"]',
      );

    if (!menuItems?.length) return;

    const currentIndex = Array.from(menuItems).findIndex(
      (item) => item === document.activeElement,
    );

    let nextIndex = currentIndex;

    switch (event.key) {
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % menuItems.length;
        break;

      case "ArrowUp":
        nextIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = menuItems.length - 1;
        break;

      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        setIsLanguageMenuOpen(false);
        playSound("interfaceClose");
        languageButtonRef.current?.focus();
        return;

      default:
        return;
    }

    event.preventDefault();
    menuItems[nextIndex]?.focus();
  }

  function handleLanguageButtonKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) {
    if (
      !isLanguageMenuOpen &&
      (event.key === "ArrowDown" || event.key === "ArrowUp")
    ) {
      event.preventDefault();
      setIsLanguageMenuOpen(true);
      playSound("interfaceOpen");
    }
  }

  return (
    <header className="sticky top-0 z-50 flex min-h-[76px] flex-wrap items-center justify-between gap-4 bg-[linear-gradient(to_bottom,rgba(8,5,22,0.95)_0%,rgba(8,5,22,0.65)_45%,rgba(8,5,22,0)_100%)] px-4 py-3 backdrop-blur-[2px] sm:px-8 lg:px-11">
      {/* Brand */}
      <Link
        href={`/${locale}`}
        aria-label={`RERBERT — ${dictionary.navigation.home}`}
        className="group flex shrink-0 items-center gap-3"
      >
        <ChevronsLeftRightEllipsis
          aria-hidden="true"
          className="h-9 w-9 text-[#80FF00] transition-transform group-hover:scale-110 sm:h-10 sm:w-10"
          strokeWidth={2.2}
        />

        <div className="flex flex-col">
          <span className="font-[family-name:var(--font-oxanium)] text-lg font-extrabold leading-tight tracking-wide text-white sm:text-2xl">
            RERBERT
          </span>

          <span className="text-[9px] uppercase tracking-[0.16em] text-gray-400 sm:text-[11px]">
            {dictionary.header.developerPortfolio}
          </span>
        </div>
      </Link>

      {/* Global controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Audio */}
        <button
          type="button"
          aria-label={
            isSoundEnabled
              ? dictionary.header.disableSound
              : dictionary.header.enableSound
          }
          aria-pressed={isSoundEnabled}
          onClick={handleSoundToggle}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500/40 bg-[#100C24]/80 text-violet-300 transition-colors hover:border-violet-400 hover:bg-violet-500/10 sm:h-11 sm:w-14"
        >
          {isSoundEnabled ? (
            <Volume2 aria-hidden="true" size={20} />
          ) : (
            <VolumeX aria-hidden="true" size={20} />
          )}
        </button>

        {/* Language */}
        <div ref={languageMenuRef} className="relative">
          <button
            ref={languageButtonRef}
            type="button"
            aria-label={dictionary.header.selectLanguage}
            aria-haspopup="menu"
            aria-expanded={isLanguageMenuOpen}
            aria-controls="language-menu"
            onClick={handleLanguageMenuToggle}
            onKeyDown={handleLanguageButtonKeyDown}
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-violet-500/40 bg-[#100C24]/80 px-3 text-sm font-semibold text-white transition-colors hover:border-violet-400 sm:h-11 sm:px-4"
          >
            <div className="relative h-[14px] w-[21px] shrink-0 overflow-hidden rounded-[2px]">
              <Image
                src={currentLanguage.flag}
                alt=""
                fill
                sizes="21px"
                className="object-cover"
              />
            </div>

            <span>{currentLanguage.shortLabel}</span>

            <ChevronDown
              aria-hidden="true"
              size={16}
              className={`text-violet-300 transition-transform ${
                isLanguageMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isLanguageMenuOpen && (
            <div
              id="language-menu"
              ref={languageListRef}
              role="menu"
              aria-label={dictionary.header.languageOptions}
              onKeyDown={handleLanguageMenuKeyDown}
              className="absolute right-0 top-full z-50 mt-2 min-w-[200px] overflow-hidden rounded-lg border border-violet-500/40 bg-[#100C24] p-1 shadow-[0_8px_30px_rgba(0,0,0,0.45)]"
            >
              {languages.map((language) => {
                const isSelected = locale === language.code;

                return (
                  <button
                    key={language.code}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-violet-500/15 text-white"
                        : "text-gray-300 hover:bg-violet-500/10 hover:text-white"
                    }`}
                  >
                    <div className="relative h-[15px] w-[22px] shrink-0 overflow-hidden rounded-[2px]">
                      <Image
                        src={language.flag}
                        alt=""
                        fill
                        sizes="22px"
                        className="object-cover"
                      />
                    </div>

                    <span className="flex-1">{language.label}</span>

                    {isSelected && (
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-[#80FF00] shadow-[0_0_8px_rgba(128,255,0,0.8)]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Download CV */}
        <a
          href={resumeUrl}
          download
          aria-label={dictionary.header.downloadCv}
          className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#80FF00] bg-[#80FF00]/5 px-3 text-xs font-bold text-white shadow-[0_0_12px_rgba(128,255,0,0.12)] transition-[background-color,box-shadow] hover:bg-[#80FF00]/15 hover:shadow-[0_0_18px_rgba(128,255,0,0.3)] sm:h-11 sm:px-5 sm:text-sm"
        >
          <Download aria-hidden="true" size={19} className="text-[#80FF00]" />
          <span className="hidden sm:inline">
            {dictionary.header.downloadCv}
          </span>
          <span className="sm:hidden">{dictionary.header.cv}</span>
        </a>
      </div>

      {/* Decorative bottom line with diagonal finish */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-8 w-full"
        viewBox="0 0 1000 32"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="header-border-gradient"
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

        <path
          d="M0 31 H970 L1000 1"
          fill="none"
          stroke="url(#header-border-gradient)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </header>
  );
}
