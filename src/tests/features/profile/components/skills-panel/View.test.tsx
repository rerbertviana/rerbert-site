import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { View } from "@/features/profile/components/skills-panel/View";

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: () => ({
    locale: "en",
    dictionary: {
      profile: {
        skills: {
          title: "Skills",
          description: "Explore my technical skills.",
          technologiesLabel: "Technologies",
          viewMore: "View More",
        },
      },
    },
  }),
}));

jest.mock("@/shared/lib/audio/audioManager", () => ({
  playSound: jest.fn(),
}));

jest.mock("@/features/profile/data/skills", () => ({
  MOBILE_SKILLS_LIMIT: 3,
  SKILLS: [
    { name: "React", image: "/images/react.png" },
    { name: "TypeScript", image: "/images/typescript.png" },
    { name: "Next.js", image: "/images/nextjs.png" },
    { name: "Node.js", image: "/images/nodejs.png" },
    { name: "Tailwind CSS", image: "/images/tailwind.png" },
  ],
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    ...props
  }: {
    children: ReactNode;
    [key: string]: unknown;
  }) => <a {...props}>{children}</a>,
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
  }) => <span role="img" aria-label={alt} data-src={src} {...props} />,
}));

jest.mock("@/shared/components/decorative-gradient-border/View", () => ({
  View: () => <div data-testid="decorative-gradient-border" />,
}));

import { playSound } from "@/shared/lib/audio/audioManager";

describe("Profile Skills Panel - View", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the skills title", () => {
    render(<View />);

    expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
  });

  it("should render the skills description", () => {
    render(<View />);

    expect(
      screen.getByText("Explore my technical skills."),
    ).toBeInTheDocument();
  });

  it("should render the technologies group with the correct label", () => {
    render(<View />);

    expect(
      screen.getByRole("group", { name: "Technologies" }),
    ).toBeInTheDocument();
  });

  it("should render the link with the correct destination", () => {
    render(<View />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/en/skills");
  });

  it("should render the link with the correct accessible name", () => {
    render(<View />);

    expect(
      screen.getByRole("link", {
        name: "Skills: Explore my technical skills.",
      }),
    ).toBeInTheDocument();
  });

  it("should render all technologies from the skills data", () => {
    render(<View />);

    expect(screen.getByRole("img", { name: "React" })).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "TypeScript" })).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "Next.js" })).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "Node.js" })).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: "Tailwind CSS" }),
    ).toBeInTheDocument();
  });

  it("should render technology images with their correct sources", () => {
    render(<View />);

    expect(screen.getByRole("img", { name: "React" })).toHaveAttribute(
      "data-src",
      "/images/react.png",
    );

    expect(screen.getByRole("img", { name: "TypeScript" })).toHaveAttribute(
      "data-src",
      "/images/typescript.png",
    );

    expect(screen.getByRole("img", { name: "Next.js" })).toHaveAttribute(
      "data-src",
      "/images/nextjs.png",
    );
  });

  it("should render the View More indicator", () => {
    render(<View />);

    expect(screen.getByText("View More")).toBeInTheDocument();
  });

  it("should play interfaceOpen sound on mouse enter", () => {
    render(<View />);

    fireEvent.mouseEnter(screen.getByRole("link"));

    expect(playSound).toHaveBeenCalledWith("interfaceOpen");
  });

  it("should play buttonConfirm sound on click", () => {
    render(<View />);

    fireEvent.click(screen.getByRole("link"));

    expect(playSound).toHaveBeenCalledWith("buttonConfirm");
  });

  it("should render the decorative gradient border", () => {
    render(<View />);

    expect(
      screen.getByTestId("decorative-gradient-border"),
    ).toBeInTheDocument();
  });

  it("should render the link with focus-visible accessibility classes", () => {
    render(<View />);

    const link = screen.getByRole("link");

    expect(link).toHaveClass("focus-visible:outline-none");
    expect(link).toHaveClass("focus-visible:ring-2");
    expect(link).toHaveClass("focus-visible:ring-[#80FF00]");
  });
});
