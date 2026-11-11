"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { playSound } from "@/shared/lib/audio/audioManager";
import { useLanguage } from "@/shared/i18n/LanguageProvider";

import { characters } from "../data/characters";
import { useCharacterSelectionStore } from "../store/characterSelectionStore";
import { getCharacterTranslation } from "../utils/getCharacterTranslation";

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.isContentEditable ||
    Boolean(target.closest('input, textarea, select, [role="textbox"]'))
  );
}

export function useController() {
  const router = useRouter();
  const { locale, dictionary } = useLanguage();

  const selectedCharacterId = useCharacterSelectionStore(
    (state) => state.selectedCharacterId,
  );

  const setSelectedCharacterId = useCharacterSelectionStore(
    (state) => state.setSelectedCharacterId,
  );

  const [shouldAnimateInformation, setShouldAnimateInformation] =
    useState(false);

  const selectedCharacter = characters.find(
    (character) => character.id === selectedCharacterId,
  );

  const canSelectCharacter = selectedCharacter?.status === "available";

  const selectedCharacterTranslation = selectedCharacter
    ? getCharacterTranslation(
        selectedCharacter.id,
        selectedCharacter.name,
        dictionary.characterSelection.characters,
      )
    : undefined;

  const handleSelectedCharacterChange = useCallback(
    (characterId: string | null) => {
      if (selectedCharacterId === null && characterId !== null) {
        setShouldAnimateInformation(true);
      }

      setSelectedCharacterId(characterId);
    },
    [selectedCharacterId, setSelectedCharacterId],
  );

  const handleConfirmSelection = useCallback(() => {
    if (!canSelectCharacter) return;

    setShouldAnimateInformation(false);

    playSound("buttonConfirm");
    router.push(`/${locale}/profile`);
  }, [canSelectCharacter, locale, router]);

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
        playSound("interfaceBack");
        setSelectedCharacterId(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleConfirmSelection, selectedCharacterId, setSelectedCharacterId]);

  return {
    selectedCharacterId,
    handleSelectedCharacterChange,
    selectedCharacter,
    selectedCharacterTranslation,
    canSelectCharacter,
    handleConfirmSelection,
    shouldAnimateInformation,
  };
}
