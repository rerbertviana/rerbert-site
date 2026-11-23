import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CharacterCard } from "@/features/character-selection/components/character-card/View";
import { playSound } from "@/shared/lib/audio/audioManager";

import type { Character } from "@/features/character-selection/types/character";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    priority,
    fill,
    sizes,
    alt,
    ...props
  }: {
    priority?: boolean;
    fill?: boolean;
    sizes?: string;
    alt: string;
    [key: string]: unknown;
  }) => (
    <div
      role="img"
      aria-label={alt}
      data-src={props.src}
      data-priority={priority}
      data-fill={fill}
      data-sizes={sizes}
    />
  ),
}));

jest.mock("@/shared/lib/audio/audioManager", () => ({
  playSound: jest.fn(),
}));

describe("CharacterCard View", () => {
  const mockCharacter = {
    id: "rerbert",
    name: "Rerbert",
    image: "/images/rerbert.png",
    status: "available",
  } as Character;

  const defaultProps = {
    character: mockCharacter,
    name: "Rerbert",
    role: "Frontend Developer",
    lockedLabel: "Locked",
    lockedCharacterLabel: "Locked Character",
    illustrationLabel: "illustration",
    isSelected: false,
    onSelect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("renders the character name", () => {
      render(<CharacterCard {...defaultProps} />);

      expect(
        screen.getByRole("heading", { name: "Rerbert" }),
      ).toBeInTheDocument();
    });

    it("renders the character role", () => {
      render(<CharacterCard {...defaultProps} />);

      expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    });

    it("renders the character image", () => {
      render(<CharacterCard {...defaultProps} />);

      expect(
        screen.getByRole("img", {
          name: "Rerbert illustration",
        }),
      ).toBeInTheDocument();
    });

    it("renders the character image with the correct source", () => {
      render(<CharacterCard {...defaultProps} />);

      expect(
        screen.getByRole("img", {
          name: "Rerbert illustration",
        }),
      ).toHaveAttribute("data-src", "/images/rerbert.png");
    });

    it("uses priority for the rerbert character", () => {
      render(<CharacterCard {...defaultProps} />);

      expect(
        screen.getByRole("img", {
          name: "Rerbert illustration",
        }),
      ).toHaveAttribute("data-priority", "true");
    });

    it("does not use priority for other characters", () => {
      const character = {
        ...mockCharacter,
        id: "other-character",
      } as Character;

      render(<CharacterCard {...defaultProps} character={character} />);

      expect(
        screen.getByRole("img", {
          name: "Rerbert illustration",
        }),
      ).toHaveAttribute("data-priority", "false");
    });

    it("renders the card as a button", () => {
      render(<CharacterCard {...defaultProps} />);

      expect(
        screen.getByRole("button", {
          name: "Rerbert, Frontend Developer",
        }),
      ).toBeInTheDocument();
    });
  });

  describe("selection state", () => {
    it("sets aria-pressed to false when the card is not selected", () => {
      render(<CharacterCard {...defaultProps} isSelected={false} />);

      expect(
        screen.getByRole("button", {
          name: "Rerbert, Frontend Developer",
        }),
      ).toHaveAttribute("aria-pressed", "false");
    });

    it("sets aria-pressed to true when the card is selected", () => {
      render(<CharacterCard {...defaultProps} isSelected />);

      expect(
        screen.getByRole("button", {
          name: "Rerbert, Frontend Developer",
        }),
      ).toHaveAttribute("aria-pressed", "true");
    });

    it("sets data-selected to false when the card is not selected", () => {
      render(<CharacterCard {...defaultProps} isSelected={false} />);

      expect(
        screen.getByRole("button", {
          name: "Rerbert, Frontend Developer",
        }),
      ).toHaveAttribute("data-selected", "false");
    });

    it("sets data-selected to true when the card is selected", () => {
      render(<CharacterCard {...defaultProps} isSelected />);

      expect(
        screen.getByRole("button", {
          name: "Rerbert, Frontend Developer",
        }),
      ).toHaveAttribute("data-selected", "true");
    });
  });

  describe("interaction", () => {
    it("calls onSelect when the card is clicked", async () => {
      const user = userEvent.setup();
      const onSelect = jest.fn();

      render(<CharacterCard {...defaultProps} onSelect={onSelect} />);

      await user.click(
        screen.getByRole("button", {
          name: "Rerbert, Frontend Developer",
        }),
      );

      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it("does not call onSelect when the card is disabled", async () => {
      const user = userEvent.setup();
      const onSelect = jest.fn();

      const lockedCharacter = {
        ...mockCharacter,
        status: "locked",
      } as Character;

      render(
        <CharacterCard
          {...defaultProps}
          character={lockedCharacter}
          onSelect={onSelect}
        />,
      );

      await user.click(
        screen.getByRole("button", {
          name: "Locked Character",
        }),
      );

      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe("locked state", () => {
    const lockedCharacter = {
      ...mockCharacter,
      id: "locked-character",
      status: "locked",
    } as Character;

    it("disables the button when the character is locked", () => {
      render(<CharacterCard {...defaultProps} character={lockedCharacter} />);

      expect(
        screen.getByRole("button", {
          name: "Locked Character",
        }),
      ).toBeDisabled();
    });

    it("uses the locked character label as the button accessible name", () => {
      render(<CharacterCard {...defaultProps} character={lockedCharacter} />);

      expect(
        screen.getByRole("button", {
          name: "Locked Character",
        }),
      ).toBeInTheDocument();
    });

    it("uses the locked character label as the image alt text", () => {
      render(<CharacterCard {...defaultProps} character={lockedCharacter} />);

      expect(
        screen.getByRole("img", {
          name: "Locked Character",
        }),
      ).toBeInTheDocument();
    });

    it("renders the locked label", () => {
      render(<CharacterCard {...defaultProps} character={lockedCharacter} />);

      expect(screen.getByText("Locked")).toBeInTheDocument();
    });

    it("renders the lock icon", () => {
      const { container } = render(
        <CharacterCard {...defaultProps} character={lockedCharacter} />,
      );

      expect(
        container.querySelector("svg.lucide-lock-keyhole"),
      ).toBeInTheDocument();
    });

    it("does not expose aria-pressed for a locked character", () => {
      render(<CharacterCard {...defaultProps} character={lockedCharacter} />);

      expect(
        screen.getByRole("button", {
          name: "Locked Character",
        }),
      ).not.toHaveAttribute("aria-pressed");
    });
  });

  describe("sound effects", () => {
    it("plays interfaceOpen when hovering over an available unselected card", async () => {
      const user = userEvent.setup();

      render(<CharacterCard {...defaultProps} isSelected={false} />);

      await user.hover(
        screen.getByRole("button", {
          name: "Rerbert, Frontend Developer",
        }),
      );

      expect(playSound).toHaveBeenCalledWith("interfaceOpen");
      expect(playSound).toHaveBeenCalledTimes(1);
    });

    it("does not play sound when hovering over a selected card", async () => {
      const user = userEvent.setup();

      render(<CharacterCard {...defaultProps} isSelected />);

      await user.hover(
        screen.getByRole("button", {
          name: "Rerbert, Frontend Developer",
        }),
      );

      expect(playSound).not.toHaveBeenCalled();
    });

    it("does not play sound when hovering over a locked card", async () => {
      const user = userEvent.setup();

      const lockedCharacter = {
        ...mockCharacter,
        status: "locked",
      } as Character;

      render(<CharacterCard {...defaultProps} character={lockedCharacter} />);

      await user.hover(
        screen.getByRole("button", {
          name: "Locked Character",
        }),
      );

      expect(playSound).not.toHaveBeenCalled();
    });
  });
});
