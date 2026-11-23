import { fireEvent, render, screen } from "@testing-library/react";
import { View } from "@/features/skills/components/category-navigation/View";
import type { SkillCategoryId } from "@/shared/types/skills";

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: () => ({
    dictionary: {
      skills: {
        categoryNavigationLabel: "Skill Categories",
        categories: {
          frontend: "Frontend",
          backend: "Backend",
          testing: "Testing",
        },
      },
    },
  }),
}));

jest.mock("@/shared/lib/audio/audioManager", () => ({
  playSound: jest.fn(),
}));

jest.mock("@/features/skills/data/category-config", () => ({
  SKILL_CATEGORY_ICONS: {
    frontend: () => null,
    backend: () => null,
    testing: () => null,
  },
}));

import { playSound } from "@/shared/lib/audio/audioManager";

describe("Category Navigation - View", () => {
  const frontendCategoryId = "frontend" as SkillCategoryId;
  const backendCategoryId = "backend" as SkillCategoryId;
  const testingCategoryId = "testing" as SkillCategoryId;

  const onCategoryChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the category navigation section", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    expect(
      screen.getByRole("region", { name: "Skill Categories" }),
    ).toBeInTheDocument();
  });

  it("should render all categories", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Frontend" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Backend" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Testing" })).toBeInTheDocument();
  });

  it("should render the correct number of category buttons", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("should mark the selected category as pressed", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    expect(screen.getByRole("button", { name: "Frontend" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("should mark the other categories as not pressed", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    expect(screen.getByRole("button", { name: "Backend" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );

    expect(screen.getByRole("button", { name: "Testing" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("should assign the category id to the button data attribute", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    expect(screen.getByRole("button", { name: "Frontend" })).toHaveAttribute(
      "data-category-id",
      "frontend",
    );

    expect(screen.getByRole("button", { name: "Backend" })).toHaveAttribute(
      "data-category-id",
      "backend",
    );
  });

  it("should call onCategoryChange when clicking another category", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Backend" }));

    expect(onCategoryChange).toHaveBeenCalledWith(backendCategoryId);
    expect(onCategoryChange).toHaveBeenCalledTimes(1);
  });

  it("should play the navigation sound when selecting another category", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Backend" }));

    expect(playSound).toHaveBeenCalledWith("characterNavigation");
  });

  it("should not call onCategoryChange when clicking the selected category", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Frontend" }));

    expect(onCategoryChange).not.toHaveBeenCalled();
  });

  it("should not play the navigation sound when clicking the selected category", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Frontend" }));

    expect(playSound).not.toHaveBeenCalled();
  });

  it("should navigate to the next category using ArrowRight", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.keyDown(window, { key: "ArrowRight" });

    expect(onCategoryChange).toHaveBeenCalledWith(backendCategoryId);
  });

  it("should navigate to the previous category using ArrowLeft", () => {
    render(
      <View
        selectedCategoryId={backendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.keyDown(window, { key: "ArrowLeft" });

    expect(onCategoryChange).toHaveBeenCalledWith(frontendCategoryId);
  });

  it("should wrap to the first category when pressing ArrowRight on the last category", () => {
    render(
      <View
        selectedCategoryId={testingCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.keyDown(window, { key: "ArrowRight" });

    expect(onCategoryChange).toHaveBeenCalledWith(frontendCategoryId);
  });

  it("should wrap to the last category when pressing ArrowLeft on the first category", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.keyDown(window, { key: "ArrowLeft" });

    expect(onCategoryChange).toHaveBeenCalledWith(testingCategoryId);
  });

  it("should play the navigation sound when navigating with the keyboard", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.keyDown(window, { key: "ArrowRight" });

    expect(playSound).toHaveBeenCalledWith("characterNavigation");
  });

  it("should ignore keys other than ArrowLeft and ArrowRight", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.keyDown(window, { key: "Enter" });
    fireEvent.keyDown(window, { key: "Escape" });

    expect(onCategoryChange).not.toHaveBeenCalled();
    expect(playSound).not.toHaveBeenCalled();
  });

  it("should ignore repeated keyboard events", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.keyDown(window, {
      key: "ArrowRight",
      repeat: true,
    });

    expect(onCategoryChange).not.toHaveBeenCalled();
    expect(playSound).not.toHaveBeenCalled();
  });

  it("should ignore keyboard events with Alt pressed", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.keyDown(window, {
      key: "ArrowRight",
      altKey: true,
    });

    expect(onCategoryChange).not.toHaveBeenCalled();
  });

  it("should ignore keyboard events with Ctrl pressed", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.keyDown(window, {
      key: "ArrowRight",
      ctrlKey: true,
    });

    expect(onCategoryChange).not.toHaveBeenCalled();
  });

  it("should ignore keyboard events with Meta pressed", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    fireEvent.keyDown(window, {
      key: "ArrowRight",
      metaKey: true,
    });

    expect(onCategoryChange).not.toHaveBeenCalled();
  });

  it("should ignore keyboard events that have already been prevented", () => {
    render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    const event = new KeyboardEvent("keydown", {
      key: "ArrowRight",
      bubbles: true,
      cancelable: true,
    });

    event.preventDefault();
    window.dispatchEvent(event);

    expect(onCategoryChange).not.toHaveBeenCalled();
  });

  it("should ignore keyboard navigation when focus is inside an input", () => {
    render(
      <>
        <input aria-label="Input field" />
        <View
          selectedCategoryId={frontendCategoryId}
          onCategoryChange={onCategoryChange}
        />
      </>,
    );

    const input = screen.getByRole("textbox", { name: "Input field" });

    fireEvent.keyDown(input, { key: "ArrowRight" });

    expect(onCategoryChange).not.toHaveBeenCalled();
  });

  it("should ignore keyboard navigation when focus is inside a textarea", () => {
    render(
      <>
        <textarea aria-label="Textarea field" />
        <View
          selectedCategoryId={frontendCategoryId}
          onCategoryChange={onCategoryChange}
        />
      </>,
    );

    const textarea = screen.getByRole("textbox", { name: "Textarea field" });

    fireEvent.keyDown(textarea, { key: "ArrowRight" });

    expect(onCategoryChange).not.toHaveBeenCalled();
  });

  it("should ignore keyboard navigation when focus is inside a select", () => {
    render(
      <>
        <select aria-label="Select field">
          <option value="option">Option</option>
        </select>
        <View
          selectedCategoryId={frontendCategoryId}
          onCategoryChange={onCategoryChange}
        />
      </>,
    );

    const select = screen.getByRole("combobox", { name: "Select field" });

    fireEvent.keyDown(select, { key: "ArrowRight" });

    expect(onCategoryChange).not.toHaveBeenCalled();
  });

  it("should ignore keyboard navigation inside a contenteditable element", () => {
    render(
      <>
        <div contentEditable aria-label="Editable content" />
        <View
          selectedCategoryId={frontendCategoryId}
          onCategoryChange={onCategoryChange}
        />
      </>,
    );

    const editable = screen.getByLabelText("Editable content");

    Object.defineProperty(editable, "isContentEditable", {
      value: true,
    });

    fireEvent.keyDown(editable, { key: "ArrowRight" });

    expect(onCategoryChange).not.toHaveBeenCalled();
    expect(playSound).not.toHaveBeenCalled();
  });

  it("should remove the keyboard listener when the component unmounts", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = render(
      <View
        selectedCategoryId={frontendCategoryId}
        onCategoryChange={onCategoryChange}
      />,
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function),
    );

    removeEventListenerSpy.mockRestore();
  });
});
