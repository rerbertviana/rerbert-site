import { render, screen } from "@testing-library/react";
import { View } from "@/features/skills/components/skills-grid/View";
import type { SkillCategoryId } from "@/shared/types/skills";

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: () => ({
    dictionary: {
      skills: {
        technologiesLabel: "Technologies",
      },
    },
  }),
}));

jest.mock("@/shared/data/skills", () => ({
  SKILL_CATEGORIES: [
    {
      id: "frontend",
      skills: [
        {
          id: "react",
          name: "React",
          image: "/images/react.svg",
          proficiency: "advanced",
        },
        {
          id: "typescript",
          name: "TypeScript",
          image: "/images/typescript.svg",
          proficiency: "advanced",
        },
      ],
    },
    {
      id: "backend",
      skills: [
        {
          id: "node",
          name: "Node.js",
          image: "/images/node.svg",
          proficiency: "intermediate",
        },
      ],
    },
  ],
}));

jest.mock("@/features/skills/components/skill-card/View", () => ({
  View: ({
    skill,
  }: {
    skill: {
      id: string;
      name: string;
    };
  }) => (
    <div
      data-testid="skill-card"
      data-skill-id={skill.id}
      data-skill-name={skill.name}
    />
  ),
}));

describe("Skills Grid - View", () => {
  const frontendCategoryId = "frontend" as SkillCategoryId;
  const backendCategoryId = "backend" as SkillCategoryId;

  it("should render the technologies section", () => {
    render(<View selectedCategoryId={frontendCategoryId} />);

    expect(
      screen.getByRole("region", { name: "Technologies" }),
    ).toBeInTheDocument();
  });

  it("should render two skills for the frontend category", () => {
    render(<View selectedCategoryId={frontendCategoryId} />);

    expect(screen.getAllByTestId("skill-card")).toHaveLength(2);
  });

  it("should render the React skill", () => {
    render(<View selectedCategoryId={frontendCategoryId} />);

    const cards = screen.getAllByTestId("skill-card");

    expect(cards[0]).toHaveAttribute("data-skill-id", "react");
    expect(cards[0]).toHaveAttribute("data-skill-name", "React");
  });

  it("should render all skills in the correct order", () => {
    render(<View selectedCategoryId={frontendCategoryId} />);

    const cards = screen.getAllByTestId("skill-card");

    expect(cards[0]).toHaveAttribute("data-skill-id", "react");
    expect(cards[1]).toHaveAttribute("data-skill-id", "typescript");
  });

  it("should render the skills from the backend category", () => {
    render(<View selectedCategoryId={backendCategoryId} />);

    const cards = screen.getAllByTestId("skill-card");

    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveAttribute("data-skill-id", "node");
    expect(cards[0]).toHaveAttribute("data-skill-name", "Node.js");
  });

  it("should only render skills from the selected category", () => {
    render(<View selectedCategoryId={backendCategoryId} />);

    const cards = screen.getAllByTestId("skill-card");

    expect(cards).toHaveLength(1);
    expect(cards[0]).toHaveAttribute("data-skill-id", "node");

    expect(
      cards.some((card) => card.getAttribute("data-skill-id") === "react"),
    ).toBe(false);
  });

  it("should return null when the selected category does not exist", () => {
    const { container } = render(
      <View selectedCategoryId={"invalid" as SkillCategoryId} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("should not render the technologies section when the category does not exist", () => {
    render(<View selectedCategoryId={"invalid" as SkillCategoryId} />);

    expect(
      screen.queryByRole("region", { name: "Technologies" }),
    ).not.toBeInTheDocument();
  });
});
