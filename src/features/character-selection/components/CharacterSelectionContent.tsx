"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { characters } from "../data/characters";
import { CharacterCarousel } from "./CharacterCarousel";
import { CharacterInformation } from "./CharacterInformation";
import { SelectCharacterButton } from "./SelectCharacterButton";

const DEFAULT_SELECTED_CHARACTER_ID = "rerbert";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.isContentEditable ||
    Boolean(target.closest('input, textarea, select, [role="textbox"]'))
  );
}

export function CharacterSelectionContent() {
  const router = useRouter();

  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    DEFAULT_SELECTED_CHARACTER_ID,
  );

  const selectedCharacter = characters.find(
    (character) => character.id === selectedCharacterId,
  );

  const canSelectCharacter = selectedCharacter?.status === "available";

  const handleConfirmSelection = useCallback(() => {
    if (!canSelectCharacter) return;

    router.push("/profile");
  }, [canSelectCharacter, router]);

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
        handleConfirmSelection();
        return;
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
  }, [handleConfirmSelection, selectedCharacterId]);

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
