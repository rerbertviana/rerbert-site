"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import type { Locale } from "@/shared/i18n/config";
import {
  isSoundEnabled,
  playSound,
  toggleAudio,
} from "@/shared/lib/audio/audioManager";

export function useController() {
  const { locale, dictionary, resumeUrl, changeLanguage } = useLanguage();

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => isSoundEnabled());

  const languageMenuRef = useRef<HTMLDivElement>(null);
  const languageListRef = useRef<HTMLDivElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);

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
    const enabled = await toggleAudio();

    setSoundEnabled(enabled);
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

  return {
    locale,
    dictionary,
    resumeUrl,
    isLanguageMenuOpen,
    isSoundEnabled: soundEnabled,
    languageMenuRef,
    languageListRef,
    languageButtonRef,
    handleSoundToggle,
    handleLanguageMenuToggle,
    handleLanguageChange,
    handleLanguageMenuKeyDown,
    handleLanguageButtonKeyDown,
  };
}
