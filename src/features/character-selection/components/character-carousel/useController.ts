"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";

import { playSound } from "@/shared/lib/audio/audioManager";
import { useLanguage } from "@/shared/i18n/LanguageProvider";

import { characters } from "../../data/characters";

const SWIPE_THRESHOLD = 45;

type NavigationDirection = "next" | "previous";

export interface CharacterCarouselProps {
  selectedCharacterId: string | null;
  onSelectedCharacterChange: (characterId: string | null) => void;
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.isContentEditable ||
    Boolean(target.closest('input, textarea, select, [role="textbox"]'))
  );
}

export function useController({
  selectedCharacterId,
  onSelectedCharacterChange,
}: CharacterCarouselProps) {
  const { dictionary } = useLanguage();
  const translations = dictionary.characterSelection;

  const initialCharacterIndex = Math.max(
    characters.findIndex((character) => character.id === "rerbert"),
    0,
  );

  const [activeIndex, setActiveIndex] = useState(initialCharacterIndex);
  const [navigationDirection, setNavigationDirection] =
    useState<NavigationDirection>("next");

  const pointerStartX = useRef<number | null>(null);
  const suppressClick = useRef(false);

  const visibleCharacters = [-1, 0, 1].map((offset) => {
    const characterIndex =
      (activeIndex + offset + characters.length) % characters.length;

    return {
      character: characters[characterIndex],
      characterIndex,
    };
  });

  const handleNavigation = useCallback((direction: NavigationDirection) => {
    setNavigationDirection(direction);
    playSound("characterNavigation");

    setActiveIndex((currentIndex) => {
      if (direction === "previous") {
        return (currentIndex - 1 + characters.length) % characters.length;
      }

      return (currentIndex + 1) % characters.length;
    });
  }, []);

  const handleCharacterSelect = useCallback(
    (characterId: string, index: number) => {
      if (selectedCharacterId === characterId) {
        playSound("interfaceBack");
        onSelectedCharacterChange(null);
        return;
      }

      playSound("characterSelect");
      setActiveIndex(index);
      onSelectedCharacterChange(characterId);
    },
    [selectedCharacterId, onSelectedCharacterChange],
  );

  const handlePrevious = useCallback(() => {
    handleNavigation("previous");
  }, [handleNavigation]);

  const handleNext = useCallback(() => {
    handleNavigation("next");
  }, [handleNavigation]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        isEditableTarget(event.target)
      ) {
        return;
      }

      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        return;
      }

      event.preventDefault();

      const direction: NavigationDirection =
        event.key === "ArrowLeft" ? "previous" : "next";

      handleNavigation(direction);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNavigation]);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!event.isPrimary || characters.length <= 1) return;

      suppressClick.current = false;
      pointerStartX.current = event.clientX;
    },
    [],
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (pointerStartX.current === null) return;

      const distance = event.clientX - pointerStartX.current;

      pointerStartX.current = null;

      if (Math.abs(distance) < SWIPE_THRESHOLD) return;

      suppressClick.current = true;

      if (distance < 0) {
        handleNext();
      } else {
        handlePrevious();
      }
    },
    [handleNext, handlePrevious],
  );

  const handlePointerCancel = useCallback(() => {
    pointerStartX.current = null;
    suppressClick.current = false;
  }, []);

  const handleClickCapture = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!suppressClick.current) return;

      event.preventDefault();
      event.stopPropagation();

      suppressClick.current = false;
    },
    [],
  );

  return {
    translations,
    visibleCharacters,
    navigationDirection,
    handleCharacterSelect,
    handlePrevious,
    handleNext,
    handlePointerDown,
    handlePointerUp,
    handlePointerCancel,
    handleClickCapture,
  };
}
