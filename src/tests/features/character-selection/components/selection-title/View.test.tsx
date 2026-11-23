import { render, screen } from "@testing-library/react";

import { SelectionTitle } from "@/features/character-selection/components/selection-title/View";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { View as PageTitle } from "@/shared/components/page-title/View";

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: jest.fn(),
}));

jest.mock("@/shared/components/page-title/View", () => ({
  View: jest.fn(
    ({
      id,
      pageLabel,
      subtitle,
      title,
    }: {
      id: string;
      pageLabel: string;
      subtitle: string;
      title: React.ReactNode;
    }) => (
      <section data-testid="page-title" id={id}>
        <span data-testid="page-label">{pageLabel}</span>
        <span data-testid="page-subtitle">{subtitle}</span>
        <div data-testid="page-heading">{title}</div>
      </section>
    ),
  ),
}));

describe("SelectionTitle View", () => {
  const mockDictionary = {
    characterSelection: {
      sectionLabel: "Character Selection",
      subtitle: "Choose your character",
      title: {
        first: "SELECT",
        highlight: "YOUR CHARACTER",
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
    it("renders the PageTitle component", () => {
      render(<SelectionTitle />);

      expect(screen.getByTestId("page-title")).toBeInTheDocument();
      expect(PageTitle).toHaveBeenCalled();
    });

    it("passes the correct id to PageTitle", () => {
      render(<SelectionTitle />);

      expect(screen.getByTestId("page-title")).toHaveAttribute(
        "id",
        "selection-title",
      );
    });

    it("renders the section label", () => {
      render(<SelectionTitle />);

      expect(screen.getByTestId("page-label")).toHaveTextContent(
        "Character Selection",
      );
    });

    it("renders the subtitle", () => {
      render(<SelectionTitle />);

      expect(screen.getByTestId("page-subtitle")).toHaveTextContent(
        "Choose your character",
      );
    });
  });

  describe("title content", () => {
    it("renders both title parts", () => {
      render(<SelectionTitle />);

      expect(screen.getByText("SELECT")).toBeInTheDocument();
      expect(screen.getByText("YOUR CHARACTER")).toBeInTheDocument();
    });

    it("renders the title highlight with its expected class", () => {
      render(<SelectionTitle />);

      expect(screen.getByText("YOUR CHARACTER")).toHaveClass("text-[#8AFF00]");
    });

    it("renders the first title part in white", () => {
      render(<SelectionTitle />);

      expect(screen.getByText("SELECT")).toHaveClass("text-white");
    });
  });

  describe("PageTitle configuration", () => {
    it("passes the expected visual configuration", () => {
      render(<SelectionTitle />);

      expect(PageTitle).toHaveBeenCalledWith(
        expect.objectContaining({
          id: "selection-title",
          pageLabel: "Character Selection",
          subtitle: "Choose your character",
          decoration: "angular-divider",
          brackets: "chevron",
          labelFont: "default",
        }),
        undefined,
      );
    });
  });

  describe("localization", () => {
    it("renders translated content when the dictionary changes", () => {
      (useLanguage as jest.Mock).mockReturnValue({
        dictionary: {
          characterSelection: {
            sectionLabel: "Seleção de Personagem",
            subtitle: "Escolha seu personagem",
            title: {
              first: "ESCOLHA",
              highlight: "SEU PERSONAGEM",
            },
          },
        },
      });

      render(<SelectionTitle />);

      expect(screen.getByTestId("page-label")).toHaveTextContent(
        "Seleção de Personagem",
      );

      expect(screen.getByTestId("page-subtitle")).toHaveTextContent(
        "Escolha seu personagem",
      );

      expect(screen.getByText("ESCOLHA")).toBeInTheDocument();
      expect(screen.getByText("SEU PERSONAGEM")).toBeInTheDocument();
    });
  });
});
