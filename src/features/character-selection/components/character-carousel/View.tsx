"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { getCharacterTranslation } from "../../utils/getCharacterTranslation";
import { CharacterCard } from "../character-card/View";

import { useController, type CharacterCarouselProps } from "./useController";

export function CharacterCarousel(props: CharacterCarouselProps) {
  const {
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
  } = useController(props);

  if (visibleCharacters.length === 0) return null;

  return (
    <section
      aria-label={translations.carousel.label}
      className="mx-auto mt-0 flex w-full max-w-[1100px] items-center justify-center gap-2 px-2 sm:gap-4 sm:px-4"
    >
      <button
        type="button"
        aria-label={translations.carousel.previousCharacter}
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
          key={visibleCharacters[1]?.characterIndex}
          data-direction={navigationDirection}
          className="flex items-end justify-center gap-2 px-1 pt-6 pb-10 sm:gap-4 md:gap-5 animate-carousel-transition"
        >
          {visibleCharacters.map(({ character, characterIndex }) => {
            const isSelected = props.selectedCharacterId === character.id;
            const isLocked = character.status === "locked";

            const characterTranslation = getCharacterTranslation(
              character.id,
              character.name,
              translations.characters,
            );

            return (
              <div
                key={character.id}
                className={`
                  relative flex shrink-0 items-end justify-center
                  origin-bottom
                  transition-transform duration-300 ease-out
                  ${
                    isSelected
                      ? "z-20 scale-[1.08]"
                      : isLocked
                        ? "z-0 scale-100"
                        : "z-0 scale-100 hover:z-20 hover:scale-[1.08]"
                  }
                `}
              >
                <CharacterCard
                  character={character}
                  name={characterTranslation.name}
                  role={characterTranslation.role}
                  lockedLabel={translations.card.locked}
                  lockedCharacterLabel={translations.card.lockedCharacter}
                  illustrationLabel={translations.card.characterIllustration}
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
        aria-label={translations.carousel.nextCharacter}
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
