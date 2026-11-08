"use client";

import { useController } from "../controller/useController";

import { CharacterCarousel } from "../components/character-carousel/View";
import { CharacterInformation } from "../components/character-information/View";
import { SelectCharacterButton } from "../components/select-character-button/View";
import { SelectionTitle } from "../components/selection-title/View";

export function View() {
  const {
    selectedCharacterId,
    handleSelectedCharacterChange,
    selectedCharacter,
    selectedCharacterTranslation,
    canSelectCharacter,
    handleConfirmSelection,
    shouldAnimateInformation,
  } = useController();

  return (
    <div className="flex flex-1 flex-col">
      <SelectionTitle />

      <CharacterCarousel
        selectedCharacterId={selectedCharacterId}
        onSelectedCharacterChange={handleSelectedCharacterChange}
      />

      <CharacterInformation
        profile={selectedCharacter?.profile}
        localizedSeniority={selectedCharacterTranslation?.seniority}
        localizedExperience={selectedCharacterTranslation?.experience}
        localizedEducation={selectedCharacterTranslation?.education}
        shouldAnimate={shouldAnimateInformation}
      />

      <SelectCharacterButton
        disabled={!canSelectCharacter}
        onClick={handleConfirmSelection}
      />
    </div>
  );
}
