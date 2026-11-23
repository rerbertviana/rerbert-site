import { render, screen } from "@testing-library/react";
import { View } from "@/features/skills/components/category-header/View";
import type { SkillCategoryId } from "@/shared/types/skills";

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: () => ({
    dictionary: {
      skills: {
        categoryDetails: {
          frontend: {
            title: "Frontend Development",
            description: "Building interactive user interfaces.",
          },
          testing: {
            title: "Testing",
            description: "Ensuring software quality.",
          },
        },
        technologiesLabel: "Technologies",
      },
    },
  }),
}));

jest.mock("@/features/skills/data/category-config", () => ({
  SKILL_CATEGORY_ICONS: {
    frontend: ({ ...props }: Record<string, unknown>) => (
      <svg data-testid="category-icon" {...props} />
    ),
    testing: ({ ...props }: Record<string, unknown>) => (
      <svg data-testid="category-icon" {...props} />
    ),
  },
}));

describe("Category Header - View", () => {
  const categoryId = "frontend" as SkillCategoryId;

  it("should render the category header", () => {
    render(<View categoryId={categoryId} technologiesCount={5} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("should render the category icon", () => {
    render(<View categoryId={categoryId} technologiesCount={5} />);

    expect(screen.getByTestId("category-icon")).toBeInTheDocument();
  });

  it("should render the first word of the category title", () => {
    render(<View categoryId={categoryId} technologiesCount={5} />);

    expect(screen.getByText("Frontend")).toBeInTheDocument();
  });

  it("should render the remaining words of the category title", () => {
    render(<View categoryId={categoryId} technologiesCount={5} />);

    expect(screen.getByText("Development")).toBeInTheDocument();
  });

  it("should render the category description", () => {
    render(<View categoryId={categoryId} technologiesCount={5} />);

    expect(
      screen.getByText("Building interactive user interfaces."),
    ).toBeInTheDocument();
  });

  it("should render the technologies count", () => {
    render(<View categoryId={categoryId} technologiesCount={5} />);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should render the technologies label", () => {
    render(<View categoryId={categoryId} technologiesCount={5} />);

    expect(screen.getByText("Technologies")).toBeInTheDocument();
  });

  it("should render a title with only one word", () => {
    render(
      <View categoryId={"testing" as SkillCategoryId} technologiesCount={3} />,
    );

    expect(screen.getByText("Testing")).toBeInTheDocument();
    expect(screen.getByText("Ensuring software quality.")).toBeInTheDocument();
  });

  it("should not render an empty remaining title section for a single-word title", () => {
    render(
      <View categoryId={"testing" as SkillCategoryId} technologiesCount={3} />,
    );

    expect(screen.queryByText(" ", { exact: true })).not.toBeInTheDocument();
  });

  it("should render the icon as decorative", () => {
    render(<View categoryId={categoryId} technologiesCount={5} />);

    expect(screen.getByTestId("category-icon")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("should render the correct number of technologies for another category", () => {
    render(
      <View categoryId={"testing" as SkillCategoryId} technologiesCount={3} />,
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
