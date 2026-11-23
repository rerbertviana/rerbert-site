import { act, renderHook } from "@testing-library/react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { toggleAudio, playSound } from "@/shared/lib/audio/audioManager";
import { useAudioEnabled } from "@/shared/lib/audio/useAudioEnabled";

import { useController } from "@/shared/components/layout/site-header/useController";

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: jest.fn(),
}));

jest.mock("@/shared/lib/audio/audioManager", () => ({
  playSound: jest.fn(),
  toggleAudio: jest.fn(),
}));

jest.mock("@/shared/lib/audio/useAudioEnabled", () => ({
  useAudioEnabled: jest.fn(),
}));

const mockUseLanguage = useLanguage as jest.Mock;
const mockToggleAudio = toggleAudio as jest.Mock;
const mockPlaySound = playSound as jest.Mock;
const mockUseAudioEnabled = useAudioEnabled as jest.Mock;

type ControllerResult = ReturnType<typeof useController>;

type HookResult = {
  current: ControllerResult;
};

describe("Site Header useController", () => {
  const mockChangeLanguage = jest.fn();

  const mockDictionary = {
    header: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseLanguage.mockReturnValue({
      locale: "en",
      dictionary: mockDictionary,
      resumeUrl: "/resume/rerbert-cv-english.pdf",
      changeLanguage: mockChangeLanguage,
    });

    mockUseAudioEnabled.mockReturnValue(true);
  });

  // --------------------------------------------------
  // Initial state and values
  // --------------------------------------------------

  describe("initial state", () => {
    it("should provide the language context values", () => {
      const { result } = renderHook(() => useController());

      expect(result.current.locale).toBe("en");
      expect(result.current.dictionary).toBe(mockDictionary);
      expect(result.current.resumeUrl).toBe("/resume/rerbert-cv-english.pdf");
    });

    it("should provide the current audio enabled state", () => {
      mockUseAudioEnabled.mockReturnValue(true);

      const { result } = renderHook(() => useController());

      expect(result.current.isSoundEnabled).toBe(true);
    });

    it("should provide the current audio disabled state", () => {
      mockUseAudioEnabled.mockReturnValue(false);

      const { result } = renderHook(() => useController());

      expect(result.current.isSoundEnabled).toBe(false);
    });

    it("should initialize the language menu as closed", () => {
      const { result } = renderHook(() => useController());

      expect(result.current.isLanguageMenuOpen).toBe(false);
    });
  });

  // --------------------------------------------------
  // Audio
  // --------------------------------------------------

  describe("audio", () => {
    it("should toggle audio when handleSoundToggle is called", async () => {
      mockToggleAudio.mockResolvedValue(undefined);

      const { result } = renderHook(() => useController());

      await act(async () => {
        await result.current.handleSoundToggle();
      });

      expect(mockToggleAudio).toHaveBeenCalledTimes(1);
    });
  });

  // --------------------------------------------------
  // Language menu toggle
  // --------------------------------------------------

  describe("language menu toggle", () => {
    it("should open the language menu", () => {
      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleLanguageMenuToggle();
      });

      expect(result.current.isLanguageMenuOpen).toBe(true);
      expect(mockPlaySound).toHaveBeenCalledWith("interfaceOpen");
    });

    it("should close the language menu", () => {
      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleLanguageMenuToggle();
      });

      act(() => {
        result.current.handleLanguageMenuToggle();
      });

      expect(result.current.isLanguageMenuOpen).toBe(false);
      expect(mockPlaySound).toHaveBeenLastCalledWith("interfaceClose");
    });

    it("should play the corresponding sound when opening and closing the menu", () => {
      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleLanguageMenuToggle();
      });

      act(() => {
        result.current.handleLanguageMenuToggle();
      });

      expect(mockPlaySound).toHaveBeenNthCalledWith(1, "interfaceOpen");

      expect(mockPlaySound).toHaveBeenNthCalledWith(2, "interfaceClose");
    });
  });

  // --------------------------------------------------
  // Language change
  // --------------------------------------------------

  describe("language change", () => {
    it("should change to another language", () => {
      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleLanguageChange("pt-BR");
      });

      expect(mockChangeLanguage).toHaveBeenCalledWith("pt-BR");
      expect(result.current.isLanguageMenuOpen).toBe(false);
      expect(mockPlaySound).toHaveBeenCalledWith("interfaceClose");
    });

    it("should close the menu when changing language", () => {
      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleLanguageMenuToggle();
      });

      act(() => {
        result.current.handleLanguageChange("pt-BR");
      });

      expect(result.current.isLanguageMenuOpen).toBe(false);
    });

    it("should not call changeLanguage when selecting the current language", () => {
      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleLanguageChange("en");
      });

      expect(mockChangeLanguage).not.toHaveBeenCalled();
      expect(result.current.isLanguageMenuOpen).toBe(false);
    });

    it("should play the closing sound when selecting the current language", () => {
      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleLanguageChange("en");
      });

      expect(mockPlaySound).toHaveBeenCalledWith("interfaceClose");
    });

    it("should return focus to the language button when selecting the current language", () => {
      const { result } = renderHook(() => useController());

      const languageButton = document.createElement("button");

      result.current.languageButtonRef.current = languageButton;

      const focusSpy = jest.spyOn(languageButton, "focus");

      act(() => {
        result.current.handleLanguageChange("en");
      });

      expect(focusSpy).toHaveBeenCalled();
    });

    it("should not return focus to the language button when changing to another language", () => {
      const { result } = renderHook(() => useController());

      const languageButton = document.createElement("button");

      result.current.languageButtonRef.current = languageButton;

      const focusSpy = jest.spyOn(languageButton, "focus");

      act(() => {
        result.current.handleLanguageChange("pt-BR");
      });

      expect(focusSpy).not.toHaveBeenCalled();
      expect(mockChangeLanguage).toHaveBeenCalledWith("pt-BR");
    });
  });

  // --------------------------------------------------
  // Language menu keyboard navigation
  // --------------------------------------------------

  describe("language menu keyboard navigation", () => {
    function createMenu(result: HookResult) {
      const menu = document.createElement("div");

      const firstOption = document.createElement("button");
      firstOption.setAttribute("role", "menuitemradio");
      firstOption.setAttribute("aria-checked", "true");

      const secondOption = document.createElement("button");
      secondOption.setAttribute("role", "menuitemradio");
      secondOption.setAttribute("aria-checked", "false");

      const thirdOption = document.createElement("button");
      thirdOption.setAttribute("role", "menuitemradio");
      thirdOption.setAttribute("aria-checked", "false");

      menu.append(firstOption, secondOption, thirdOption);

      document.body.appendChild(menu);

      result.current.languageListRef.current = menu;

      return {
        menu,
        firstOption,
        secondOption,
        thirdOption,
      };
    }

    function dispatchMenuKey(result: HookResult, key: string) {
      const event = {
        key,
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      } as unknown as ReactKeyboardEvent<HTMLDivElement>;

      act(() => {
        result.current.handleLanguageMenuKeyDown(event);
      });

      return event;
    }

    it("should move focus to the next option with ArrowDown", () => {
      const { result } = renderHook(() => useController());

      const { firstOption, secondOption } = createMenu(result);

      firstOption.focus();

      dispatchMenuKey(result, "ArrowDown");

      expect(document.activeElement).toBe(secondOption);
    });

    it("should move focus to the previous option with ArrowUp", () => {
      const { result } = renderHook(() => useController());

      const { firstOption, thirdOption } = createMenu(result);

      firstOption.focus();

      dispatchMenuKey(result, "ArrowUp");

      expect(document.activeElement).toBe(thirdOption);
    });

    it("should wrap focus to the first option with ArrowDown from the last option", () => {
      const { result } = renderHook(() => useController());

      const { firstOption, thirdOption } = createMenu(result);

      thirdOption.focus();

      dispatchMenuKey(result, "ArrowDown");

      expect(document.activeElement).toBe(firstOption);
    });

    it("should wrap focus to the last option with ArrowUp from the first option", () => {
      const { result } = renderHook(() => useController());

      const { firstOption, thirdOption } = createMenu(result);

      firstOption.focus();

      dispatchMenuKey(result, "ArrowUp");

      expect(document.activeElement).toBe(thirdOption);
    });

    it("should move focus to the first option with Home", () => {
      const { result } = renderHook(() => useController());

      const { firstOption, thirdOption } = createMenu(result);

      thirdOption.focus();

      dispatchMenuKey(result, "Home");

      expect(document.activeElement).toBe(firstOption);
    });

    it("should move focus to the last option with End", () => {
      const { result } = renderHook(() => useController());

      const { firstOption, thirdOption } = createMenu(result);

      firstOption.focus();

      dispatchMenuKey(result, "End");

      expect(document.activeElement).toBe(thirdOption);
    });

    it("should close the menu and return focus to the button with Escape", () => {
      const { result } = renderHook(() => useController());

      const { firstOption } = createMenu(result);

      const languageButton = document.createElement("button");

      result.current.languageButtonRef.current = languageButton;

      const focusSpy = jest.spyOn(languageButton, "focus");

      act(() => {
        result.current.handleLanguageMenuToggle();
      });

      firstOption.focus();

      const event = dispatchMenuKey(result, "Escape");

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(result.current.isLanguageMenuOpen).toBe(false);
      expect(focusSpy).toHaveBeenCalled();
      expect(mockPlaySound).toHaveBeenLastCalledWith("interfaceClose");
    });

    it("should ignore unsupported keys", () => {
      const { result } = renderHook(() => useController());

      const { firstOption } = createMenu(result);

      firstOption.focus();

      const event = dispatchMenuKey(result, "Enter");

      expect(document.activeElement).toBe(firstOption);
      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(event.stopPropagation).not.toHaveBeenCalled();
    });

    it("should do nothing when there are no menu items", () => {
      const { result } = renderHook(() => useController());

      result.current.languageListRef.current = document.createElement("div");

      const event = {
        key: "ArrowDown",
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      } as unknown as ReactKeyboardEvent<HTMLDivElement>;

      act(() => {
        result.current.handleLanguageMenuKeyDown(event);
      });

      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it("should prevent default behavior for supported navigation keys", () => {
      const { result } = renderHook(() => useController());

      const { firstOption } = createMenu(result);

      firstOption.focus();

      const event = dispatchMenuKey(result, "ArrowDown");

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  // --------------------------------------------------
  // Language button keyboard interaction
  // --------------------------------------------------

  describe("language button keyboard interaction", () => {
    function dispatchButtonKey(result: HookResult, key: string) {
      const event = {
        key,
        preventDefault: jest.fn(),
      } as unknown as ReactKeyboardEvent<HTMLButtonElement>;

      act(() => {
        result.current.handleLanguageButtonKeyDown(event);
      });

      return event;
    }

    it("should open the menu with ArrowDown when it is closed", () => {
      const { result } = renderHook(() => useController());

      const event = dispatchButtonKey(result, "ArrowDown");

      expect(result.current.isLanguageMenuOpen).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockPlaySound).toHaveBeenCalledWith("interfaceOpen");
    });

    it("should open the menu with ArrowUp when it is closed", () => {
      const { result } = renderHook(() => useController());

      const event = dispatchButtonKey(result, "ArrowUp");

      expect(result.current.isLanguageMenuOpen).toBe(true);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(mockPlaySound).toHaveBeenCalledWith("interfaceOpen");
    });

    it("should not open the menu with unrelated keys", () => {
      const { result } = renderHook(() => useController());

      const event = dispatchButtonKey(result, "Enter");

      expect(result.current.isLanguageMenuOpen).toBe(false);
      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(mockPlaySound).not.toHaveBeenCalled();
    });

    it("should not trigger opening behavior when the menu is already open", () => {
      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleLanguageMenuToggle();
      });

      mockPlaySound.mockClear();

      const event = dispatchButtonKey(result, "ArrowDown");

      expect(result.current.isLanguageMenuOpen).toBe(true);
      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(mockPlaySound).not.toHaveBeenCalled();
    });
  });

  // --------------------------------------------------
  // Focus behavior
  // --------------------------------------------------

  describe("focus behavior", () => {
    it("should focus the selected language option when the menu opens", () => {
      const { result } = renderHook(() => useController());

      const menu = document.createElement("div");

      const selectedOption = document.createElement("button");

      selectedOption.setAttribute("role", "menuitemradio");
      selectedOption.setAttribute("aria-checked", "true");

      const otherOption = document.createElement("button");

      otherOption.setAttribute("role", "menuitemradio");
      otherOption.setAttribute("aria-checked", "false");

      menu.append(selectedOption, otherOption);

      document.body.appendChild(menu);

      result.current.languageListRef.current = menu;

      const focusSpy = jest.spyOn(selectedOption, "focus");

      act(() => {
        result.current.handleLanguageMenuToggle();
      });

      expect(focusSpy).toHaveBeenCalled();
      expect(document.activeElement).toBe(selectedOption);

      menu.remove();
    });

    it("should not attempt to focus an option when the menu is closed", () => {
      const { result } = renderHook(() => useController());

      const menu = document.createElement("div");

      const selectedOption = document.createElement("button");

      selectedOption.setAttribute("role", "menuitemradio");
      selectedOption.setAttribute("aria-checked", "true");

      menu.appendChild(selectedOption);
      document.body.appendChild(menu);

      result.current.languageListRef.current = menu;

      const focusSpy = jest.spyOn(selectedOption, "focus");

      expect(result.current.isLanguageMenuOpen).toBe(false);
      expect(focusSpy).not.toHaveBeenCalled();

      menu.remove();
    });
  });

  // --------------------------------------------------
  // Click outside
  // --------------------------------------------------

  describe("click outside", () => {
    it("should close the menu when pointerdown occurs outside the menu", () => {
      const { result } = renderHook(() => useController());

      const menuContainer = document.createElement("div");
      const outsideElement = document.createElement("div");

      document.body.append(menuContainer, outsideElement);

      result.current.languageMenuRef.current = menuContainer;

      act(() => {
        result.current.handleLanguageMenuToggle();
      });

      expect(result.current.isLanguageMenuOpen).toBe(true);

      act(() => {
        outsideElement.dispatchEvent(
          new Event("pointerdown", {
            bubbles: true,
          }),
        );
      });

      expect(result.current.isLanguageMenuOpen).toBe(false);

      menuContainer.remove();
      outsideElement.remove();
    });

    it("should keep the menu open when pointerdown occurs inside the menu", () => {
      const { result } = renderHook(() => useController());

      const menuContainer = document.createElement("div");
      const insideElement = document.createElement("div");

      menuContainer.appendChild(insideElement);
      document.body.appendChild(menuContainer);

      result.current.languageMenuRef.current = menuContainer;

      act(() => {
        result.current.handleLanguageMenuToggle();
      });

      act(() => {
        insideElement.dispatchEvent(
          new Event("pointerdown", {
            bubbles: true,
          }),
        );
      });

      expect(result.current.isLanguageMenuOpen).toBe(true);

      menuContainer.remove();
    });

    it("should not close the menu when the menu reference is missing", () => {
      const { result } = renderHook(() => useController());

      act(() => {
        result.current.handleLanguageMenuToggle();
      });

      act(() => {
        document.dispatchEvent(
          new Event("pointerdown", {
            bubbles: true,
          }),
        );
      });

      expect(result.current.isLanguageMenuOpen).toBe(true);
    });
  });

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------

  describe("lifecycle", () => {
    it("should remove the pointerdown listener when unmounted", () => {
      const removeEventListenerSpy = jest.spyOn(
        document,
        "removeEventListener",
      );

      const { unmount } = renderHook(() => useController());

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "pointerdown",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });
  });
});
