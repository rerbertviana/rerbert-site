import { render, screen, fireEvent } from "@testing-library/react";

import { CharacterCarousel } from "@/features/character-selection/components/character-carousel/View";
import { useController } from "@/features/character-selection/components/character-carousel/useController";

jest.mock(
  "@/features/character-selection/components/character-carousel/useController",
  () => ({
    useController: jest.fn(),
  }),
);

jest.mock(
  "@/features/character-selection/components/character-card/View",
  () => ({
    CharacterCard: ({
      character,
      name,
      role,
      isSelected,
      onSelect,
      lockedLabel,
      lockedCharacterLabel,
      illustrationLabel,
    }: {
      character: { id: string };
      name: string;
      role: string;
      isSelected: boolean;
      onSelect: () => void;
      lockedLabel: string;
      lockedCharacterLabel: string;
      illustrationLabel: string;
    }) => (
      <button
        type="button"
        data-testid={`character-card-${character.id}`}
        data-selected={isSelected}
        onClick={onSelect}
      >
        {name}
        <span>{role}</span>
        <span>{lockedLabel}</span>
        <span>{lockedCharacterLabel}</span>
        <span>{illustrationLabel}</span>
      </button>
    ),
  }),
);

jest.mock(
  "@/features/character-selection/utils/getCharacterTranslation",
  () => ({
    getCharacterTranslation: jest.fn(
      (characterId: string, characterName: string) => ({
        name: characterName || characterId,
        role: `${characterId}-role`,
      }),
    ),
  }),
);

const mockedUseController = jest.mocked(useController);

const mockHandleCharacterSelect = jest.fn();
const mockHandlePrevious = jest.fn();
const mockHandleNext = jest.fn();
const mockHandlePointerDown = jest.fn();
const mockHandlePointerUp = jest.fn();
const mockHandlePointerCancel = jest.fn();
const mockHandleClickCapture = jest.fn();

const mockVisibleCharacters = [
  {
    character: {
      id: "previous-character",
      name: "Previous Character",
      status: "available",
    },
    characterIndex: 0,
  },
  {
    character: {
      id: "rerbert",
      name: "Rerbert",
      status: "available",
    },
    characterIndex: 1,
  },
  {
    character: {
      id: "next-character",
      name: "Next Character",
      status: "locked",
    },
    characterIndex: 2,
  },
];

const mockTranslations = {
  carousel: {
    label: "Character carousel",
    previousCharacter: "Previous character",
    nextCharacter: "Next character",
  },
  card: {
    locked: "Locked",
    lockedCharacter: "Locked character",
    characterIllustration: "Character illustration",
  },
  characters: {},
};

function setupController(
  overrides: Partial<ReturnType<typeof useController>> = {},
) {
  mockedUseController.mockReturnValue({
    translations: mockTranslations,
    visibleCharacters: mockVisibleCharacters,
    navigationDirection: "next",
    handleCharacterSelect: mockHandleCharacterSelect,
    handlePrevious: mockHandlePrevious,
    handleNext: mockHandleNext,
    handlePointerDown: mockHandlePointerDown,
    handlePointerUp: mockHandlePointerUp,
    handlePointerCancel: mockHandlePointerCancel,
    handleClickCapture: mockHandleClickCapture,
    ...overrides,
  } as ReturnType<typeof useController>);
}

describe("CharacterCarousel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupController();
  });

  it("renders the carousel section with the translated label", () => {
    render(
      <CharacterCarousel
        selectedCharacterId="rerbert"
        onSelectedCharacterChange={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("region", {
        name: "Character carousel",
      }),
    ).toBeInTheDocument();
  });

  it("renders the previous and next navigation buttons", () => {
    render(
      <CharacterCarousel
        selectedCharacterId="rerbert"
        onSelectedCharacterChange={jest.fn()}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Previous character",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Next character",
      }),
    ).toBeInTheDocument();
  });

  it("calls handlePrevious when the previous button is clicked", () => {
    render(
      <CharacterCarousel
        selectedCharacterId="rerbert"
        onSelectedCharacterChange={jest.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Previous character",
      }),
    );

    expect(mockHandlePrevious).toHaveBeenCalledTimes(1);
  });

  it("calls handleNext when the next button is clicked", () => {
    render(
      <CharacterCarousel
        selectedCharacterId="rerbert"
        onSelectedCharacterChange={jest.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Next character",
      }),
    );

    expect(mockHandleNext).toHaveBeenCalledTimes(1);
  });

  it("renders all visible characters", () => {
    render(
      <CharacterCarousel
        selectedCharacterId="rerbert"
        onSelectedCharacterChange={jest.fn()}
      />,
    );

    expect(
      screen.getByTestId("character-card-previous-character"),
    ).toBeInTheDocument();

    expect(screen.getByTestId("character-card-rerbert")).toBeInTheDocument();

    expect(
      screen.getByTestId("character-card-next-character"),
    ).toBeInTheDocument();
  });

  it("passes the selected state to the CharacterCard", () => {
    render(
      <CharacterCarousel
        selectedCharacterId="rerbert"
        onSelectedCharacterChange={jest.fn()}
      />,
    );

    expect(screen.getByTestId("character-card-rerbert")).toHaveAttribute(
      "data-selected",
      "true",
    );

    expect(
      screen.getByTestId("character-card-previous-character"),
    ).toHaveAttribute("data-selected", "false");

    expect(screen.getByTestId("character-card-next-character")).toHaveAttribute(
      "data-selected",
      "false",
    );
  });

  it("passes the character selection handler to CharacterCard", () => {
    render(
      <CharacterCarousel
        selectedCharacterId="rerbert"
        onSelectedCharacterChange={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByTestId("character-card-previous-character"));

    expect(mockHandleCharacterSelect).toHaveBeenCalledWith(
      "previous-character",
      0,
    );
  });

  it("renders the locked character labels", () => {
    render(
      <CharacterCarousel
        selectedCharacterId="rerbert"
        onSelectedCharacterChange={jest.fn()}
      />,
    );

    expect(screen.getAllByText("Locked")).toHaveLength(3);
    expect(screen.getAllByText("Locked character")).toHaveLength(3);
    expect(screen.getAllByText("Character illustration")).toHaveLength(3);
  });

  it("attaches pointer handlers to the carousel container", () => {
    render(
      <CharacterCarousel
        selectedCharacterId="rerbert"
        onSelectedCharacterChange={jest.fn()}
      />,
    );

    const carouselContainer = screen.getByTestId("character-card-rerbert")
      .parentElement?.parentElement?.parentElement;

    expect(carouselContainer).toBeTruthy();

    fireEvent.pointerDown(carouselContainer!, {
      clientX: 100,
      isPrimary: true,
    });

    fireEvent.pointerUp(carouselContainer!, {
      clientX: 150,
      isPrimary: true,
    });

    expect(mockHandlePointerDown).toHaveBeenCalled();
    expect(mockHandlePointerUp).toHaveBeenCalled();
  });

  it("attaches the pointer cancel handler", () => {
    render(
      <CharacterCarousel
        selectedCharacterId="rerbert"
        onSelectedCharacterChange={jest.fn()}
      />,
    );

    const carouselContainer = screen.getByTestId("character-card-rerbert")
      .parentElement?.parentElement?.parentElement;

    fireEvent.pointerCancel(carouselContainer!);

    expect(mockHandlePointerCancel).toHaveBeenCalled();
  });

  it("attaches the click capture handler", () => {
    render(
      <CharacterCarousel
        selectedCharacterId="rerbert"
        onSelectedCharacterChange={jest.fn()}
      />,
    );

    const carouselContainer = screen.getByTestId("character-card-rerbert")
      .parentElement?.parentElement?.parentElement;

    fireEvent.click(carouselContainer!);

    expect(mockHandleClickCapture).toHaveBeenCalled();
  });

  it("sets the animation direction data attribute", () => {
    setupController({
      navigationDirection: "previous",
    });

    render(
      <CharacterCarousel
        selectedCharacterId="rerbert"
        onSelectedCharacterChange={jest.fn()}
      />,
    );

    const animationContainer = screen.getByTestId("character-card-rerbert")
      .parentElement?.parentElement;

    expect(animationContainer).toHaveAttribute("data-direction", "previous");
  });

  it("returns null when there are no visible characters", () => {
    setupController({
      visibleCharacters: [],
    });

    const { container } = render(
      <CharacterCarousel
        selectedCharacterId="rerbert"
        onSelectedCharacterChange={jest.fn()}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
