import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { View } from "@/features/profile/components/missions-panel/View";

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: () => ({
    locale: "en",
    dictionary: {
      profile: {
        missions: {
          title: "Missions",
          description: "Explore my professional journey.",
          viewMore: "View More",
        },
      },
    },
  }),
}));

jest.mock("@/shared/lib/audio/audioManager", () => ({
  playSound: jest.fn(),
}));

jest.mock("@/shared/data/missions", () => ({
  missions: [
    {
      id: "mission-1",
      company: "Company One",
      startDate: "2022-01",
      endDate: "2023-01",
      content: {
        en: { role: "Frontend Developer" },
        "pt-BR": { role: "Desenvolvedor Frontend" },
      },
    },
    {
      id: "mission-2",
      company: "Company Two",
      startDate: "2023-02",
      endDate: "2024-02",
      content: {
        en: { role: "Software Developer" },
        "pt-BR": { role: "Desenvolvedor de Software" },
      },
    },
    {
      id: "mission-3",
      company: "Company Three",
      startDate: "2024-03",
      endDate: "2025-03",
      content: {
        en: { role: "Full Stack Developer" },
        "pt-BR": { role: "Desenvolvedor Full Stack" },
      },
    },
    {
      id: "mission-4",
      company: "Company Four",
      startDate: "2025-04",
      endDate: "2026-04",
      content: {
        en: { role: "Senior Developer" },
        "pt-BR": { role: "Desenvolvedor Senior" },
      },
    },
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

jest.mock("@/shared/components/decorative-gradient-border/View", () => ({
  View: () => <div data-testid="decorative-gradient-border" />,
}));

import { playSound } from "@/shared/lib/audio/audioManager";

describe("Profile Missions Panel - View", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the missions title", () => {
    render(<View />);

    expect(
      screen.getByRole("heading", { name: "Missions" }),
    ).toBeInTheDocument();
  });

  it("should render the missions description", () => {
    render(<View />);

    expect(
      screen.getByText("Explore my professional journey."),
    ).toBeInTheDocument();
  });

  it("should render the link with the correct destination", () => {
    render(<View />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/en/missions");
  });

  it("should render the link with the correct accessible name", () => {
    render(<View />);

    expect(
      screen.getByRole("link", {
        name: "Missions: Explore my professional journey.",
      }),
    ).toBeInTheDocument();
  });

  it("should render the missions timeline", () => {
    render(<View />);

    expect(screen.getByRole("list", { name: "Missions" })).toBeInTheDocument();
  });

  it("should render only the three featured missions", () => {
    render(<View />);

    const timeline = screen.getByRole("list", {
      name: "Missions",
    });

    expect(timeline.querySelectorAll("li")).toHaveLength(3);
  });

  it("should render the featured companies", () => {
    render(<View />);

    expect(
      screen.getByRole("heading", { name: "Company One" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Company Two" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Company Three" }),
    ).toBeInTheDocument();
  });

  it("should not render the fourth mission", () => {
    render(<View />);

    expect(
      screen.queryByRole("heading", { name: "Company Four" }),
    ).not.toBeInTheDocument();
  });

  it("should render the localized roles", () => {
    render(<View />);

    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();

    expect(screen.getByText("Software Developer")).toBeInTheDocument();

    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
  });

  it("should format mission dates using the English locale", () => {
    render(<View />);

    expect(screen.getByText("Jan 2022 – Jan 2023")).toBeInTheDocument();

    expect(screen.getByText("Feb 2023 – Feb 2024")).toBeInTheDocument();

    expect(screen.getByText("Mar 2024 – Mar 2025")).toBeInTheDocument();
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
    expect(link).toHaveClass("focus-visible:ring-offset-2");
  });
});
