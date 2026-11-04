"use client";

import { useState } from "react";

import { characters } from "../data/characters";
import { CharacterCarousel } from "./CharacterCarousel";
import { CharacterInformation } from "./CharacterInformation";

export function CharacterSelectionContent() {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null,
  );

  const selectedCharacter = characters.find(
    (character) => character.id === selectedCharacterId,
  );

  return (
    <>
      <CharacterCarousel
        selectedCharacterId={selectedCharacterId}
        onSelectedCharacterChange={setSelectedCharacterId}
      />

      <CharacterInformation profile={selectedCharacter?.profile} />
    </>
  );
}
