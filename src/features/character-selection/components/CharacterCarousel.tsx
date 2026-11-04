"use client";

import { useRef, useState } from "react";
import type { PointerEvent, MouseEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { characters } from "../data/characters";
import { CharacterCard } from "./CharacterCard";

const SWIPE_THRESHOLD = 45;

type NavigationDirection = "next" | "previous";

interface CharacterCarouselProps {
  selectedCharacterId: string | null;
  onSelectedCharacterChange: (characterId: string | null) => void;
}

export function CharacterCarousel({
  selectedCharacterId,
  onSelectedCharacterChange,
}: CharacterCarouselProps) {
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

  function handleCharacterSelect(characterId: string, index: number) {
    if (selectedCharacterId === characterId) {
      onSelectedCharacterChange(null);
      return;
    }

    setActiveIndex(index);
    onSelectedCharacterChange(characterId);
  }

  function handleNavigation(direction: NavigationDirection) {
    setNavigationDirection(direction);

    setActiveIndex((currentIndex) => {
      if (direction === "previous") {
        return (currentIndex - 1 + characters.length) % characters.length;
      }

      return (currentIndex + 1) % characters.length;
    });
  }

  function handlePrevious() {
    handleNavigation("previous");
  }

  function handleNext() {
    handleNavigation("next");
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || characters.length <= 1) return;

    suppressClick.current = false;
    pointerStartX.current = event.clientX;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
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
  }

  function handlePointerCancel() {
    pointerStartX.current = null;
    suppressClick.current = false;
  }

  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (!suppressClick.current) return;

    event.preventDefault();
    event.stopPropagation();

    suppressClick.current = false;
  }

  if (characters.length === 0) return null;

  return (
    <section
      aria-label="Character carousel"
      className="mx-auto mt-0 flex w-full max-w-[1100px] items-center justify-center gap-2 px-2 sm:gap-4 sm:px-4"
    >
      <button
        type="button"
        aria-label="Previous character"
        onClick={handlePrevious}
        className="flex size-8 shrink-0 items-center justify-center text-white/60 transition-colors duration-300 hover:text-[#80FF00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80FF00] sm:size-10"
      >
        <ChevronLeft aria-hidden="true" className="size-6 sm:size-8" />
      </button>

      <div
        className="min-w-0 flex-1 touch-pan-y overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClickCapture={handleClickCapture}
      >
        <div
          key={activeIndex}
          data-direction={navigationDirection}
          className="flex items-end justify-center gap-2 px-1 pt-6 pb-10 sm:gap-4 md:gap-5 animate-carousel-transition"
        >
          {visibleCharacters.map(({ character, characterIndex }) => {
            const isSelected = selectedCharacterId === character.id;

            return (
              <div
                key={character.id}
                className={`
                  relative flex shrink-0 items-end justify-center
                  origin-bottom
                  transition-transform duration-300 ease-out
                  ${isSelected ? "z-20 scale-[1.08]" : "z-0 scale-100"}
                `}
              >
                <CharacterCard
                  character={character}
                  isSelected={isSelected}
                  onSelect={() =>
                    handleCharacterSelect(character.id, characterIndex)
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        aria-label="Next character"
        onClick={handleNext}
        className="flex size-8 shrink-0 items-center justify-center text-white/60 transition-colors duration-300 hover:text-[#80FF00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80FF00] sm:size-10"
      >
        <ChevronRight aria-hidden="true" className="size-6 sm:size-8" />
      </button>

      <style jsx>{`
        .animate-carousel-transition {
          animation: carousel-transition 380ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        @keyframes carousel-transition {
          from {
            opacity: 0.75;
            transform: translateX(var(--carousel-entrance, 12px));
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-carousel-transition[data-direction="next"] {
          --carousel-entrance: 12px;
        }

        .animate-carousel-transition[data-direction="previous"] {
          --carousel-entrance: -12px;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-carousel-transition {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
