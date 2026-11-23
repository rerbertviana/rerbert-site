import { render, screen } from "@testing-library/react";
import { View } from "@/features/character-selection/views/View";
import { useController } from "@/features/character-selection/controller/useController";

jest.mock("@/features/character-selection/controller/useController");

jest.mock(
  "@/features/character-selection/components/character-carousel/View",
  () => ({
    CharacterCarousel: jest.fn(() => <div data-testid="character-carousel" />),
  }),
);

jest.mock(
  "@/features/character-selection/components/character-information/View",
  () => ({
    CharacterInformation: jest.fn(() => (
      <div data-testid="character-information" />
    )),
  }),
);

jest.mock(
  "@/features/character-selection/components/select-character-button/View",
  () => ({
    SelectCharacterButton: jest.fn(() => (
      <div data-testid="select-character-button" />
    )),
  }),
);

jest.mock(
  "@/features/character-selection/components/selection-title/View",
  () => ({
    SelectionTitle: jest.fn(() => <div data-testid="selection-title" />),
  }),
);

import { CharacterCarousel } from "@/features/character-selection/components/character-carousel/View";
import { CharacterInformation } from "@/features/character-selection/components/character-information/View";
import { SelectCharacterButton } from "@/features/character-selection/components/select-character-button/View";

const mockUseController = useController as jest.Mock;

const mockHandleSelectedCharacterChange = jest.fn();
const mockHandleConfirmSelection = jest.fn();

const mockProfile = {
  name: "Rerbert Brito Viana",
  role: "Frontend Developer",
};

const mockCharacterTranslation = {
  seniority: "Junior",
  experience: "6 years",
  education: "Information Systems",
};

const defaultControllerReturn = {
  selectedCharacterId: "rerbert",
  handleSelectedCharacterChange: mockHandleSelectedCharacterChange,
  selectedCharacter: {
    id: "rerbert",
    profile: mockProfile,
  },
  selectedCharacterTranslation: mockCharacterTranslation,
  canSelectCharacter: true,
  handleConfirmSelection: mockHandleConfirmSelection,
  shouldAnimateInformation: true,
};

describe("Character Selection View", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseController.mockReturnValue(defaultControllerReturn);
  });

  describe("Rendering", () => {
    it("should render all child components", () => {
      render(<View />);

      expect(screen.getByTestId("selection-title")).toBeInTheDocument();
      expect(screen.getByTestId("character-carousel")).toBeInTheDocument();
      expect(screen.getByTestId("character-information")).toBeInTheDocument();
      expect(screen.getByTestId("select-character-button")).toBeInTheDocument();
    });

    it("should render the main container", () => {
      const { container } = render(<View />);

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("CharacterCarousel", () => {
    it("should receive the selected character id", () => {
      render(<View />);

      expect(CharacterCarousel).toHaveBeenCalledWith(
        expect.objectContaining({
          selectedCharacterId: "rerbert",
        }),
        undefined,
      );
    });

    it("should receive the character selection handler", () => {
      render(<View />);

      expect(CharacterCarousel).toHaveBeenCalledWith(
        expect.objectContaining({
          onSelectedCharacterChange: mockHandleSelectedCharacterChange,
        }),
        undefined,
      );
    });
  });

  describe("CharacterInformation", () => {
    it("should receive the selected character profile", () => {
      render(<View />);

      expect(CharacterInformation).toHaveBeenCalledWith(
        expect.objectContaining({
          profile: mockProfile,
        }),
        undefined,
      );
    });

    it("should receive localized character information", () => {
      render(<View />);

      expect(CharacterInformation).toHaveBeenCalledWith(
        expect.objectContaining({
          localizedSeniority: "Junior",
          localizedExperience: "6 years",
          localizedEducation: "Information Systems",
        }),
        undefined,
      );
    });

    it("should receive the information animation state", () => {
      render(<View />);

      expect(CharacterInformation).toHaveBeenCalledWith(
        expect.objectContaining({
          shouldAnimate: true,
        }),
        undefined,
      );
    });

    it("should receive undefined profile and translations when no character is selected", () => {
      mockUseController.mockReturnValue({
        ...defaultControllerReturn,
        selectedCharacter: undefined,
        selectedCharacterTranslation: undefined,
      });

      render(<View />);

      expect(CharacterInformation).toHaveBeenCalledWith(
        expect.objectContaining({
          profile: undefined,
          localizedSeniority: undefined,
          localizedExperience: undefined,
          localizedEducation: undefined,
        }),
        undefined,
      );
    });
  });

  describe("SelectCharacterButton", () => {
    it("should be enabled when the character can be selected", () => {
      mockUseController.mockReturnValue({
        ...defaultControllerReturn,
        canSelectCharacter: true,
      });

      render(<View />);

      expect(SelectCharacterButton).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: false,
        }),
        undefined,
      );
    });

    it("should be disabled when the character cannot be selected", () => {
      mockUseController.mockReturnValue({
        ...defaultControllerReturn,
        canSelectCharacter: false,
      });

      render(<View />);

      expect(SelectCharacterButton).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: true,
        }),
        undefined,
      );
    });

    it("should receive the confirm selection handler", () => {
      render(<View />);

      expect(SelectCharacterButton).toHaveBeenCalledWith(
        expect.objectContaining({
          onClick: mockHandleConfirmSelection,
        }),
        undefined,
      );
    });
  });
});
