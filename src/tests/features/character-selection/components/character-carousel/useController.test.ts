import { act, renderHook } from "@testing-library/react";

import { useController } from "@/features/character-selection/components/character-carousel/useController";
import { characters } from "@/features/character-selection/data/characters";
import { useCharacterSelectionStore } from "@/features/character-selection/store/characterSelectionStore";

import { playSound } from "@/shared/lib/audio/audioManager";
import { useLanguage } from "@/shared/i18n/LanguageProvider";

import type { MouseEvent, PointerEvent } from "react";

jest.mock("@/shared/lib/audio/audioManager", () => ({
  playSound: jest.fn(),
}));

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: jest.fn(),
}));

const mockPlaySound = playSound as jest.Mock;
const mockUseLanguage = useLanguage as jest.Mock;

const mockTranslations = {
  characterSelection: {
    title: "Character Selection",
  },
};

describe("Character Carousel useController", () => {
  let selectedCharacterId: string | null;
  const mockOnSelectedCharacterChange = jest.fn();

  function renderController() {
    return renderHook(() =>
      useController({
        selectedCharacterId,
        onSelectedCharacterChange: mockOnSelectedCharacterChange,
      }),
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();

    selectedCharacterId = "rerbert";

    useCharacterSelectionStore.setState({
      activeIndex: 2,
      selectedCharacterId: "rerbert",
    });

    mockUseLanguage.mockReturnValue({
      dictionary: mockTranslations,
    });
  });

  describe("visible characters", () => {
    it("should return the previous, current and next characters", () => {
      const { result } = renderController();

      expect(result.current.visibleCharacters).toHaveLength(3);

      expect(
        result.current.visibleCharacters.map(({ character }) => character.id),
      ).toEqual(["locked-02", "rerbert", "locked-03"]);
    });

    it("should return characters using circular navigation at the beginning", () => {
      useCharacterSelectionStore.setState({
        activeIndex: 0,
      });

      const { result } = renderController();

      expect(
        result.current.visibleCharacters.map(({ character }) => character.id),
      ).toEqual(["locked-04", "locked-01", "locked-02"]);
    });

    it("should return characters using circular navigation at the end", () => {
      useCharacterSelectionStore.setState({
        activeIndex: characters.length - 1,
      });

      const { result } = renderController();

      expect(
        result.current.visibleCharacters.map(({ character }) => character.id),
      ).toEqual(["locked-03", "locked-04", "locked-01"]);
    });
  });

  describe("navigation", () => {
    it("should navigate to the next character", () => {
      const { result } = renderController();

      act(() => {
        result.current.handleNext();
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(3);

      expect(result.current.navigationDirection).toBe("next");

      expect(mockPlaySound).toHaveBeenCalledWith("characterNavigation");
    });

    it("should navigate to the previous character", () => {
      const { result } = renderController();

      act(() => {
        result.current.handlePrevious();
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(1);

      expect(result.current.navigationDirection).toBe("previous");

      expect(mockPlaySound).toHaveBeenCalledWith("characterNavigation");
    });

    it("should wrap around to the first character when navigating next from the last", () => {
      useCharacterSelectionStore.setState({
        activeIndex: characters.length - 1,
      });

      const { result } = renderController();

      act(() => {
        result.current.handleNext();
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(0);
    });

    it("should wrap around to the last character when navigating previous from the first", () => {
      useCharacterSelectionStore.setState({
        activeIndex: 0,
      });

      const { result } = renderController();

      act(() => {
        result.current.handlePrevious();
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(
        characters.length - 1,
      );
    });
  });

  describe("character selection", () => {
    it("should select a character and update the active index", () => {
      const { result } = renderController();

      act(() => {
        result.current.handleCharacterSelect("locked-03", 3);
      });

      expect(mockOnSelectedCharacterChange).toHaveBeenCalledWith("locked-03");

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(3);

      expect(mockPlaySound).toHaveBeenCalledWith("characterSelect");
    });

    it("should deselect the currently selected character", () => {
      const { result } = renderController();

      act(() => {
        result.current.handleCharacterSelect("rerbert", 2);
      });

      expect(mockOnSelectedCharacterChange).toHaveBeenCalledWith(null);

      expect(mockPlaySound).toHaveBeenCalledWith("interfaceBack");

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(2);
    });
  });

  describe("keyboard navigation", () => {
    it("should navigate to the previous character using ArrowLeft", () => {
      renderController();

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "ArrowLeft",
            bubbles: true,
          }),
        );
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(1);

      expect(mockPlaySound).toHaveBeenCalledWith("characterNavigation");
    });

    it("should navigate to the next character using ArrowRight", () => {
      renderController();

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "ArrowRight",
            bubbles: true,
          }),
        );
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(3);
    });

    it("should ignore repeated key events", () => {
      renderController();

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "ArrowRight",
            repeat: true,
          }),
        );
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(2);

      expect(mockPlaySound).not.toHaveBeenCalled();
    });

    it("should ignore key events with modifier keys", () => {
      renderController();

      const modifierEvents = [
        { key: "ArrowRight", altKey: true },
        { key: "ArrowRight", ctrlKey: true },
        { key: "ArrowRight", metaKey: true },
      ];

      modifierEvents.forEach((event) => {
        act(() => {
          window.dispatchEvent(
            new KeyboardEvent("keydown", {
              ...event,
              bubbles: true,
            }),
          );
        });
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(2);

      expect(mockPlaySound).not.toHaveBeenCalled();
    });

    it("should ignore key events when the event is already prevented", () => {
      renderController();

      const event = new KeyboardEvent("keydown", {
        key: "ArrowRight",
        bubbles: true,
        cancelable: true,
      });

      event.preventDefault();

      act(() => {
        window.dispatchEvent(event);
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(2);
    });

    it("should ignore keyboard navigation inside editable elements", () => {
      renderController();

      const input = document.createElement("input");
      document.body.appendChild(input);

      act(() => {
        input.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "ArrowRight",
            bubbles: true,
          }),
        );
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(2);

      expect(mockPlaySound).not.toHaveBeenCalled();

      input.remove();
    });

    it("should ignore keys other than ArrowLeft and ArrowRight", () => {
      renderController();

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Enter",
            bubbles: true,
          }),
        );
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(2);

      expect(mockPlaySound).not.toHaveBeenCalled();
    });
  });

  describe("pointer navigation", () => {
    function createPointerEvent(clientX: number, isPrimary = true) {
      return {
        clientX,
        isPrimary,
      } as PointerEvent<HTMLDivElement>;
    }

    it("should navigate next when swiping left beyond the threshold", () => {
      const { result } = renderController();

      act(() => {
        result.current.handlePointerDown(createPointerEvent(200));

        result.current.handlePointerUp(createPointerEvent(100));
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(3);

      expect(mockPlaySound).toHaveBeenCalledWith("characterNavigation");
    });

    it("should navigate previous when swiping right beyond the threshold", () => {
      const { result } = renderController();

      act(() => {
        result.current.handlePointerDown(createPointerEvent(100));

        result.current.handlePointerUp(createPointerEvent(200));
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(1);
    });

    it("should not navigate when the swipe distance is below the threshold", () => {
      const { result } = renderController();

      act(() => {
        result.current.handlePointerDown(createPointerEvent(100));

        result.current.handlePointerUp(createPointerEvent(130));
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(2);

      expect(mockPlaySound).not.toHaveBeenCalled();
    });

    it("should not start tracking a non-primary pointer", () => {
      const { result } = renderController();

      act(() => {
        result.current.handlePointerDown(createPointerEvent(100, false));

        result.current.handlePointerUp(createPointerEvent(200));
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(2);
    });

    it("should reset pointer tracking when pointer is cancelled", () => {
      const { result } = renderController();

      act(() => {
        result.current.handlePointerDown(createPointerEvent(100));

        result.current.handlePointerCancel();

        result.current.handlePointerUp(createPointerEvent(200));
      });

      expect(useCharacterSelectionStore.getState().activeIndex).toBe(2);
    });

    it("should suppress the click following a successful swipe", () => {
      const { result } = renderController();

      act(() => {
        result.current.handlePointerDown(createPointerEvent(200));

        result.current.handlePointerUp(createPointerEvent(100));
      });

      const mockPreventDefault = jest.fn();
      const mockStopPropagation = jest.fn();

      const clickEvent = {
        preventDefault: mockPreventDefault,
        stopPropagation: mockStopPropagation,
      } as unknown as MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleClickCapture(clickEvent);
      });

      expect(mockPreventDefault).toHaveBeenCalled();
      expect(mockStopPropagation).toHaveBeenCalled();
    });

    it("should not suppress clicks when no swipe occurred", () => {
      const { result } = renderController();

      const mockPreventDefault = jest.fn();
      const mockStopPropagation = jest.fn();

      const clickEvent = {
        preventDefault: mockPreventDefault,
        stopPropagation: mockStopPropagation,
      } as unknown as MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleClickCapture(clickEvent);
      });

      expect(mockPreventDefault).not.toHaveBeenCalled();
      expect(mockStopPropagation).not.toHaveBeenCalled();
    });
  });

  it("should expose the character selection translations", () => {
    const { result } = renderController();

    expect(result.current.translations).toBe(
      mockTranslations.characterSelection,
    );
  });
});
