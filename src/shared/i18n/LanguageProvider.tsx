"use client";

import { createContext, useContext, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

import type { Locale } from "./config";
import type { Dictionary } from "./types";

interface LanguageContextValue {
  locale: Locale;
  dictionary: Dictionary;
  resumeUrl: string;
  changeLanguage: (locale: Locale) => void;
}

interface LanguageProviderProps {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}

const RESUME_PATHS: Record<Locale, string> = {
  en: "/resume/rerbert-cv-english.pdf",
  "pt-BR": "/resume/rerbert-cv.pdf",
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  locale,
  dictionary,
  children,
}: LanguageProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  function changeLanguage(nextLocale: Locale) {
    if (nextLocale === locale) return;

    const segments = pathname.split("/");
    segments[1] = nextLocale;

    const nextPath = segments.join("/");
    const search = window.location.search;
    const hash = window.location.hash;

    router.push(`${nextPath}${search}${hash}`);
  }

  return (
    <LanguageContext.Provider
      value={{
        locale,
        dictionary,
        resumeUrl: RESUME_PATHS[locale],
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
