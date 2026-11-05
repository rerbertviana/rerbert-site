"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { characters } from "../data/characters";
import { CharacterCarousel } from "./CharacterCarousel";
import { CharacterInformation } from "./CharacterInformation";
import { SelectCharacterButton } from "./SelectCharacterButton";

export function CharacterSelectionContent() {
  const router = useRouter();

  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    "rerbert",
  );

  const selectedCharacter = characters.find(
    (character) => character.id === selectedCharacterId,
  );

  const canSelectCharacter = selectedCharacter?.status === "available";

  function handleConfirmSelection() {
    if (!canSelectCharacter) return;

    router.push("/profile");
  }

  return (
    <>
      <CharacterCarousel
        selectedCharacterId={selectedCharacterId}
        onSelectedCharacterChange={setSelectedCharacterId}
      />

      <CharacterInformation profile={selectedCharacter?.profile} />

      <SelectCharacterButton
        disabled={!canSelectCharacter}
        onClick={handleConfirmSelection}
      />
    </>
  );
}
