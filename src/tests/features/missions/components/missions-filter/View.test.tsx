import { fireEvent, render, screen } from "@testing-library/react";

import { View } from "@/features/missions/components/missions-filter/View";
import type { MissionFilter } from "@/features/missions/types/timeline";

const mockOnFilterChange = jest.fn();
const mockPlaySound = jest.fn();

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: () => ({
    dictionary: {
      missions: {
        filters: {
          label: "Mission filters",
          all: "All",
          experience: "Experience",
          project: "Project",
        },
      },
    },
  }),
}));

jest.mock("@/shared/lib/audio/audioManager", () => ({
  playSound: (...args: unknown[]) => mockPlaySound(...args),
}));

const renderComponent = (selectedFilter: MissionFilter = "all") => {
  return render(
    <View
      selectedFilter={selectedFilter}
      onFilterChange={mockOnFilterChange}
    />,
  );
};

describe("MissionsFilter View", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render all filter buttons", () => {
      renderComponent();

      expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: "Experience" }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: "Project" }),
      ).toBeInTheDocument();
    });

    it("should render the navigation with the correct accessible label", () => {
      renderComponent();

      expect(
        screen.getByRole("navigation", {
          name: "Mission filters",
        }),
      ).toBeInTheDocument();
    });

    it("should mark All as selected by default", () => {
      renderComponent("all");

      expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );

      expect(
        screen.getByRole("button", { name: "Experience" }),
      ).toHaveAttribute("aria-pressed", "false");

      expect(screen.getByRole("button", { name: "Project" })).toHaveAttribute(
        "aria-pressed",
        "false",
      );
    });

    it("should mark Experience as selected", () => {
      renderComponent("experience");

      expect(
        screen.getByRole("button", { name: "Experience" }),
      ).toHaveAttribute("aria-pressed", "true");
    });

    it("should mark Project as selected", () => {
      renderComponent("project");

      expect(screen.getByRole("button", { name: "Project" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });
  });

  describe("Click interactions", () => {
    it("should change the filter when clicking Experience", () => {
      renderComponent("all");

      fireEvent.click(screen.getByRole("button", { name: "Experience" }));

      expect(mockOnFilterChange).toHaveBeenCalledWith("experience");
    });

    it("should change the filter when clicking Project", () => {
      renderComponent("all");

      fireEvent.click(screen.getByRole("button", { name: "Project" }));

      expect(mockOnFilterChange).toHaveBeenCalledWith("project");
    });

    it("should change the filter when clicking All", () => {
      renderComponent("project");

      fireEvent.click(screen.getByRole("button", { name: "All" }));

      expect(mockOnFilterChange).toHaveBeenCalledWith("all");
    });

    it("should play the navigation sound when changing filters", () => {
      renderComponent("all");

      fireEvent.click(screen.getByRole("button", { name: "Experience" }));

      expect(mockPlaySound).toHaveBeenCalledWith("characterNavigation");
    });

    it("should not change the filter when clicking the already selected filter", () => {
      renderComponent("all");

      fireEvent.click(screen.getByRole("button", { name: "All" }));

      expect(mockOnFilterChange).not.toHaveBeenCalled();
    });

    it("should not play the navigation sound when clicking the already selected filter", () => {
      renderComponent("all");

      fireEvent.click(screen.getByRole("button", { name: "All" }));

      expect(mockPlaySound).not.toHaveBeenCalled();
    });
  });

  describe("Keyboard navigation", () => {
    it("should navigate to the next filter with ArrowRight", () => {
      renderComponent("all");

      fireEvent.keyDown(window, { key: "ArrowRight" });

      expect(mockOnFilterChange).toHaveBeenCalledWith("experience");
    });

    it("should navigate to the previous filter with ArrowLeft", () => {
      renderComponent("experience");

      fireEvent.keyDown(window, { key: "ArrowLeft" });

      expect(mockOnFilterChange).toHaveBeenCalledWith("all");
    });

    it("should wrap to the first filter when pressing ArrowRight on the last filter", () => {
      renderComponent("project");

      fireEvent.keyDown(window, { key: "ArrowRight" });

      expect(mockOnFilterChange).toHaveBeenCalledWith("all");
    });

    it("should wrap to the last filter when pressing ArrowLeft on the first filter", () => {
      renderComponent("all");

      fireEvent.keyDown(window, { key: "ArrowLeft" });

      expect(mockOnFilterChange).toHaveBeenCalledWith("project");
    });

    it("should play the navigation sound when navigating with the keyboard", () => {
      renderComponent("all");

      fireEvent.keyDown(window, { key: "ArrowRight" });

      expect(mockPlaySound).toHaveBeenCalledWith("characterNavigation");
    });

    it("should ignore other keys", () => {
      renderComponent("all");

      fireEvent.keyDown(window, { key: "Enter" });

      expect(mockOnFilterChange).not.toHaveBeenCalled();
      expect(mockPlaySound).not.toHaveBeenCalled();
    });

    it("should ignore repeated key events", () => {
      renderComponent("all");

      fireEvent.keyDown(window, {
        key: "ArrowRight",
        repeat: true,
      });

      expect(mockOnFilterChange).not.toHaveBeenCalled();
      expect(mockPlaySound).not.toHaveBeenCalled();
    });

    it("should ignore key events with Alt", () => {
      renderComponent("all");

      fireEvent.keyDown(window, {
        key: "ArrowRight",
        altKey: true,
      });

      expect(mockOnFilterChange).not.toHaveBeenCalled();
    });

    it("should ignore key events with Ctrl", () => {
      renderComponent("all");

      fireEvent.keyDown(window, {
        key: "ArrowRight",
        ctrlKey: true,
      });

      expect(mockOnFilterChange).not.toHaveBeenCalled();
    });

    it("should ignore key events with Meta", () => {
      renderComponent("all");

      fireEvent.keyDown(window, {
        key: "ArrowRight",
        metaKey: true,
      });

      expect(mockOnFilterChange).not.toHaveBeenCalled();
    });

    it("should ignore key events inside input elements", () => {
      renderComponent("all");

      const input = document.createElement("input");
      document.body.appendChild(input);

      fireEvent.keyDown(input, { key: "ArrowRight" });

      expect(mockOnFilterChange).not.toHaveBeenCalled();

      input.remove();
    });

    it("should ignore key events inside textarea elements", () => {
      renderComponent("all");

      const textarea = document.createElement("textarea");
      document.body.appendChild(textarea);

      fireEvent.keyDown(textarea, { key: "ArrowRight" });

      expect(mockOnFilterChange).not.toHaveBeenCalled();

      textarea.remove();
    });

    it("should ignore key events inside select elements", () => {
      renderComponent("all");

      const select = document.createElement("select");
      document.body.appendChild(select);

      fireEvent.keyDown(select, { key: "ArrowRight" });

      expect(mockOnFilterChange).not.toHaveBeenCalled();

      select.remove();
    });

    it("should ignore key events inside elements with role textbox", () => {
      renderComponent("all");

      const textbox = document.createElement("div");
      textbox.setAttribute("role", "textbox");
      document.body.appendChild(textbox);

      fireEvent.keyDown(textbox, { key: "ArrowRight" });

      expect(mockOnFilterChange).not.toHaveBeenCalled();

      textbox.remove();
    });

    it("should ignore key events inside a contenteditable element", () => {
      renderComponent("all");

      const editable = document.createElement("div");

      Object.defineProperty(editable, "isContentEditable", {
        configurable: true,
        value: true,
      });

      document.body.appendChild(editable);

      fireEvent.keyDown(editable, { key: "ArrowRight" });

      expect(mockOnFilterChange).not.toHaveBeenCalled();
      expect(mockPlaySound).not.toHaveBeenCalled();

      editable.remove();
    });

    it("should ignore key events inside a dialog", () => {
      renderComponent("all");

      const dialog = document.createElement("div");
      dialog.setAttribute("role", "dialog");
      document.body.appendChild(dialog);

      fireEvent.keyDown(dialog, { key: "ArrowRight" });

      expect(mockOnFilterChange).not.toHaveBeenCalled();

      dialog.remove();
    });

    it("should ignore already prevented key events", () => {
      renderComponent("all");

      const event = new KeyboardEvent("keydown", {
        key: "ArrowRight",
        bubbles: true,
        cancelable: true,
      });

      event.preventDefault();

      window.dispatchEvent(event);

      expect(mockOnFilterChange).not.toHaveBeenCalled();
    });
  });

  describe("Cleanup", () => {
    it("should remove the keyboard listener when unmount", () => {
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

      const { unmount } = renderComponent();

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });
  });
});
