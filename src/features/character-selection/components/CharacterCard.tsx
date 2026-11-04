import Image from "next/image";
import { LockKeyhole } from "lucide-react";

import type { Character } from "../types/character";

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  onSelect: () => void;
}

export function CharacterCard({
  character,
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
      aria-label={
        isLocked ? "Locked character" : `${character.name}, ${character.role}`
      }
      aria-pressed={isSelected}
      className={`
        group relative z-0 block shrink-0 aspect-[3/4] text-center
        transition-all duration-300 ease-out
        ${
          isSelected
            ? "z-10 w-[clamp(180px,20vw,260px)] scale-[1.03]"
            : "w-[clamp(110px,12vw,170px)]"
        }
        ${
          isLocked
            ? "cursor-not-allowed"
            : "cursor-pointer hover:z-20 hover:scale-[1.02]"
        }
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#80FF00] focus-visible:ring-offset-4
        focus-visible:ring-offset-[#080516]
      `}
    >
      {/* Card border */}
      <div
        className={`
          relative z-10 h-full w-full
          transition-[background-color,filter] duration-300 ease-out
          ${
            isSelected
              ? "bg-[#80FF00] p-[3px]"
              : isLocked
                ? "bg-[#777387]/50 p-[4px]"
                : "bg-[#777387]/50 p-[4px] group-hover:bg-[#80FF00]"
          }
        `}
        style={{
          clipPath: cardClipPath,
          filter: isSelected ? greenGlow : undefined,
        }}
      >
        {/* Card content */}
        <div
          className="relative h-full w-full overflow-hidden bg-[#100C24]"
          style={{ clipPath: cardClipPath }}
        >
          <Image
            src={character.image}
            alt={
              isLocked
                ? "Locked character silhouette"
                : `${character.name} character illustration`
            }
            fill
            sizes={
              isSelected
                ? "(max-width: 768px) 180px, 260px"
                : "(max-width: 768px) 110px, 170px"
            }
            priority={character.id === "rerbert"}
            className={`
              object-cover object-top
              transition-all duration-500
              ${
                isSelected
                  ? "grayscale-0 brightness-100"
                  : "grayscale brightness-[0.45] contrast-90"
              }
            `}
          />

          {/* Bottom gradient overlay */}
          <div
            aria-hidden="true"
            className={`
              absolute inset-0
              ${
                isSelected
                  ? "bg-gradient-to-t from-[#080516] via-[#080516]/90 via-[22%] to-transparent"
                  : "bg-gradient-to-t from-[#080516] via-[#080516]/100 via-[25%] to-[#080516]/40"
              }
            `}
          />

          {/* Scanline effect for unselected cards */}
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

          {/* Locked icon */}
          {isLocked && (
            <div className="absolute inset-x-0 top-[64%] z-10 flex justify-center">
              <LockKeyhole
                aria-hidden="true"
                size={30}
                className="text-[#AAA6BB] drop-shadow-[0_0_5px_rgba(0,0,0,0.7)]"
              />
            </div>
          )}

          {/* Bottom information */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-center px-2 pb-4 pt-3 text-center">
            {/* Decorative gradient divider */}
            {!isLocked && (
              <svg
                aria-hidden="true"
                className={`
                  pointer-events-none absolute inset-x-0 top-0 h-2 w-full
                  transition-[filter] duration-500
                  ${isSelected ? "grayscale-0" : "grayscale"}
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
              <p className="font-[family-name:var(--font-oxanium)] text-sm font-bold tracking-wider text-[#AAA6BB]">
                LOCKED
              </p>
            ) : (
              <>
                <h3 className="font-[family-name:var(--font-oxanium)] text-base font-bold uppercase tracking-wide text-white not-italic sm:text-xl">
                  {character.name}
                </h3>

                <p
                  className={`mt-1 text-xs font-medium sm:text-sm ${
                    isSelected ? "text-[#80FF00]" : "text-gray-400"
                  }`}
                >
                  {character.role}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hover glow */}
      {!isLocked && !isSelected && (
        <style jsx>{`
          button:hover > div {
            filter: ${greenGlow};
          }
        `}</style>
      )}
    </button>
  );
}
