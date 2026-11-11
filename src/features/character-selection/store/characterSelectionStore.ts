import { create } from "zustand";

interface CharacterSelectionState {
  selectedCharacterId: string | null;
  activeIndex: number;
  setSelectedCharacterId: (characterId: string | null) => void;
  setActiveIndex: (index: number | ((currentIndex: number) => number)) => void;
}

const INITIAL_CHARACTER_ID = "rerbert";
const INITIAL_ACTIVE_INDEX = 2;

export const useCharacterSelectionStore = create<CharacterSelectionState>(
  (set) => ({
    selectedCharacterId: INITIAL_CHARACTER_ID,
    activeIndex: INITIAL_ACTIVE_INDEX,

    setSelectedCharacterId: (characterId) =>
      set({ selectedCharacterId: characterId }),

    setActiveIndex: (index) =>
      set((state) => ({
        activeIndex:
          typeof index === "function" ? index(state.activeIndex) : index,
      })),
  }),
);
