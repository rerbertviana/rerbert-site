import { render, screen } from "@testing-library/react";
import { View } from "@/features/skills/components/skills-title/View";

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: () => ({
    dictionary: {
      skills: {
        pageLabel: "Skills",
        title: "My Arsenal",
        subtitle: "Technologies and tools I use",
      },
    },
  }),
}));

jest.mock("@/shared/components/page-title/View", () => ({
  View: ({
    id,
    pageLabel,
    subtitle,
    title,
    decoration,
    brackets,
  }: {
    id: string;
    pageLabel: string;
    subtitle: string;
    title: React.ReactNode;
    decoration: string;
    brackets: string;
  }) => (
    <div
      data-testid="page-title"
      data-id={id}
      data-page-label={pageLabel}
      data-subtitle={subtitle}
      data-decoration={decoration}
      data-brackets={brackets}
    >
      <div data-testid="page-title-heading">{title}</div>
    </div>
  ),
}));

describe("Skills Title - View", () => {
  it("should render the PageTitle component", () => {
    render(<View />);

    expect(screen.getByTestId("page-title")).toBeInTheDocument();
  });

  it("should pass the correct id to PageTitle", () => {
    render(<View />);

    expect(screen.getByTestId("page-title")).toHaveAttribute(
      "data-id",
      "skills-title",
    );
  });

  it("should pass the correct page label", () => {
    render(<View />);

    expect(screen.getByTestId("page-title")).toHaveAttribute(
      "data-page-label",
      "Skills",
    );
  });

  it("should pass the correct subtitle", () => {
    render(<View />);

    expect(screen.getByTestId("page-title")).toHaveAttribute(
      "data-subtitle",
      "Technologies and tools I use",
    );
  });

  it("should render the translated title", () => {
    render(<View />);

    expect(screen.getByText("My Arsenal")).toBeInTheDocument();
  });

  it("should pass the side-lines decoration", () => {
    render(<View />);

    expect(screen.getByTestId("page-title")).toHaveAttribute(
      "data-decoration",
      "side-lines",
    );
  });

  it("should pass the angle brackets configuration", () => {
    render(<View />);

    expect(screen.getByTestId("page-title")).toHaveAttribute(
      "data-brackets",
      "angle",
    );
  });

  it("should render the title inside the PageTitle component", () => {
    render(<View />);

    expect(screen.getByTestId("page-title-heading")).toContainElement(
      screen.getByText("My Arsenal"),
    );
  });
});
