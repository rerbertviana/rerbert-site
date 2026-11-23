import { act, renderHook } from "@testing-library/react";
import type { MouseEvent, PointerEvent } from "react";

import { playSound } from "@/shared/lib/audio/audioManager";
import type { SkillCategoryId } from "@/shared/types/skills";

import { useController } from "@/features/skills/components/category-navigation/useController";

jest.mock("@/shared/lib/audio/audioManager", () => ({
  playSound: jest.fn(),
}));

const mockPlaySound = playSound as jest.Mock;

describe("Skills Category Navigation useController", () => {
  let onCategoryChange: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    onCategoryChange = jest.fn();

    window.innerWidth = 800;
  });

  function renderController(
    selectedCategoryId: SkillCategoryId = "frameworks-libraries",
  ) {
    return renderHook(() =>
      useController({
        selectedCategoryId,
        onCategoryChange,
      }),
    );
  }

  function resizeWindow(width: number) {
    window.innerWidth = width;

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });
  }

  // --------------------------------------------------
  // Category selection
  // --------------------------------------------------

  describe("category selection", () => {
    it("should select another category", () => {
      const { result } = renderController();

      act(() => {
        result.current.handleSelectCategory("languages-core");
      });

      expect(onCategoryChange).toHaveBeenCalledWith("languages-core");
      expect(onCategoryChange).toHaveBeenCalledTimes(1);
      expect(mockPlaySound).toHaveBeenCalledWith("characterNavigation");
    });

    it("should not select the currently selected category", () => {
      const { result } = renderController("languages-core");

      act(() => {
        result.current.handleSelectCategory("languages-core");
      });

      expect(onCategoryChange).not.toHaveBeenCalled();
      expect(mockPlaySound).not.toHaveBeenCalled();
    });
  });

  // --------------------------------------------------
  // Navigation
  // --------------------------------------------------

  describe("navigation", () => {
    it("should navigate to the next category", () => {
      const { result } = renderController("frameworks-libraries");

      act(() => {
        result.current.handleNext();
      });

      expect(onCategoryChange).toHaveBeenCalledWith("languages-core");
      expect(mockPlaySound).toHaveBeenCalledWith("characterNavigation");
    });

    it("should navigate to the previous category", () => {
      const { result } = renderController("languages-core");

      act(() => {
        result.current.handlePrevious();
      });

      expect(onCategoryChange).toHaveBeenCalledWith("frameworks-libraries");
    });

    it("should wrap to the first category when navigating next from the last category", () => {
      const { result } = renderController("devops-collaboration-ai");

      act(() => {
        result.current.handleNext();
      });

      expect(onCategoryChange).toHaveBeenCalledWith("frameworks-libraries");
    });

    it("should wrap to the last category when navigating previous from the first category", () => {
      const { result } = renderController("frameworks-libraries");

      act(() => {
        result.current.handlePrevious();
      });

      expect(onCategoryChange).toHaveBeenCalledWith("devops-collaboration-ai");
    });
  });

  // --------------------------------------------------
  // Responsive behavior
  // --------------------------------------------------

  describe("responsive behavior", () => {
    it("should display three categories on mobile", () => {
      resizeWindow(800);

      const { result } = renderController("languages-core");

      expect(result.current.visibleCategories).toHaveLength(3);

      expect(
        result.current.visibleCategories.map((category) => category.id),
      ).toEqual(["frameworks-libraries", "languages-core", "state-management"]);
    });

    it("should circularly display categories on mobile when the first category is selected", () => {
      resizeWindow(800);

      const { result } = renderController("frameworks-libraries");

      expect(
        result.current.visibleCategories.map((category) => category.id),
      ).toEqual([
        "devops-collaboration-ai",
        "frameworks-libraries",
        "languages-core",
      ]);
    });

    it("should circularly display categories on mobile when the last category is selected", () => {
      resizeWindow(800);

      const { result } = renderController("devops-collaboration-ai");

      expect(
        result.current.visibleCategories.map((category) => category.id),
      ).toEqual([
        "methodologies-workflow",
        "devops-collaboration-ai",
        "frameworks-libraries",
      ]);
    });

    it("should display five categories at 1024px", () => {
      resizeWindow(1024);

      const { result } = renderController("frameworks-libraries");

      expect(result.current.visibleCategories).toHaveLength(5);
    });

    it("should display seven categories at 1280px", () => {
      resizeWindow(1280);

      const { result } = renderController("frameworks-libraries");

      expect(result.current.visibleCategories).toHaveLength(7);
    });

    it("should display eight categories at 1536px", () => {
      resizeWindow(1536);

      const { result } = renderController("frameworks-libraries");

      expect(result.current.visibleCategories).toHaveLength(8);
    });

    it("should adjust the visible desktop window based on the selected category", () => {
      resizeWindow(1024);

      const { result } = renderController("testing-quality");

      expect(
        result.current.visibleCategories.map((category) => category.id),
      ).toEqual([
        "frameworks-libraries",
        "languages-core",
        "state-management",
        "apis-data-fetching",
        "testing-quality",
      ]);
    });

    it("should show the last categories when the last category is selected on desktop", () => {
      resizeWindow(1024);

      const { result } = renderController("devops-collaboration-ai");

      expect(
        result.current.visibleCategories.map((category) => category.id),
      ).toEqual([
        "apis-data-fetching",
        "testing-quality",
        "databases-infrastructure",
        "methodologies-workflow",
        "devops-collaboration-ai",
      ]);
    });
  });

  // --------------------------------------------------
  // Keyboard navigation
  // --------------------------------------------------

  describe("keyboard navigation", () => {
    it("should navigate to the previous category with ArrowLeft", () => {
      renderController("languages-core");

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "ArrowLeft",
            bubbles: true,
          }),
        );
      });

      expect(onCategoryChange).toHaveBeenCalledWith("frameworks-libraries");
    });

    it("should navigate to the next category with ArrowRight", () => {
      renderController("frameworks-libraries");

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "ArrowRight",
            bubbles: true,
          }),
        );
      });

      expect(onCategoryChange).toHaveBeenCalledWith("languages-core");
    });

    it("should prevent the default behavior for navigation keys", () => {
      renderController("frameworks-libraries");

      const event = new KeyboardEvent("keydown", {
        key: "ArrowRight",
        cancelable: true,
      });

      act(() => {
        window.dispatchEvent(event);
      });

      expect(event.defaultPrevented).toBe(true);
    });

    it("should ignore repeated keyboard events", () => {
      renderController("frameworks-libraries");

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "ArrowRight",
            repeat: true,
          }),
        );
      });

      expect(onCategoryChange).not.toHaveBeenCalled();
      expect(mockPlaySound).not.toHaveBeenCalled();
    });

    it("should ignore events with modifier keys", () => {
      renderController("frameworks-libraries");

      const modifierEvents = [
        { key: "ArrowRight", altKey: true },
        { key: "ArrowRight", ctrlKey: true },
        { key: "ArrowRight", metaKey: true },
      ];

      act(() => {
        modifierEvents.forEach((eventOptions) => {
          window.dispatchEvent(new KeyboardEvent("keydown", eventOptions));
        });
      });

      expect(onCategoryChange).not.toHaveBeenCalled();
    });

    it("should ignore events that were already prevented", () => {
      renderController("frameworks-libraries");

      const event = new KeyboardEvent("keydown", {
        key: "ArrowRight",
        cancelable: true,
      });

      event.preventDefault();

      act(() => {
        window.dispatchEvent(event);
      });

      expect(onCategoryChange).not.toHaveBeenCalled();
    });

    it("should ignore unrelated keyboard keys", () => {
      renderController("frameworks-libraries");

      act(() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "Enter",
          }),
        );
      });

      expect(onCategoryChange).not.toHaveBeenCalled();
    });

    it("should ignore keyboard events originating from editable elements", () => {
      renderController("frameworks-libraries");

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

      expect(onCategoryChange).not.toHaveBeenCalled();

      input.remove();
    });

    it("should ignore keyboard events originating from textareas", () => {
      renderController("frameworks-libraries");

      const textarea = document.createElement("textarea");
      document.body.appendChild(textarea);

      act(() => {
        textarea.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "ArrowRight",
            bubbles: true,
          }),
        );
      });

      expect(onCategoryChange).not.toHaveBeenCalled();

      textarea.remove();
    });

    it("should ignore keyboard events originating from contenteditable elements", () => {
      renderController("frameworks-libraries");

      const editable = document.createElement("div");
      editable.setAttribute("role", "textbox");
      editable.setAttribute("contenteditable", "true");

      document.body.appendChild(editable);

      act(() => {
        editable.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "ArrowRight",
            bubbles: true,
          }),
        );
      });

      expect(onCategoryChange).not.toHaveBeenCalled();

      editable.remove();
    });
  });

  // --------------------------------------------------
  // Swipe navigation
  // --------------------------------------------------

  describe("swipe navigation", () => {
    function createPointerEvent(clientX: number, isPrimary = true) {
      return {
        clientX,
        isPrimary,
      } as PointerEvent<HTMLDivElement>;
    }

    it("should navigate next when swiping to the left", () => {
      const { result } = renderController("frameworks-libraries");

      act(() => {
        result.current.handlePointerDown(createPointerEvent(200));

        result.current.handlePointerUp(createPointerEvent(100));
      });

      expect(onCategoryChange).toHaveBeenCalledWith("languages-core");
    });

    it("should navigate previous when swiping to the right", () => {
      const { result } = renderController("languages-core");

      act(() => {
        result.current.handlePointerDown(createPointerEvent(100));

        result.current.handlePointerUp(createPointerEvent(200));
      });

      expect(onCategoryChange).toHaveBeenCalledWith("frameworks-libraries");
    });

    it("should not navigate when the swipe distance is below the threshold", () => {
      const { result } = renderController("frameworks-libraries");

      act(() => {
        result.current.handlePointerDown(createPointerEvent(100));

        result.current.handlePointerUp(createPointerEvent(144));
      });

      expect(onCategoryChange).not.toHaveBeenCalled();
    });

    it("should navigate when the swipe distance equals the threshold", () => {
      const { result } = renderController("frameworks-libraries");

      act(() => {
        result.current.handlePointerDown(createPointerEvent(100));

        result.current.handlePointerUp(createPointerEvent(145));
      });

      expect(onCategoryChange).toHaveBeenCalledWith("devops-collaboration-ai");
    });

    it("should ignore non-primary pointers", () => {
      const { result } = renderController("frameworks-libraries");

      act(() => {
        result.current.handlePointerDown(createPointerEvent(200, false));

        result.current.handlePointerUp(createPointerEvent(100));
      });

      expect(onCategoryChange).not.toHaveBeenCalled();
    });

    it("should not navigate when pointer up occurs without pointer down", () => {
      const { result } = renderController("frameworks-libraries");

      act(() => {
        result.current.handlePointerUp(createPointerEvent(100));
      });

      expect(onCategoryChange).not.toHaveBeenCalled();
    });

    it("should reset pointer tracking when the gesture is cancelled", () => {
      const { result } = renderController("frameworks-libraries");

      act(() => {
        result.current.handlePointerDown(createPointerEvent(200));

        result.current.handlePointerCancel();

        result.current.handlePointerUp(createPointerEvent(100));
      });

      expect(onCategoryChange).not.toHaveBeenCalled();
    });

    it("should suppress the click following a successful swipe", () => {
      const { result } = renderController("frameworks-libraries");

      const clickEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      } as unknown as MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handlePointerDown(createPointerEvent(200));

        result.current.handlePointerUp(createPointerEvent(100));

        result.current.handleClickCapture(clickEvent);
      });

      expect(clickEvent.preventDefault).toHaveBeenCalled();
      expect(clickEvent.stopPropagation).toHaveBeenCalled();
    });

    it("should not suppress clicks when no swipe occurred", () => {
      const { result } = renderController("frameworks-libraries");

      const clickEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      } as unknown as MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handleClickCapture(clickEvent);
      });

      expect(clickEvent.preventDefault).not.toHaveBeenCalled();
      expect(clickEvent.stopPropagation).not.toHaveBeenCalled();
    });

    it("should allow the next click after the suppressed click", () => {
      const { result } = renderController("frameworks-libraries");

      const firstClick = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      } as unknown as MouseEvent<HTMLDivElement>;

      const secondClick = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      } as unknown as MouseEvent<HTMLDivElement>;

      act(() => {
        result.current.handlePointerDown(createPointerEvent(200));

        result.current.handlePointerUp(createPointerEvent(100));

        result.current.handleClickCapture(firstClick);
        result.current.handleClickCapture(secondClick);
      });

      expect(firstClick.preventDefault).toHaveBeenCalled();
      expect(secondClick.preventDefault).not.toHaveBeenCalled();
    });
  });

  // --------------------------------------------------
  // Lifecycle
  // --------------------------------------------------

  describe("lifecycle", () => {
    it("should remove the resize and keyboard listeners when unmounted", () => {
      const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

      const { unmount } = renderController();

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "resize",
        expect.any(Function),
      );

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });
  });
});
