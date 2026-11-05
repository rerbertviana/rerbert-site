"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { characters } from "../data/characters";
import { CharacterCarousel } from "./CharacterCarousel";
import { CharacterInformation } from "./CharacterInformation";
import { SelectCharacterButton } from "./SelectCharacterButton";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  return Boolean(
    target.closest(
      'input, textarea, select, [contenteditable="true"], [role="textbox"]',
    ),
  );
}

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

      if (event.key === "Enter") {
        if (
          event.target instanceof HTMLElement &&
          event.target.closest("button, a, [role='button']")
        ) {
          return;
        }

        event.preventDefault();

        if (canSelectCharacter) {
          router.push("/profile");
        }
      }

      if (event.key === "Escape" && selectedCharacterId !== null) {
        event.preventDefault();
        setSelectedCharacterId(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canSelectCharacter, selectedCharacterId, router]);

  return (
    <div className="flex flex-1 flex-col">
      <CharacterCarousel
        selectedCharacterId={selectedCharacterId}
        onSelectedCharacterChange={setSelectedCharacterId}
      />

      <CharacterInformation profile={selectedCharacter?.profile} />

      <SelectCharacterButton
        disabled={!canSelectCharacter}
        onClick={handleConfirmSelection}
      />
    </div>
  );
}
