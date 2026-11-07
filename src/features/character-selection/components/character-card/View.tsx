import Image from "next/image";
import { LockKeyhole } from "lucide-react";

import type { Character } from "../../types/character";

interface CharacterCardProps {
  character: Character;
  name: string;
  role: string;
  lockedLabel: string;
  lockedCharacterLabel: string;
  illustrationLabel: string;
  isSelected: boolean;
  onSelect: () => void;
}

const ACTIVE_BORDER_GRADIENT =
  "bg-[linear-gradient(90deg,#80FF00_0%,#BFFF80_35%,#FFFFFF_50%,#BFFF80_65%,#80FF00_100%)]";

export function CharacterCard({
  character,
  name,
  role,
  lockedLabel,
  lockedCharacterLabel,
  illustrationLabel,
  isSelected,
  onSelect,
}: CharacterCardProps) {
  const isLocked = character.status === "locked";

  const cardClipPath =
    "polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)";

  const greenGlow =
    "drop-shadow(0 0 5px rgba(128,255,0,0.9)) drop-shadow(0 0 14px rgba(128,255,0,0.65)) drop-shadow(0 0 24px rgba(128,255,0,0.3))";

  return (
    <button
      type="button"
      disabled={isLocked}
      onClick={onSelect}
      aria-label={isLocked ? lockedCharacterLabel : `${name}, ${role}`}
      aria-pressed={isLocked ? undefined : isSelected}
      data-selected={isSelected}
      className={`
        group relative z-0 block w-[clamp(88px,22vw,220px)] shrink-0 aspect-[3/4] text-center
        transition-[filter] duration-300 ease-out
        ${isSelected ? "z-10" : ""}
        ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#80FF00] focus-visible:ring-offset-4
        focus-visible:ring-offset-[#080516]
      `}
    >
      <div
        className={`
          relative z-10 h-full w-full
          transition-[filter] duration-300 ease-out
          ${
            isSelected
              ? `${ACTIVE_BORDER_GRADIENT} p-[3px]`
              : isLocked
                ? "bg-[#777387]/50 p-[4px]"
                : "bg-[#777387]/50 p-[4px] group-hover:bg-[linear-gradient(90deg,#80FF00_0%,#BFFF80_35%,#FFFFFF_50%,#BFFF80_65%,#80FF00_100%)]"
          }
        `}
        style={{
          clipPath: cardClipPath,
          filter: isSelected ? greenGlow : undefined,
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden bg-[#100C24]"
          style={{ clipPath: cardClipPath }}
        >
          <Image
            src={character.image}
            alt={
              isLocked ? lockedCharacterLabel : `${name} ${illustrationLabel}`
            }
            fill
            sizes="(max-width: 768px) 22vw, 220px"
            priority={character.id === "rerbert"}
            className={`
              object-cover object-top
              transition-[filter] duration-500
              ${
                isSelected
                  ? "grayscale-0 brightness-100"
                  : isLocked
                    ? "grayscale brightness-[0.45] contrast-90"
                    : "grayscale brightness-[0.45] contrast-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100"
              }
            `}
          />

          <div
            aria-hidden="true"
            className={`
              absolute inset-0
              ${
                isSelected
                  ? "bg-gradient-to-t from-[#080516] via-[#080516]/95 via-[22%] to-transparent"
                  : "bg-gradient-to-t from-[#080516] via-[#080516]/100 via-[25%] to-[#080516]/40"
              }
            `}
          />

          {!isSelected && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,255,255,0.25) 4px)",
              }}
            />
          )}

          {isLocked && (
            <div className="absolute inset-x-0 top-[42%] z-10 flex justify-center sm:top-[46%]">
              <LockKeyhole
                aria-hidden="true"
                className="h-8 w-8 text-[#AAA6BB] drop-shadow-[0_0_5px_rgba(0,0,0,0.7)] sm:h-9 sm:w-9"
              />
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-center px-2 pb-4 pt-3 text-center sm:px-3 md:px-4">
            {!isLocked && (
              <svg
                aria-hidden="true"
                className={`
                  pointer-events-none absolute inset-x-0 top-0 h-2 w-full
                  transition-[filter] duration-500
                  ${
                    isSelected
                      ? "grayscale-0"
                      : "grayscale group-hover:grayscale-0"
                  }
                `}
                viewBox="0 0 340 8"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id={`character-divider-${character.id}`}
                    x1="0"
                    y1="0"
                    x2="340"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#A855F7" stopOpacity="1" />
                    <stop offset="25%" stopColor="#A855F7" stopOpacity="0.95" />
                    <stop offset="48%" stopColor="#80FF00" stopOpacity="1" />
                    <stop offset="72%" stopColor="#80FF00" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#80FF00" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <path
                  d="M0 1 H340"
                  fill="none"
                  stroke={`url(#character-divider-${character.id})`}
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            )}

            {isLocked ? (
              <p className="hidden font-[family-name:var(--font-oxanium)] text-sm font-bold tracking-wider text-[#AAA6BB] sm:block">
                {lockedLabel}
              </p>
            ) : (
              <>
                <h3 className="w-full break-words font-[family-name:var(--font-oxanium)] text-[clamp(0.65rem,1.1vw,1.25rem)] font-bold uppercase leading-tight tracking-wide text-white not-italic">
                  {name}
                </h3>

                <p
                  className={`
                    mt-1 w-full break-words
                    text-[clamp(0.55rem,0.85vw,0.875rem)]
                    font-medium leading-tight
                    transition-colors duration-300
                    ${
                      isSelected
                        ? "text-[#80FF00]"
                        : isLocked
                          ? "text-gray-400"
                          : "text-gray-400 group-hover:text-[#80FF00]"
                    }
                  `}
                >
                  {role}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
