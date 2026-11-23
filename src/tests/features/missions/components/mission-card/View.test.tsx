import { render, screen, fireEvent } from "@testing-library/react";

import { View } from "@/features/missions/components/mission-card/View";
import type { TimelineEntry } from "@/features/missions/types/timeline";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { playSound } from "@/shared/lib/audio/audioManager";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <span role="img" aria-label={alt} data-src={src} />
  ),
}));

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: jest.fn(),
}));

jest.mock("@/shared/lib/audio/audioManager", () => ({
  playSound: jest.fn(),
}));

jest.mock("@/shared/components/decorative-gradient-border/View", () => ({
  View: () => <div data-testid="decorative-border" />,
}));

jest.mock("@/features/missions/components/mission-modal/View", () => ({
  View: (props: { title: string; onClose: () => void }) => (
    <div data-testid="mission-modal">
      <span>{props.title}</span>
      <button onClick={props.onClose}>Close modal</button>
    </div>
  ),
}));

const mockUseLanguage = useLanguage as jest.Mock;

const dictionary = {
  missions: {
    card: {
      inProgress: "In Progress",
    },
    categories: {
      experience: "Experience",
      project: "Project",
    },
  },
};

function createProjectEntry(): TimelineEntry {
  return {
    id: "portfolio",
    type: "project",
    data: {
      name: "Portfolio",
      image: "/images/portfolio.png",
      completedAt: "2026-10",
      technologies: ["React", "Next.js", "TypeScript"],
      content: {
        en: {
          description: "A personal developer portfolio.",
          highlights: ["Interactive portfolio"],
        },
        "pt-BR": {
          description: "Um portfolio pessoal.",
          highlights: ["Portfolio interativo"],
        },
      },
      frontendUrl: "https://github.com/frontend",
      backendUrl: "https://github.com/backend",
    } as TimelineEntry["data"],
    sortDate: null,
    isInProgress: false,
  } as TimelineEntry;
}

function createExperienceEntry(): TimelineEntry {
  return {
    id: "compass-uol",
    type: "experience",
    data: {
      company: "Compass UOL",
      startDate: "2024-01",
      endDate: "2025-01",
      technologies: ["React", "TypeScript"],
      content: {
        en: {
          overview: "Worked on frontend development.",
          responsibilities: ["Developed frontend applications"],
        },
        "pt-BR": {
          overview: "Trabalhei com desenvolvimento frontend.",
          responsibilities: ["Desenvolvimento de aplicações"],
        },
      },
    } as TimelineEntry["data"],
    sortDate: "2025-01",
    isInProgress: false,
  } as TimelineEntry;
}

describe("Mission Card View", () => {
  beforeEach(() => {
    mockUseLanguage.mockReturnValue({
      locale: "en",
      dictionary,
    });

    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a project card correctly", () => {
    render(<View entry={createProjectEntry()} />);

    expect(screen.getByText("Portfolio")).toBeInTheDocument();
    expect(
      screen.getByText("A personal developer portfolio."),
    ).toBeInTheDocument();
    expect(screen.getByText("Project")).toBeInTheDocument();
    expect(screen.getByText("TECH")).toBeInTheDocument();
    expect(screen.getByTestId("decorative-border")).toBeInTheDocument();
  });

  it("should render an experience card correctly", () => {
    render(<View entry={createExperienceEntry()} />);

    expect(screen.getByText("Compass UOL")).toBeInTheDocument();
    expect(
      screen.getByText("Worked on frontend development."),
    ).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
  });

  it("should render the card as an accessible button", () => {
    render(<View entry={createProjectEntry()} />);

    const card = screen.getByRole("button", {
      name: "Portfolio - Project. View details",
    });

    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("tabIndex", "0");
    expect(card).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("should open the modal when the card is clicked", () => {
    render(<View entry={createProjectEntry()} />);

    const card = screen.getByRole("button", {
      name: "Portfolio - Project. View details",
    });

    fireEvent.click(card);

    expect(screen.getByTestId("mission-modal")).toBeInTheDocument();
    expect(playSound).toHaveBeenCalledWith("buttonConfirm");
  });

  it("should open the modal when Enter is pressed", () => {
    render(<View entry={createProjectEntry()} />);

    const card = screen.getByRole("button", {
      name: "Portfolio - Project. View details",
    });

    fireEvent.keyDown(card, { key: "Enter" });

    expect(screen.getByTestId("mission-modal")).toBeInTheDocument();
    expect(playSound).toHaveBeenCalledWith("buttonConfirm");
  });

  it("should open the modal when Space is pressed", () => {
    render(<View entry={createProjectEntry()} />);

    const card = screen.getByRole("button", {
      name: "Portfolio - Project. View details",
    });

    fireEvent.keyDown(card, { key: " " });

    expect(screen.getByTestId("mission-modal")).toBeInTheDocument();
    expect(playSound).toHaveBeenCalledWith("buttonConfirm");
  });

  it("should prevent the default behavior when Space is pressed", () => {
    render(<View entry={createProjectEntry()} />);

    const card = screen.getByRole("button", {
      name: "Portfolio - Project. View details",
    });

    const event = new KeyboardEvent("keydown", {
      key: " ",
      bubbles: true,
      cancelable: true,
    });

    card.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it("should not open the modal when another key is pressed", () => {
    render(<View entry={createProjectEntry()} />);

    const card = screen.getByRole("button", {
      name: "Portfolio - Project. View details",
    });

    fireEvent.keyDown(card, { key: "Escape" });

    expect(screen.queryByTestId("mission-modal")).not.toBeInTheDocument();
    expect(playSound).not.toHaveBeenCalled();
  });

  it("should close the modal when its close callback is triggered", () => {
    render(<View entry={createProjectEntry()} />);

    const card = screen.getByRole("button", {
      name: "Portfolio - Project. View details",
    });

    fireEvent.click(card);

    expect(screen.getByTestId("mission-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close modal" }));

    expect(screen.queryByTestId("mission-modal")).not.toBeInTheDocument();
  });

  it("should return focus to the card after closing the modal", () => {
    render(<View entry={createProjectEntry()} />);

    const card = screen.getByRole("button", {
      name: "Portfolio - Project. View details",
    });

    fireEvent.click(card);

    fireEvent.click(screen.getByRole("button", { name: "Close modal" }));

    expect(card).toHaveFocus();
  });

  it("should not play the confirmation sound again when the modal is already open", () => {
    render(<View entry={createProjectEntry()} />);

    const card = screen.getByRole("button", {
      name: "Portfolio - Project. View details",
    });

    fireEvent.click(card);

    expect(playSound).toHaveBeenCalledTimes(1);

    fireEvent.click(card);

    expect(playSound).toHaveBeenCalledTimes(1);
  });

  it("should display the in-progress label for an unfinished project", () => {
    const entry = createProjectEntry();

    if (entry.type === "project") {
      entry.data.completedAt = null;
    }

    render(<View entry={entry} />);

    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("should render the project image when provided", () => {
    render(<View entry={createProjectEntry()} />);

    const image = screen.getByRole("img", { name: "Portfolio" });

    expect(image).toHaveAttribute("data-src", "/images/portfolio.png");
  });

  it("should render the mapped image when no image is available", () => {
    const entry = createProjectEntry();

    if (entry.type === "project") {
      delete entry.data.image;
    }

    render(<View entry={entry} />);

    const image = screen.getByRole("img", { name: "Portfolio" });

    expect(image).toHaveAttribute(
      "data-src",
      "/images/missions/projects/portfolio.png",
    );
  });
});
