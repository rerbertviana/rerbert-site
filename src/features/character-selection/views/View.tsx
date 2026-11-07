"use client";

import { useController } from "../controller/useController";

import { CharacterCarousel } from "../components/character-carousel/View";
import { CharacterInformation } from "../components/character-information/View";
import { SelectCharacterButton } from "../components/select-character-button/View";
import { SelectionTitle } from "../components/selection-title/View";

export function View() {
  const {
    selectedCharacterId,
    setSelectedCharacterId,
    selectedCharacter,
    selectedCharacterTranslation,
    canSelectCharacter,
    handleConfirmSelection,
  } = useController();

  return (
    <div className="flex flex-1 flex-col">
      <SelectionTitle />

      <CharacterCarousel
        selectedCharacterId={selectedCharacterId}
        onSelectedCharacterChange={setSelectedCharacterId}
      />

      <CharacterInformation
        profile={selectedCharacter?.profile}
        localizedSeniority={selectedCharacterTranslation?.seniority}
        localizedExperience={selectedCharacterTranslation?.experience}
        localizedEducation={selectedCharacterTranslation?.education}
      />

      <SelectCharacterButton
        disabled={!canSelectCharacter}
        onClick={handleConfirmSelection}
      />
    </div>
  );
}
