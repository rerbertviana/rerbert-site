import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { View } from "@/shared/components/navigation/back-button/View";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { playSound } from "@/shared/lib/audio/audioManager";

import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: jest.fn(),
}));

jest.mock("@/shared/lib/audio/audioManager", () => ({
  playSound: jest.fn(),
}));

const mockPush = jest.fn();

const mockUseRouter = useRouter as jest.Mock;
const mockUseLanguage = useLanguage as jest.Mock;

describe("BackButton View", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue({
      push: mockPush,
    });

    mockUseLanguage.mockReturnValue({
      locale: "en",
      dictionary: {
        profile: {
          backButton: "BACK",
        },
      },
    });
  });

  describe("rendering", () => {
    it("renders the default label from the dictionary", () => {
      render(<View href="/character-selection" />);

      expect(screen.getByRole("button", { name: "BACK" })).toBeInTheDocument();
    });

    it("renders a custom label when provided", () => {
      render(<View href="/character-selection" label="RETURN TO SELECTION" />);

      expect(
        screen.getByRole("button", {
          name: "RETURN TO SELECTION",
        }),
      ).toBeInTheDocument();
    });
  });

  describe("navigation", () => {
    it("navigates to the provided href using the current locale", async () => {
      const user = userEvent.setup();

      render(<View href="/character-selection" />);

      await user.click(screen.getByRole("button", { name: "BACK" }));

      expect(mockPush).toHaveBeenCalledWith("/en/character-selection");
    });

    it("plays the characterSelect sound when clicked", async () => {
      const user = userEvent.setup();

      render(<View href="/character-selection" />);

      await user.click(screen.getByRole("button", { name: "BACK" }));

      expect(playSound).toHaveBeenCalledWith("characterSelect");
    });

    it("uses the current locale when navigating", async () => {
      mockUseLanguage.mockReturnValue({
        locale: "pt-BR",
        dictionary: {
          profile: {
            backButton: "VOLTAR",
          },
        },
      });

      const user = userEvent.setup();

      render(<View href="/character-selection" />);

      await user.click(screen.getByRole("button", { name: "VOLTAR" }));

      expect(mockPush).toHaveBeenCalledWith("/pt-BR/character-selection");
    });
  });

  describe("hover sound", () => {
    it("plays interfaceClose when the button is hovered", async () => {
      const user = userEvent.setup();

      render(<View href="/character-selection" />);

      await user.hover(screen.getByRole("button", { name: "BACK" }));

      expect(playSound).toHaveBeenCalledWith("interfaceClose");
    });
  });

  describe("keyboard navigation", () => {
    it("navigates when Escape is pressed", () => {
      render(<View href="/character-selection" />);

      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Escape",
          bubbles: true,
          cancelable: true,
        }),
      );

      expect(mockPush).toHaveBeenCalledWith("/en/character-selection");

      expect(playSound).toHaveBeenCalledWith("characterSelect");
    });

    it("prevents navigation when Escape is repeated", () => {
      render(<View href="/character-selection" />);

      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Escape",
          repeat: true,
          bubbles: true,
          cancelable: true,
        }),
      );

      expect(mockPush).not.toHaveBeenCalled();
    });

    it("does not navigate when Escape is pressed inside an input", () => {
      render(
        <>
          <View href="/character-selection" />
          <input aria-label="Test input" />
        </>,
      );

      const input = screen.getByRole("textbox");

      input.focus();

      input.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Escape",
          bubbles: true,
          cancelable: true,
        }),
      );

      expect(mockPush).not.toHaveBeenCalled();
    });

    it("does not navigate when Escape is pressed inside a textarea", () => {
      render(
        <>
          <View href="/character-selection" />
          <textarea aria-label="Test textarea" />
        </>,
      );

      const textarea = screen.getByRole("textbox", {
        name: "Test textarea",
      });

      textarea.focus();

      textarea.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Escape",
          bubbles: true,
          cancelable: true,
        }),
      );

      expect(mockPush).not.toHaveBeenCalled();
    });

    it("does not navigate when Escape is pressed inside a select", () => {
      render(
        <>
          <View href="/character-selection" />
          <select aria-label="Test select">
            <option value="1">Option 1</option>
          </select>
        </>,
      );

      const select = screen.getByRole("combobox");

      select.focus();

      select.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Escape",
          bubbles: true,
          cancelable: true,
        }),
      );

      expect(mockPush).not.toHaveBeenCalled();
    });

    it("does not navigate when Escape is pressed inside a contentEditable element", () => {
      render(
        <>
          <View href="/character-selection" />
          <div contentEditable aria-label="Editable area">
            Editable content
          </div>
        </>,
      );

      const editable = screen.getByLabelText("Editable area");

      Object.defineProperty(editable, "isContentEditable", {
        configurable: true,
        value: true,
      });

      editable.focus();

      editable.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Escape",
          bubbles: true,
          cancelable: true,
        }),
      );

      expect(mockPush).not.toHaveBeenCalled();
    });

    it("does not navigate when Escape is pressed inside a modal", () => {
      render(
        <>
          <View href="/character-selection" />
          <div role="dialog" aria-modal="true">
            Modal content
          </div>
        </>,
      );

      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Escape",
          bubbles: true,
          cancelable: true,
        }),
      );

      expect(mockPush).not.toHaveBeenCalled();
    });

    it("does not navigate when another key is pressed", () => {
      render(<View href="/character-selection" />);

      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "Enter",
          bubbles: true,
          cancelable: true,
        }),
      );

      expect(mockPush).not.toHaveBeenCalled();
    });
  });

  describe("event listener cleanup", () => {
    it("removes the keydown listener when unmounted", () => {
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

      const { unmount } = render(<View href="/character-selection" />);

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });
  });
});
