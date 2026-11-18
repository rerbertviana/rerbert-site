"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { playSound } from "@/shared/lib/audio/audioManager";

interface BackButtonProps {
  href: string;
  label?: string;
}

export function View({ href, label }: BackButtonProps) {
  const router = useRouter();
  const { locale, dictionary } = useLanguage();

  const handleBack = useCallback(() => {
    playSound("characterSelect");
    router.push(`/${locale}${href}`);
  }, [href, locale, router]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;

      const isTyping =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

      const isModalOpen = document.querySelector(
        '[role="dialog"][aria-modal="true"]',
      );

      if (
        event.key === "Escape" &&
        !event.repeat &&
        !isTyping &&
        !isModalOpen
      ) {
        event.preventDefault();
        handleBack();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleBack]);

  return (
    <div className="mb-3 flex w-full justify-start sm:mb-4">
      <button
        type="button"
        onMouseEnter={() => playSound("interfaceClose")}
        onClick={handleBack}
        className="
          group inline-flex items-center gap-2
          rounded-lg border border-[#A78BFA]/50
          bg-[#100C24]/70 px-4 py-2
          font-[family-name:var(--font-oxanium)]
          text-xs font-bold tracking-wide text-white
          transition-colors duration-200
          hover:border-[#A78BFA]
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#A78BFA]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[#100C24]
        "
      >
        <ArrowLeft
          aria-hidden="true"
          className="h-4 w-4 text-white transition-transform duration-200 group-hover:-translate-x-1"
        />

        {label ?? dictionary.profile.backButton}
      </button>
    </div>
  );
}
