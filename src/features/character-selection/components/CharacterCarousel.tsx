"use client";

import { useState } from "react";

import { characters } from "../data/characters";
import { CharacterCard } from "./CharacterCard";

export function CharacterCarousel() {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null,
  );

  function handleCharacterSelect(characterId: string) {
    setSelectedCharacterId((currentId) =>
      currentId === characterId ? null : characterId,
    );
  }

  return (
    <section
      aria-label="Character carousel"
      className="mx-auto flex w-full max-w-[1440px] items-center justify-center gap-3 px-4 sm:gap-5"
    >
      <button
        type="button"
        aria-label="Previous character"
        disabled
        className="shrink-0 text-white disabled:opacity-40"
      >
        Previous
      </button>

      <div className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div className="mx-auto flex w-max min-w-full items-end justify-center gap-3 px-2 py-12 sm:gap-4 md:gap-5">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              isSelected={selectedCharacterId === character.id}
              onSelect={() => handleCharacterSelect(character.id)}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Next character"
        disabled
        className="shrink-0 text-white disabled:opacity-40"
      >
        Next
      </button>
    </section>
  );
}
