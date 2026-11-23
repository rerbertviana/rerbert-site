import { fireEvent, render, screen } from "@testing-library/react";
import { View } from "@/features/profile/components/links-panel/View";

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: () => ({
    dictionary: {
      profile: {
        links: {
          title: "Links",
          description: "Connect with me through my social networks.",
        },
      },
    },
  }),
}));

jest.mock("@/shared/lib/audio/audioManager", () => ({
  playSound: jest.fn(),
}));

jest.mock("@/features/profile/data/social-links", () => ({
  SOCIAL_LINKS: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/example",
      image: "/images/github.png",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/example",
      image: "/images/linkedin.png",
    },
  ],
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
    <span
      role="img"
      aria-label={alt || "social-icon"}
      data-src={src}
      {...props}
    />
  ),
}));

jest.mock("@/shared/components/decorative-gradient-border/View", () => ({
  View: () => <div data-testid="decorative-gradient-border" />,
}));

import { playSound } from "@/shared/lib/audio/audioManager";

describe("Profile Links Panel - View", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the links title", () => {
    render(<View />);

    expect(screen.getByRole("heading", { name: "Links" })).toBeInTheDocument();
  });

  it("should render the links description", () => {
    render(<View />);

    expect(
      screen.getByText("Connect with me through my social networks."),
    ).toBeInTheDocument();
  });

  it("should render the social navigation", () => {
    render(<View />);

    expect(
      screen.getByRole("navigation", { name: "Links" }),
    ).toBeInTheDocument();
  });

  it("should render the GitHub link", () => {
    render(<View />);

    expect(
      screen.getByRole("link", { name: "Visit GitHub" }),
    ).toBeInTheDocument();
  });

  it("should render the LinkedIn link", () => {
    render(<View />);

    expect(
      screen.getByRole("link", { name: "Visit LinkedIn" }),
    ).toBeInTheDocument();
  });

  it("should render the correct social link destinations", () => {
    render(<View />);

    expect(screen.getByRole("link", { name: "Visit GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/example",
    );

    expect(
      screen.getByRole("link", { name: "Visit LinkedIn" }),
    ).toHaveAttribute("href", "https://linkedin.com/in/example");
  });

  it("should open social links in a new tab", () => {
    render(<View />);

    const githubLink = screen.getByRole("link", {
      name: "Visit GitHub",
    });

    const linkedinLink = screen.getByRole("link", {
      name: "Visit LinkedIn",
    });

    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("target", "_blank");
  });

  it("should render the secure rel attribute on social links", () => {
    render(<View />);

    const githubLink = screen.getByRole("link", {
      name: "Visit GitHub",
    });

    const linkedinLink = screen.getByRole("link", {
      name: "Visit LinkedIn",
    });

    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render the social link titles", () => {
    render(<View />);

    expect(screen.getByRole("link", { name: "Visit GitHub" })).toHaveAttribute(
      "title",
      "GitHub",
    );

    expect(
      screen.getByRole("link", { name: "Visit LinkedIn" }),
    ).toHaveAttribute("title", "LinkedIn");
  });

  it("should render the social icons with the correct image sources", () => {
    render(<View />);

    const githubLink = screen.getByRole("link", {
      name: "Visit GitHub",
    });

    const linkedinLink = screen.getByRole("link", {
      name: "Visit LinkedIn",
    });

    expect(
      githubLink.querySelector('[data-src="/images/github.png"]'),
    ).toBeInTheDocument();

    expect(
      linkedinLink.querySelector('[data-src="/images/linkedin.png"]'),
    ).toBeInTheDocument();
  });

  it("should render social icons with empty alt text", () => {
    render(<View />);

    const githubLink = screen.getByRole("link", {
      name: "Visit GitHub",
    });

    const linkedinLink = screen.getByRole("link", {
      name: "Visit LinkedIn",
    });

    expect(githubLink.querySelector('[aria-label=""]')).toBeNull();
    expect(linkedinLink.querySelector('[aria-label=""]')).toBeNull();
  });

  it("should play interfaceOpen sound on mouse enter", () => {
    render(<View />);

    fireEvent.mouseEnter(screen.getByRole("article"));

    expect(playSound).toHaveBeenCalledWith("interfaceOpen");
  });

  it("should play buttonConfirm sound when clicking a social link", () => {
    render(<View />);

    fireEvent.click(screen.getByRole("link", { name: "Visit GitHub" }));

    expect(playSound).toHaveBeenCalledWith("buttonConfirm");
  });

  it("should render the decorative gradient border", () => {
    render(<View />);

    expect(
      screen.getByTestId("decorative-gradient-border"),
    ).toBeInTheDocument();
  });

  it("should render the social links with focus-visible accessibility classes", () => {
    render(<View />);

    const githubLink = screen.getByRole("link", {
      name: "Visit GitHub",
    });

    expect(githubLink).toHaveClass("focus-visible:outline-none");
    expect(githubLink).toHaveClass("focus-visible:ring-2");
    expect(githubLink).toHaveClass("focus-visible:ring-[#80FF00]");
    expect(githubLink).toHaveClass("focus-visible:ring-offset-2");
    expect(githubLink).toHaveClass("focus-visible:ring-offset-[#100C24]");
  });
});
