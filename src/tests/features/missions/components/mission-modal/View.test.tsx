import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { View } from "@/features/missions/components/mission-modal/View";

import { playSound } from "@/shared/lib/audio/audioManager";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    alt,
    src,
    ...props
  }: {
    alt: string;
    src: string;
    [key: string]: unknown;
  }) => (
    <span
      role="img"
      aria-label={alt || "Mission image"}
      data-src={src}
      {...props}
    />
  ),
}));

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: () => ({
    dictionary: {
      missions: {
        card: {
          closeDetails: "Close details",
          overview: "Overview",
          responsibilities: "Responsibilities",
          sourceCode: "Source code",
          technologies: "Technologies",
        },
      },
    },
  }),
}));

jest.mock("@/shared/lib/audio/audioManager", () => ({
  playSound: jest.fn(),
}));

const defaultProps = {
  id: "portfolio",
  title: "Portfolio",
  description: "A personal developer portfolio.",
  details: ["Developed reusable components.", "Implemented responsive design."],
  period: "2025 - Present",
  image: "/images/portfolio.png",
  technologies: ["React", "TypeScript"],
  isExperience: false,
  onClose: jest.fn(),
};

describe("Mission Modal View", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render the modal", () => {
    render(<View {...defaultProps} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<View {...defaultProps} />);

    expect(
      screen.getByRole("heading", { name: "Portfolio" }),
    ).toBeInTheDocument();
  });

  it("should render the period", () => {
    render(<View {...defaultProps} />);

    expect(screen.getByText("2025 - Present")).toBeInTheDocument();
  });

  it("should render the description", () => {
    render(<View {...defaultProps} />);

    expect(
      screen.getByText("A personal developer portfolio."),
    ).toBeInTheDocument();
  });

  it("should render the overview section", () => {
    render(<View {...defaultProps} />);

    expect(screen.getByText("Overview")).toBeInTheDocument();
  });

  it("should render the mission image", () => {
    render(<View {...defaultProps} />);

    expect(screen.getByRole("img", { name: "Mission image" })).toHaveAttribute(
      "data-src",
      "/images/portfolio.png",
    );
  });

  it("should render the close button", () => {
    render(<View {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: "Close details" }),
    ).toBeInTheDocument();
  });

  it("should focus the close button on mount", () => {
    render(<View {...defaultProps} />);

    expect(screen.getByRole("button", { name: "Close details" })).toHaveFocus();
  });

  it("should lock body scroll on mount", () => {
    render(<View {...defaultProps} />);

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("should close when clicking the close button", () => {
    render(<View {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Close details" }));

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    expect(playSound).toHaveBeenCalledWith("interfaceClose");
  });

  it("should close when pressing Escape", () => {
    render(<View {...defaultProps} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    expect(playSound).toHaveBeenCalledWith("interfaceClose");
  });

  it("should not close when pressing another key", () => {
    render(<View {...defaultProps} />);

    fireEvent.keyDown(document, { key: "Enter" });

    expect(defaultProps.onClose).not.toHaveBeenCalled();
    expect(playSound).not.toHaveBeenCalled();
  });

  it("should close when clicking the backdrop", () => {
    render(<View {...defaultProps} />);

    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.parentElement;

    expect(backdrop).not.toBeNull();

    fireEvent.click(backdrop!);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    expect(playSound).toHaveBeenCalledWith("interfaceClose");
  });

  it("should not close when clicking modal content", () => {
    render(<View {...defaultProps} />);

    fireEvent.click(screen.getByText("A personal developer portfolio."));

    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it("should restore body scroll on unmount", () => {
    const { unmount } = render(<View {...defaultProps} />);

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("should render responsibilities for an experience", () => {
    render(
      <View
        {...defaultProps}
        isExperience
        details={["Developed frontend applications.", "Worked with APIs."]}
      />,
    );

    expect(screen.getByText("Responsibilities")).toBeInTheDocument();

    expect(
      screen.getByText("Developed frontend applications."),
    ).toBeInTheDocument();

    expect(screen.getByText("Worked with APIs.")).toBeInTheDocument();
  });

  it("should not render responsibilities for a project", () => {
    render(<View {...defaultProps} isExperience={false} />);

    expect(screen.queryByText("Responsibilities")).not.toBeInTheDocument();
  });

  it("should not render responsibilities when details are empty", () => {
    render(<View {...defaultProps} isExperience details={[]} />);

    expect(screen.queryByText("Responsibilities")).not.toBeInTheDocument();
  });

  it("should render frontend source code link", () => {
    render(
      <View
        {...defaultProps}
        frontendUrl="https://github.com/example/frontend"
      />,
    );

    expect(screen.getByRole("link", { name: /frontend/i })).toHaveAttribute(
      "href",
      "https://github.com/example/frontend",
    );
  });

  it("should render backend source code link", () => {
    render(
      <View
        {...defaultProps}
        backendUrl="https://github.com/example/backend"
      />,
    );

    expect(screen.getByRole("link", { name: /backend/i })).toHaveAttribute(
      "href",
      "https://github.com/example/backend",
    );
  });

  it("should render both source code links", () => {
    render(
      <View
        {...defaultProps}
        frontendUrl="https://github.com/example/frontend"
        backendUrl="https://github.com/example/backend"
      />,
    );

    expect(screen.getByRole("link", { name: /frontend/i })).toHaveAttribute(
      "href",
      "https://github.com/example/frontend",
    );

    expect(screen.getByRole("link", { name: /backend/i })).toHaveAttribute(
      "href",
      "https://github.com/example/backend",
    );
  });

  it("should not render source code section when urls are absent", () => {
    render(
      <View {...defaultProps} frontendUrl={undefined} backendUrl={undefined} />,
    );

    expect(screen.queryByText("Source code")).not.toBeInTheDocument();
  });

  it("should render technologies", () => {
    render(<View {...defaultProps} technologies={["React", "TypeScript"]} />);

    expect(screen.getByTitle("React")).toBeInTheDocument();

    expect(screen.getByTitle("TypeScript")).toBeInTheDocument();
  });

  it("should render the technology icon when the technology matches SKILLS", () => {
    render(<View {...defaultProps} technologies={["React"]} />);

    expect(screen.getByRole("img", { name: "React" })).toBeInTheDocument();
  });

  it("should render fallback for unknown technologies", () => {
    render(<View {...defaultProps} technologies={["Unknown Technology"]} />);

    expect(screen.getByLabelText("Unknown Technology")).toBeInTheDocument();
  });

  it("should not render the technologies section when technologies are empty", () => {
    render(<View {...defaultProps} technologies={[]} />);

    expect(screen.queryByText("Technologies")).not.toBeInTheDocument();
  });
});
