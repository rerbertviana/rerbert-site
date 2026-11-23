import { render, screen } from "@testing-library/react";

import { SiteFooter } from "@/shared/components/layout/site-footer/View";

import { useLanguage } from "@/shared/i18n/LanguageProvider";

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: jest.fn(),
}));

describe("SiteFooter View", () => {
  const mockDictionary = {
    footer: {
      keyboardShortcuts: "Keyboard shortcuts",
      navigate: "Navigate",
      select: "Select",
      back: "Back",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useLanguage as jest.Mock).mockReturnValue({
      dictionary: mockDictionary,
    });
  });

  describe("rendering", () => {
    it("renders the footer", () => {
      render(<SiteFooter />);

      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("renders the version label", () => {
      render(<SiteFooter />);

      expect(screen.getByText("/ v1.0.0")).toBeInTheDocument();
    });

    it("renders the decorative SVG", () => {
      const { container } = render(<SiteFooter />);

      expect(
        container.querySelector('svg[aria-hidden="true"]'),
      ).toBeInTheDocument();
    });

    it("marks the decorative SVG as hidden from assistive technologies", () => {
      const { container } = render(<SiteFooter />);

      const decorativeSvg = container.querySelector("svg");

      expect(decorativeSvg).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("keyboard shortcuts", () => {
    it("renders the keyboard shortcuts group with its accessible label", () => {
      render(<SiteFooter />);

      expect(
        screen.getByRole("group", {
          name: "Keyboard shortcuts",
        }),
      ).toBeInTheDocument();
    });

    it("renders the navigation shortcuts", () => {
      render(<SiteFooter />);

      expect(screen.getByText("←")).toBeInTheDocument();
      expect(screen.getByText("→")).toBeInTheDocument();
      expect(screen.getByText("Navigate")).toBeInTheDocument();
    });

    it("renders the selection shortcut", () => {
      render(<SiteFooter />);

      expect(screen.getByText("Enter")).toBeInTheDocument();
      expect(screen.getByText("Select")).toBeInTheDocument();
    });

    it("renders the back shortcut", () => {
      render(<SiteFooter />);

      expect(screen.getByText("Esc")).toBeInTheDocument();
      expect(screen.getByText("Back")).toBeInTheDocument();
    });

    it("renders shortcuts using keyboard elements", () => {
      render(<SiteFooter />);

      const footer = screen.getByRole("contentinfo");

      expect(footer.querySelectorAll("kbd")).toHaveLength(4);
    });
  });

  describe("localization", () => {
    it("renders the labels provided by the dictionary", () => {
      render(<SiteFooter />);

      expect(
        screen.getByRole("group", {
          name: "Keyboard shortcuts",
        }),
      ).toBeInTheDocument();

      expect(screen.getByText("Navigate")).toBeInTheDocument();

      expect(screen.getByText("Select")).toBeInTheDocument();

      expect(screen.getByText("Back")).toBeInTheDocument();
    });

    it("renders translated labels when the dictionary changes", () => {
      (useLanguage as jest.Mock).mockReturnValue({
        dictionary: {
          footer: {
            keyboardShortcuts: "Atalhos do teclado",
            navigate: "Navegar",
            select: "Selecionar",
            back: "Voltar",
          },
        },
      });

      render(<SiteFooter />);

      expect(
        screen.getByRole("group", {
          name: "Atalhos do teclado",
        }),
      ).toBeInTheDocument();

      expect(screen.getByText("Navegar")).toBeInTheDocument();

      expect(screen.getByText("Selecionar")).toBeInTheDocument();

      expect(screen.getByText("Voltar")).toBeInTheDocument();
    });
  });
});
