import { render, screen } from "@testing-library/react";
import { View } from "@/features/profile/components/profile-title/View";

const mockDictionary = {
  profile: {
    pageLabel: "CHARACTER PROFILE",
    title: "Developer Profile",
    subtitle: "Discover my journey",
  },
};

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: () => ({
    dictionary: mockDictionary,
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
    <section
      data-testid="page-title"
      data-id={id}
      data-decoration={decoration}
      data-brackets={brackets}
    >
      <span data-testid="page-label">{pageLabel}</span>
      <h1 data-testid="title">{title}</h1>
      <span data-testid="subtitle">{subtitle}</span>
    </section>
  ),
}));

describe("Profile Title - View", () => {
  beforeEach(() => {
    mockDictionary.profile.title = "Developer Profile";
    mockDictionary.profile.pageLabel = "CHARACTER PROFILE";
    mockDictionary.profile.subtitle = "Discover my journey";
  });

  it("should render the page label", () => {
    render(<View />);

    expect(screen.getByTestId("page-label")).toHaveTextContent(
      "CHARACTER PROFILE",
    );
  });

  it("should render the subtitle", () => {
    render(<View />);

    expect(screen.getByTestId("subtitle")).toHaveTextContent(
      "Discover my journey",
    );
  });

  it("should render the complete title", () => {
    render(<View />);

    const title = screen.getByTestId("title");

    expect(title).toHaveTextContent("Developer");
    expect(title).toHaveTextContent("Profile");
  });

  it("should render the title prefix in white", () => {
    render(<View />);

    const prefix = screen.getByText("Developer");

    expect(prefix).toHaveClass("text-white");
  });

  it("should highlight the last word of the title in green", () => {
    render(<View />);

    const highlightedWord = screen.getByText("Profile");

    expect(highlightedWord).toHaveClass("text-[#8AFF00]");
  });

  it("should render the PageTitle with the correct id", () => {
    render(<View />);

    expect(screen.getByTestId("page-title")).toHaveAttribute(
      "data-id",
      "profile-title",
    );
  });

  it("should use side-lines decoration", () => {
    render(<View />);

    expect(screen.getByTestId("page-title")).toHaveAttribute(
      "data-decoration",
      "side-lines",
    );
  });

  it("should use angle brackets decoration", () => {
    render(<View />);

    expect(screen.getByTestId("page-title")).toHaveAttribute(
      "data-brackets",
      "angle",
    );
  });

  it("should highlight the entire title when it contains only one word", () => {
    mockDictionary.profile.title = "Profile";

    render(<View />);

    const highlightedWord = screen.getByText("Profile");

    expect(highlightedWord).toHaveClass("text-[#8AFF00]");
    expect(screen.queryByText("Developer")).not.toBeInTheDocument();
  });

  it("should highlight the entire title when it contains no spaces", () => {
    mockDictionary.profile.title = "Developer";

    render(<View />);

    const highlightedWord = screen.getByText("Developer");

    expect(highlightedWord).toHaveClass("text-[#8AFF00]");
  });
});
