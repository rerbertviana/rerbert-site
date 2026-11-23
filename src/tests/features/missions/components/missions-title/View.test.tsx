import { render, screen } from "@testing-library/react";
import { View } from "@/features/missions/components/missions-title/View";

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: () => ({
    dictionary: {
      missions: {
        pageLabel: "MISSIONS",
        title: "MISSIONS TITLE",
        subtitle: "Explore my professional journey",
      },
    },
  }),
}));

jest.mock("@/shared/components/page-title/View", () => ({
  View: ({
    id,
    pageLabel,
    subtitle,
    decoration,
    brackets,
    title,
  }: {
    id: string;
    pageLabel: string;
    subtitle: string;
    decoration: string;
    brackets: string;
    title: React.ReactNode;
  }) => (
    <div
      data-testid="page-title"
      data-id={id}
      data-page-label={pageLabel}
      data-subtitle={subtitle}
      data-decoration={decoration}
      data-brackets={brackets}
    >
      {title}
    </div>
  ),
}));

describe("MissionsTitle View", () => {
  describe("Rendering", () => {
    it("should render the PageTitle component", () => {
      render(<View />);

      expect(screen.getByTestId("page-title")).toBeInTheDocument();
    });

    it("should pass the correct id", () => {
      render(<View />);

      expect(screen.getByTestId("page-title")).toHaveAttribute(
        "data-id",
        "missions-title",
      );
    });

    it("should pass the page label from the dictionary", () => {
      render(<View />);

      expect(screen.getByTestId("page-title")).toHaveAttribute(
        "data-page-label",
        "MISSIONS",
      );
    });

    it("should pass the subtitle from the dictionary", () => {
      render(<View />);

      expect(screen.getByTestId("page-title")).toHaveAttribute(
        "data-subtitle",
        "Explore my professional journey",
      );
    });

    it("should pass the correct decoration configuration", () => {
      render(<View />);

      expect(screen.getByTestId("page-title")).toHaveAttribute(
        "data-decoration",
        "side-lines",
      );
    });

    it("should pass the correct brackets configuration", () => {
      render(<View />);

      expect(screen.getByTestId("page-title")).toHaveAttribute(
        "data-brackets",
        "angle",
      );
    });
  });

  describe("Title", () => {
    it("should render the title from the dictionary", () => {
      render(<View />);

      expect(screen.getByText("MISSIONS TITLE")).toBeInTheDocument();
    });

    it("should render the title with the expected color class", () => {
      render(<View />);

      const title = screen.getByText("MISSIONS TITLE");

      expect(title).toHaveClass("text-[#8AFF00]");
    });
  });
});
