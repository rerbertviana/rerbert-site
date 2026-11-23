import { render, screen } from "@testing-library/react";
import { View } from "@/features/skills/components/skill-card/View";
import type { Skill } from "@/shared/types/skills";

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: () => ({
    dictionary: {
      skills: {
        proficiency: {
          basic: "Basic",
          intermediate: "Intermediate",
          advanced: "Advanced",
        },
      },
    },
  }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => (
    <span data-testid="skill-image" data-src={src} data-alt={alt} {...props} />
  ),
}));

describe("Skill Card - View", () => {
  const skill: Skill = {
    id: "react",
    name: "React",
    image: "/images/skills/react.svg",
    proficiency: "advanced",
  };

  it("should render the skill name", () => {
    render(<View skill={skill} />);

    expect(screen.getByRole("heading", { name: "React" })).toBeInTheDocument();
  });

  it("should render the proficiency level", () => {
    render(<View skill={skill} />);

    expect(screen.getByText("Advanced")).toBeInTheDocument();
  });

  it("should render the skill card with its accessible name", () => {
    render(<View skill={skill} />);

    expect(
      screen.getByRole("article", { name: "React - Advanced" }),
    ).toBeInTheDocument();
  });

  it("should render the skill image with the correct source", () => {
    render(<View skill={skill} />);

    expect(screen.getByTestId("skill-image")).toHaveAttribute(
      "data-src",
      "/images/skills/react.svg",
    );
  });

  it("should render the skill image with empty alt text", () => {
    render(<View skill={skill} />);

    expect(screen.getByTestId("skill-image")).toHaveAttribute("data-alt", "");
  });

  it("should render the proficiency progress bar", () => {
    render(<View skill={skill} />);

    expect(
      screen.getByRole("progressbar", {
        name: "React proficiency",
      }),
    ).toBeInTheDocument();
  });

  it("should render the progress bar with the correct values for advanced proficiency", () => {
    render(<View skill={skill} />);

    const progressbar = screen.getByRole("progressbar", {
      name: "React proficiency",
    });

    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
    expect(progressbar).toHaveAttribute("aria-valuenow", "100");
  });

  it("should render the progress bar with 65% for intermediate proficiency", () => {
    render(
      <View
        skill={{
          ...skill,
          proficiency: "intermediate",
        }}
      />,
    );

    expect(
      screen.getByRole("progressbar", {
        name: "React proficiency",
      }),
    ).toHaveAttribute("aria-valuenow", "65");
  });

  it("should render the progress bar with 35% for basic proficiency", () => {
    render(
      <View
        skill={{
          ...skill,
          proficiency: "basic",
        }}
      />,
    );

    expect(
      screen.getByRole("progressbar", {
        name: "React proficiency",
      }),
    ).toHaveAttribute("aria-valuenow", "35");
  });

  it("should render the progress bar with the correct width for advanced proficiency", () => {
    render(<View skill={skill} />);

    const progressbar = screen.getByRole("progressbar", {
      name: "React proficiency",
    });

    expect(progressbar.firstElementChild).toHaveStyle({
      width: "100%",
    });
  });

  it("should render the progress bar with the correct width for intermediate proficiency", () => {
    render(
      <View
        skill={{
          ...skill,
          proficiency: "intermediate",
        }}
      />,
    );

    const progressbar = screen.getByRole("progressbar", {
      name: "React proficiency",
    });

    expect(progressbar.firstElementChild).toHaveStyle({
      width: "65%",
    });
  });

  it("should render the progress bar with the correct width for basic proficiency", () => {
    render(
      <View
        skill={{
          ...skill,
          proficiency: "basic",
        }}
      />,
    );

    const progressbar = screen.getByRole("progressbar", {
      name: "React proficiency",
    });

    expect(progressbar.firstElementChild).toHaveStyle({
      width: "35%",
    });
  });

  it("should apply the green accent color for advanced proficiency", () => {
    render(<View skill={skill} />);

    expect(screen.getByText("Advanced")).toHaveStyle({
      color: "#80FF00",
    });
  });

  it("should apply the purple accent color for intermediate proficiency", () => {
    render(
      <View
        skill={{
          ...skill,
          proficiency: "intermediate",
        }}
      />,
    );

    expect(screen.getByText("Intermediate")).toHaveStyle({
      color: "#B77AFF",
    });
  });

  it("should apply the blue accent color for basic proficiency", () => {
    render(
      <View
        skill={{
          ...skill,
          proficiency: "basic",
        }}
      />,
    );

    expect(screen.getByText("Basic")).toHaveStyle({
      color: "#38BDF8",
    });
  });

  it("should apply the corresponding accent color to the progress indicator", () => {
    render(<View skill={skill} />);

    const progressbar = screen.getByRole("progressbar", {
      name: "React proficiency",
    });

    expect(progressbar.firstElementChild).toHaveStyle({
      backgroundColor: "#80FF00",
    });
  });
});
