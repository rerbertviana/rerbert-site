import { render, screen } from "@testing-library/react";
import { View } from "@/features/profile/views/View";

jest.mock("@/shared/components/navigation/back-button/View", () => ({
  View: ({ href }: { href: string }) => (
    <div data-testid="back-button" data-href={href} />
  ),
}));

jest.mock("@/features/profile/components/links-panel/View", () => ({
  View: () => <div data-testid="links-panel" />,
}));

jest.mock("@/features/profile/components/missions-panel/View", () => ({
  View: () => <div data-testid="missions-panel" />,
}));

jest.mock(
  "@/shared/components/animations/digital-reconstruction-entrance/View",
  () => ({
    View: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="digital-reconstruction-entrance">{children}</div>
    ),
  }),
);

jest.mock("@/features/profile/components/profile-title/View", () => ({
  View: () => <div data-testid="profile-title" />,
}));

jest.mock("@/features/profile/components/skills-panel/View", () => ({
  View: () => <div data-testid="skills-panel" />,
}));

describe("Profile View", () => {
  it("should render the Digital Reconstruction Entrance wrapper", () => {
    render(<View />);

    expect(
      screen.getByTestId("digital-reconstruction-entrance"),
    ).toBeInTheDocument();
  });

  it("should render the main element with the Character Profile accessible name", () => {
    render(<View />);

    expect(
      screen.getByRole("main", { name: "Character Profile" }),
    ).toBeInTheDocument();
  });

  it("should render the ProfileTitle component", () => {
    render(<View />);

    expect(screen.getByTestId("profile-title")).toBeInTheDocument();
  });

  it("should render the BackButton component", () => {
    render(<View />);

    expect(screen.getByTestId("back-button")).toBeInTheDocument();
  });

  it("should render the BackButton with an empty href", () => {
    render(<View />);

    expect(screen.getByTestId("back-button")).toHaveAttribute("data-href", "");
  });

  it("should render the SkillsPanel component", () => {
    render(<View />);

    expect(screen.getByTestId("skills-panel")).toBeInTheDocument();
  });

  it("should render the MissionsPanel component", () => {
    render(<View />);

    expect(screen.getByTestId("missions-panel")).toBeInTheDocument();
  });

  it("should render the LinksPanel component", () => {
    render(<View />);

    expect(screen.getByTestId("links-panel")).toBeInTheDocument();
  });

  it("should render all profile panels", () => {
    render(<View />);

    expect(screen.getByTestId("skills-panel")).toBeInTheDocument();
    expect(screen.getByTestId("missions-panel")).toBeInTheDocument();
    expect(screen.getByTestId("links-panel")).toBeInTheDocument();
  });

  it("should render the profile components inside the main element", () => {
    render(<View />);

    const main = screen.getByRole("main", {
      name: "Character Profile",
    });

    expect(main).toContainElement(screen.getByTestId("profile-title"));
    expect(main).toContainElement(screen.getByTestId("back-button"));
    expect(main).toContainElement(screen.getByTestId("skills-panel"));
    expect(main).toContainElement(screen.getByTestId("missions-panel"));
    expect(main).toContainElement(screen.getByTestId("links-panel"));
  });

  it("should render the profile panels in the expected order", () => {
    render(<View />);

    const panels = [
      screen.getByTestId("skills-panel"),
      screen.getByTestId("missions-panel"),
      screen.getByTestId("links-panel"),
    ];

    expect(panels[0]).toBeInTheDocument();
    expect(panels[1]).toBeInTheDocument();
    expect(panels[2]).toBeInTheDocument();

    expect(panels[0].compareDocumentPosition(panels[1])).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );

    expect(panels[1].compareDocumentPosition(panels[2])).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
});
