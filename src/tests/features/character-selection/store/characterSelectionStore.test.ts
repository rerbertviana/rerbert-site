import { useCharacterSelectionStore } from "@/features/character-selection/store/characterSelectionStore";

describe("characterSelectionStore", () => {
  beforeEach(() => {
    useCharacterSelectionStore.setState(
      useCharacterSelectionStore.getInitialState(),
    );
  });

  it("should have the correct initial state", () => {
    const state = useCharacterSelectionStore.getState();

    expect(state.selectedCharacterId).toBe("rerbert");
    expect(state.activeIndex).toBe(2);
  });

  it("should update the selected character ID", () => {
    useCharacterSelectionStore
      .getState()
      .setSelectedCharacterId("other-character");

    expect(useCharacterSelectionStore.getState().selectedCharacterId).toBe(
      "other-character",
    );
  });

  it("should clear the selected character ID", () => {
    useCharacterSelectionStore.getState().setSelectedCharacterId(null);

    expect(
      useCharacterSelectionStore.getState().selectedCharacterId,
    ).toBeNull();
  });

  it("should update the active index using a direct value", () => {
    useCharacterSelectionStore.getState().setActiveIndex(5);

    expect(useCharacterSelectionStore.getState().activeIndex).toBe(5);
  });

  it("should update the active index using a function", () => {
    useCharacterSelectionStore
      .getState()
      .setActiveIndex((currentIndex) => currentIndex + 1);

    expect(useCharacterSelectionStore.getState().activeIndex).toBe(3);
  });

  it("should calculate the active index based on the current state", () => {
    useCharacterSelectionStore.getState().setActiveIndex(10);

    useCharacterSelectionStore
      .getState()
      .setActiveIndex((currentIndex) => currentIndex + 2);

    expect(useCharacterSelectionStore.getState().activeIndex).toBe(12);
  });
});
