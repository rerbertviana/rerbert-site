import { act, renderHook } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { useController } from "@/features/character-selection/controller/useController";
import { characters } from "@/features/character-selection/data/characters";
import { useCharacterSelectionStore } from "@/features/character-selection/store/characterSelectionStore";

import { playSound } from "@/shared/lib/audio/audioManager";
import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { getDictionary } from "@/shared/i18n/get-dictionary";

import type { Locale } from "@/shared/i18n/config";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/shared/lib/audio/audioManager", () => ({
  playSound: jest.fn(),
}));

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;
const mockPlaySound = playSound as jest.Mock;
const mockUseLanguage = useLanguage as jest.Mock;

const mockPush = jest.fn();

let currentLocale: Locale = "en";

describe("Character Selection useController", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    currentLocale = "en";

    useCharacterSelectionStore.setState({
      selectedCharacterId: "rerbert",
      activeIndex: 2,
    });

    mockUseRouter.mockReturnValue({
      push: mockPush,
    });

    mockUseLanguage.mockImplementation(() => ({
      locale: currentLocale,
      dictionary: getDictionary(currentLocale),
    }));
  });

  describe("selected character", () => {
    it("should return the currently selected character", () => {
      const { result } = renderHook(() => useController());

      expect(result.current.selectedCharacterId).toBe("rerbert");
      expect(result.current.selectedCharacter).toEqual(
        characters.find((character) => character.id === "rerbert"),
      );
    });

    it("should return undefined when no character is selected", () => {
      useCharacterSelectionStore.setState({
        selectedCharacterId: null,
      });

      const { result } = renderHook(() => useController());

      expect(result.current.selectedCharacterId).toBeNull();
      expect(result.current.selectedCharacter).toBeUndefined();
      expect(result.current.selectedCharacterTranslation).toBeUndefined();
    });

    it("should return undefined when the selected character does not exist", () => {
      useCharacterSelectionStore.setState({
        selectedCharacterId: "unknown-id",
      });

      const { result } = renderHook(() => useController());

      expect(result.current.selectedCharacter).toBeUndefined();
      expect(result.current.canSelectCharacter).toBe(false);
      expect(result.current.selectedCharacterTranslation).toBeUndefined();
    });
  });

  describe("character availability", () => {
    it("should allow confirmation when the available character is selected", () => {
      const { result } = renderHook(() => useController());

      expect(result.current.canSelectCharacter).toBe(true);
    });

    it("should not allow confirmation when a locked character is selected", () => {
      useCharacterSelectionStore.setState({
        selectedCharacterId: "locked-01",
      });

      const { result } = renderHook(() => useController());

      expect(result.current.canSelectCharacter).toBe(false);
    });

    it("should not allow confirmation when no character is selected", () => {
      useCharacterSelectionStore.setState({
        selectedCharacterId: null,
      });

      const { result } = renderHook(() => useController());

      expect(result.current.canSelectCharacter).toBe(false);
    });
  });

  describe("character translation", () => {
    it("should return the translation for the selected character", () => {
      const { result } = renderHook(() => useController());

      expect(result.current.selectedCharacterTranslation).toBeDefined();
    });

    it("should update the translation when the locale changes", () => {
      const { result, rerender } = renderHook(() => useController());

      const englishTranslation = result.current.selectedCharacterTranslation;

      currentLocale = "pt-BR";

      rerender();

      expect(result.current.selectedCharacterTranslation).toBeDefined();
      expect(result.current.selectedCharacterTranslation).not.toEqual(
        englishTranslation,
      );
    });
  });

  describe("selection changes", () => {
    it("should update the selected character", () => {
      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleSelectedCharacterChange("locked-01");
      });

      expect(useCharacterSelectionStore.getState().selectedCharacterId).toBe(
        "locked-01",
      );

      expect(result.current.selectedCharacterId).toBe("locked-01");
    });

    it("should clear the selection when null is provided", () => {
      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleSelectedCharacterChange(null);
      });

      expect(
        useCharacterSelectionStore.getState().selectedCharacterId,
      ).toBeNull();

      expect(result.current.selectedCharacterId).toBeNull();
    });

    it("should enable information animation when selecting from an empty selection", () => {
      useCharacterSelectionStore.setState({
        selectedCharacterId: null,
      });

      const { result } = renderHook(() => useController());

      expect(result.current.shouldAnimateInformation).toBe(false);

      act(() => {
        result.current.handleSelectedCharacterChange("rerbert");
      });

      expect(result.current.shouldAnimateInformation).toBe(true);
      expect(result.current.selectedCharacterId).toBe("rerbert");
    });

    it("should not enable information animation when changing an existing selection", () => {
      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleSelectedCharacterChange("locked-01");
      });

      expect(result.current.shouldAnimateInformation).toBe(false);
    });
  });

  describe("confirmation", () => {
    it("should navigate to the profile page when confirming an available character", () => {
      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleConfirmSelection();
      });

      expect(mockPush).toHaveBeenCalledWith("/en/profile");
    });

    it("should play the confirmation sound when confirming an available character", () => {
      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleConfirmSelection();
      });

      expect(mockPlaySound).toHaveBeenCalledWith("buttonConfirm");
    });

    it("should disable information animation when confirming", () => {
      useCharacterSelectionStore.setState({
        selectedCharacterId: null,
      });

      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleSelectedCharacterChange("rerbert");
      });

      expect(result.current.shouldAnimateInformation).toBe(true);

      act(() => {
        result.current.handleConfirmSelection();
      });

      expect(result.current.shouldAnimateInformation).toBe(false);
    });

    it("should not navigate when confirming a locked character", () => {
      useCharacterSelectionStore.setState({
        selectedCharacterId: "locked-01",
      });

      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleConfirmSelection();
      });

      expect(mockPush).not.toHaveBeenCalled();
      expect(mockPlaySound).not.toHaveBeenCalled();
    });

    it("should navigate using the current locale", () => {
      currentLocale = "pt-BR";

      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleConfirmSelection();
      });

      expect(mockPush).toHaveBeenCalledWith("/pt-BR/profile");
    });
  });

  describe("keyboard interactions", () => {
    it("should confirm the selection using Enter", () => {
      renderHook(() => useController());

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Enter",
            bubbles: true,
            cancelable: true,
          }),
        );
      });

      expect(mockPush).toHaveBeenCalledWith("/en/profile");
      expect(mockPlaySound).toHaveBeenCalledWith("buttonConfirm");
    });

    it("should not confirm using Enter when no character is available", () => {
      useCharacterSelectionStore.setState({
        selectedCharacterId: "locked-01",
      });

      renderHook(() => useController());

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Enter",
            bubbles: true,
            cancelable: true,
          }),
        );
      });

      expect(mockPush).not.toHaveBeenCalled();
      expect(mockPlaySound).not.toHaveBeenCalled();
    });

    it("should ignore Enter when focus is on a button", () => {
      renderHook(() => useController());

      const button = document.createElement("button");
      document.body.appendChild(button);

      act(() => {
        button.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Enter",
            bubbles: true,
            cancelable: true,
          }),
        );
      });

      expect(mockPush).not.toHaveBeenCalled();

      button.remove();
    });

    it("should ignore Enter when focus is on a link", () => {
      renderHook(() => useController());

      const link = document.createElement("a");
      link.href = "#";
      document.body.appendChild(link);

      act(() => {
        link.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Enter",
            bubbles: true,
            cancelable: true,
          }),
        );
      });

      expect(mockPush).not.toHaveBeenCalled();

      link.remove();
    });

    it("should deselect the character using Escape", () => {
      renderHook(() => useController());

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
            cancelable: true,
          }),
        );
      });

      expect(
        useCharacterSelectionStore.getState().selectedCharacterId,
      ).toBeNull();

      expect(mockPlaySound).toHaveBeenCalledWith("interfaceBack");
    });

    it("should not trigger Escape behavior when no character is selected", () => {
      useCharacterSelectionStore.setState({
        selectedCharacterId: null,
      });

      renderHook(() => useController());

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
            cancelable: true,
          }),
        );
      });

      expect(mockPlaySound).not.toHaveBeenCalled();
    });

    it("should ignore Escape inside editable elements", () => {
      renderHook(() => useController());

      const input = document.createElement("input");
      document.body.appendChild(input);

      act(() => {
        input.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
            cancelable: true,
          }),
        );
      });

      expect(useCharacterSelectionStore.getState().selectedCharacterId).toBe(
        "rerbert",
      );

      expect(mockPlaySound).not.toHaveBeenCalled();

      input.remove();
    });

    it("should ignore repeated key events", () => {
      renderHook(() => useController());

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Enter",
            repeat: true,
            bubbles: true,
            cancelable: true,
          }),
        );
      });

      expect(mockPush).not.toHaveBeenCalled();
    });

    it("should ignore key events with modifier keys", () => {
      renderHook(() => useController());

      const modifierEvents = [
        { key: "Enter", altKey: true },
        { key: "Enter", ctrlKey: true },
        { key: "Enter", metaKey: true },
        { key: "Escape", altKey: true },
        { key: "Escape", ctrlKey: true },
        { key: "Escape", metaKey: true },
      ];

      modifierEvents.forEach((event) => {
        act(() => {
          window.dispatchEvent(
            new KeyboardEvent("keydown", {
              ...event,
              bubbles: true,
              cancelable: true,
            }),
          );
        });
      });

      expect(mockPush).not.toHaveBeenCalled();
      expect(mockPlaySound).not.toHaveBeenCalled();
    });

    it("should ignore events that have already been prevented", () => {
      renderHook(() => useController());

      const event = new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
        cancelable: true,
      });

      event.preventDefault();

      act(() => {
        window.dispatchEvent(event);
      });

      expect(mockPush).not.toHaveBeenCalled();
    });

    it("should ignore keyboard interactions inside textareas", () => {
      renderHook(() => useController());

      const textarea = document.createElement("textarea");
      document.body.appendChild(textarea);

      act(() => {
        textarea.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
            cancelable: true,
          }),
        );
      });

      expect(useCharacterSelectionStore.getState().selectedCharacterId).toBe(
        "rerbert",
      );

      textarea.remove();
    });

    it("should ignore keyboard interactions inside elements with textbox role", () => {
      renderHook(() => useController());

      const textbox = document.createElement("div");
      textbox.setAttribute("role", "textbox");
      textbox.contentEditable = "true";
      document.body.appendChild(textbox);

      act(() => {
        textbox.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
            cancelable: true,
          }),
        );
      });

      expect(useCharacterSelectionStore.getState().selectedCharacterId).toBe(
        "rerbert",
      );

      textbox.remove();
    });

    it("should ignore keys other than Enter and Escape", () => {
      renderHook(() => useController());

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "ArrowRight",
            bubbles: true,
            cancelable: true,
          }),
        );
      });

      expect(mockPush).not.toHaveBeenCalled();
      expect(mockPlaySound).not.toHaveBeenCalled();
    });
  });
});
