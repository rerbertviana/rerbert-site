import { render, screen } from "@testing-library/react";
import { SkillsPage } from "@/features/skills/SkillsPage";

jest.mock("@/shared/components/layout/site-layout/View", () => ({
  SiteLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="site-layout">{children}</div>
  ),
}));

jest.mock("@/features/skills/views/View", () => ({
  View: () => <div data-testid="skills-view" />,
}));

describe("SkillsPage", () => {
  it("should render the SiteLayout", () => {
    render(<SkillsPage />);

    expect(screen.getByTestId("site-layout")).toBeInTheDocument();
  });

  it("should render the Skills View", () => {
    render(<SkillsPage />);

    expect(screen.getByTestId("skills-view")).toBeInTheDocument();
  });

  it("should render the Skills View inside the SiteLayout", () => {
    render(<SkillsPage />);

    const layout = screen.getByTestId("site-layout");
    const skillsView = screen.getByTestId("skills-view");

    expect(layout).toContainElement(skillsView);
  });
});
