import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SelectCharacterButton } from "@/features/character-selection/components/select-character-button/View";
import { useLanguage } from "@/shared/i18n/LanguageProvider";

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: jest.fn(),
}));

describe("SelectCharacterButton View", () => {
  const mockDictionary = {
    characterSelection: {
      button: {
        select: "Select Character",
        confirm: "Confirm Selection",
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useLanguage as jest.Mock).mockReturnValue({
      dictionary: mockDictionary,
    });
  });

  describe("rendering", () => {
    it("renders the button", () => {
      render(<SelectCharacterButton onClick={jest.fn()} />);

      expect(
        screen.getByRole("button", { name: "Confirm Selection" }),
      ).toBeInTheDocument();
    });

    it("renders the decorative energy line", () => {
      const { container } = render(
        <SelectCharacterButton onClick={jest.fn()} />,
      );

      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("marks the decorative SVG as hidden from accessibility", () => {
      const { container } = render(
        <SelectCharacterButton onClick={jest.fn()} />,
      );

      expect(container.querySelector("svg")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("renders the button with type button", () => {
      render(<SelectCharacterButton onClick={jest.fn()} />);

      expect(
        screen.getByRole("button", { name: "Confirm Selection" }),
      ).toHaveAttribute("type", "button");
    });
  });

  describe("button label", () => {
    it("renders the select label when disabled", () => {
      render(<SelectCharacterButton disabled onClick={jest.fn()} />);

      expect(
        screen.getByRole("button", { name: "Select Character" }),
      ).toBeInTheDocument();
    });

    it("renders the confirm label when enabled", () => {
      render(<SelectCharacterButton disabled={false} onClick={jest.fn()} />);

      expect(
        screen.getByRole("button", { name: "Confirm Selection" }),
      ).toBeInTheDocument();
    });

    it("renders the confirm label by default", () => {
      render(<SelectCharacterButton onClick={jest.fn()} />);

      expect(
        screen.getByRole("button", { name: "Confirm Selection" }),
      ).toBeInTheDocument();
    });
  });

  describe("button state", () => {
    it("is enabled when disabled is false", () => {
      render(<SelectCharacterButton disabled={false} onClick={jest.fn()} />);

      expect(
        screen.getByRole("button", { name: "Confirm Selection" }),
      ).toBeEnabled();
    });

    it("is disabled when disabled is true", () => {
      render(<SelectCharacterButton disabled onClick={jest.fn()} />);

      expect(
        screen.getByRole("button", { name: "Select Character" }),
      ).toBeDisabled();
    });

    it("is enabled by default", () => {
      render(<SelectCharacterButton onClick={jest.fn()} />);

      expect(
        screen.getByRole("button", { name: "Confirm Selection" }),
      ).toBeEnabled();
    });
  });

  describe("interaction", () => {
    it("calls onClick when the enabled button is clicked", async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();

      render(<SelectCharacterButton disabled={false} onClick={onClick} />);

      await user.click(
        screen.getByRole("button", { name: "Confirm Selection" }),
      );

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when the disabled button is clicked", async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();

      render(<SelectCharacterButton disabled onClick={onClick} />);

      await user.click(
        screen.getByRole("button", { name: "Select Character" }),
      );

      expect(onClick).not.toHaveBeenCalled();
    });

    it("calls onClick only once per click", async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();

      render(<SelectCharacterButton onClick={onClick} />);

      await user.click(
        screen.getByRole("button", { name: "Confirm Selection" }),
      );

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("localization", () => {
    it("uses localized button labels", () => {
      (useLanguage as jest.Mock).mockReturnValue({
        dictionary: {
          characterSelection: {
            button: {
              select: "Selecionar Personagem",
              confirm: "Confirmar Seleção",
            },
          },
        },
      });

      render(<SelectCharacterButton onClick={jest.fn()} />);

      expect(
        screen.getByRole("button", { name: "Confirmar Seleção" }),
      ).toBeInTheDocument();
    });

    it("uses the localized select label when disabled", () => {
      (useLanguage as jest.Mock).mockReturnValue({
        dictionary: {
          characterSelection: {
            button: {
              select: "Selecionar Personagem",
              confirm: "Confirmar Seleção",
            },
          },
        },
      });

      render(<SelectCharacterButton disabled onClick={jest.fn()} />);

      expect(
        screen.getByRole("button", {
          name: "Selecionar Personagem",
        }),
      ).toBeInTheDocument();
    });
  });
});
