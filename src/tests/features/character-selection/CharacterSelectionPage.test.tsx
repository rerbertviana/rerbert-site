import { render, screen } from "@testing-library/react";
import { CharacterSelectionPage } from "@/features/character-selection/CharacterSelectionPage";

jest.mock("@/shared/components/layout/site-layout/View", () => ({
  SiteLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="site-layout">{children}</div>
  ),
}));

jest.mock("@/features/character-selection/views/View", () => ({
  View: () => <div data-testid="character-selection-view" />,
}));

describe("CharacterSelectionPage", () => {
  describe("Rendering", () => {
    it("should render the SiteLayout", () => {
      render(<CharacterSelectionPage />);

      expect(screen.getByTestId("site-layout")).toBeInTheDocument();
    });

    it("should render the CharacterSelection View", () => {
      render(<CharacterSelectionPage />);

      expect(
        screen.getByTestId("character-selection-view"),
      ).toBeInTheDocument();
    });

    it("should render the main element with the correct accessible name", () => {
      render(<CharacterSelectionPage />);

      expect(
        screen.getByRole("main", { name: "RERBERT.EXE" }),
      ).toBeInTheDocument();
    });

    it("should render the CharacterSelection View inside the main element", () => {
      render(<CharacterSelectionPage />);

      const main = screen.getByRole("main", {
        name: "RERBERT.EXE",
      });

      expect(main).toContainElement(
        screen.getByTestId("character-selection-view"),
      );
    });

    it("should render the main element inside the SiteLayout", () => {
      render(<CharacterSelectionPage />);

      const siteLayout = screen.getByTestId("site-layout");
      const main = screen.getByRole("main", {
        name: "RERBERT.EXE",
      });

      expect(siteLayout).toContainElement(main);
    });
  });
});
