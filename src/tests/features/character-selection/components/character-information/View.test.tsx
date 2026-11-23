import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";

import { CharacterInformation } from "@/features/character-selection/components/character-information/View";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import type { CharacterProfile } from "@/features/character-selection/types/character";

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: jest.fn(),
}));

jest.mock("motion/react", () => ({
  motion: {
    section: ({
      children,
      initial,
      animate,
      transition,
      ...props
    }: {
      children: ReactNode;
      initial?: boolean | Record<string, unknown>;
      animate?: Record<string, unknown>;
      transition?: Record<string, unknown>;
      [key: string]: unknown;
    }) => (
      <section
        {...props}
        data-testid="motion-section"
        data-initial-state={
          initial === false ? "false" : JSON.stringify(initial)
        }
        data-animate-state={JSON.stringify(animate)}
        data-transition-state={JSON.stringify(transition)}
      >
        {children}
      </section>
    ),
  },
}));

jest.mock("@/shared/components/decorative-gradient-border/View", () => ({
  View: jest.fn(() => <div data-testid="decorative-border" />),
}));

describe("CharacterInformation View", () => {
  const mockDictionary = {
    characterSelection: {
      information: {
        label: "Character Information",
        level: "Level",
        experience: "Experience",
        education: "Education",
        location: "Location",
        status: "Status",
        available: "Available",
        unavailable: "Unavailable",
      },
    },
  };

  const mockProfile = {
    seniority: "Senior",
    experience: "6 years",
    education: "Information Systems",
    location: "Brazil",
    isAvailable: true,
  } as CharacterProfile;

  beforeEach(() => {
    jest.clearAllMocks();

    (useLanguage as jest.Mock).mockReturnValue({
      dictionary: mockDictionary,
    });
  });

  describe("rendering", () => {
    it("renders nothing when no profile is provided", () => {
      const { container } = render(<CharacterInformation />);

      expect(container).toBeEmptyDOMElement();
    });

    it("renders the information section when a profile is provided", () => {
      render(<CharacterInformation profile={mockProfile} />);

      expect(
        screen.getByRole("region", {
          name: "Character Information",
        }),
      ).toBeInTheDocument();
    });

    it("renders the decorative border", () => {
      render(<CharacterInformation profile={mockProfile} />);

      expect(screen.getByTestId("decorative-border")).toBeInTheDocument();
    });
  });

  describe("profile information", () => {
    it("renders the seniority information", () => {
      render(<CharacterInformation profile={mockProfile} />);

      expect(screen.getAllByText("Senior")).toHaveLength(2);
      expect(screen.getAllByText("Level")).toHaveLength(2);
    });

    it("renders the experience information", () => {
      render(<CharacterInformation profile={mockProfile} />);

      expect(screen.getByText("6 years")).toBeInTheDocument();
      expect(screen.getByText("Experience")).toBeInTheDocument();
    });

    it("renders the education information", () => {
      render(<CharacterInformation profile={mockProfile} />);

      expect(screen.getByText("Information Systems")).toBeInTheDocument();
      expect(screen.getByText("Education")).toBeInTheDocument();
    });

    it("renders the location information", () => {
      render(<CharacterInformation profile={mockProfile} />);

      expect(screen.getByText("Brazil")).toBeInTheDocument();
      expect(screen.getByText("Location")).toBeInTheDocument();
    });

    it("renders all information labels", () => {
      render(<CharacterInformation profile={mockProfile} />);

      expect(screen.getAllByText("Level")).toHaveLength(2);
      expect(screen.getByText("Experience")).toBeInTheDocument();
      expect(screen.getByText("Education")).toBeInTheDocument();
      expect(screen.getByText("Location")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
    });
  });

  describe("localization", () => {
    it("uses localized seniority when provided", () => {
      render(
        <CharacterInformation
          profile={mockProfile}
          localizedSeniority="Especialista"
        />,
      );

      expect(screen.getAllByText("Especialista")).toHaveLength(2);
      expect(screen.queryByText("Senior")).not.toBeInTheDocument();
    });

    it("uses localized experience when provided", () => {
      render(
        <CharacterInformation
          profile={mockProfile}
          localizedExperience="6 anos"
        />,
      );

      expect(screen.getByText("6 anos")).toBeInTheDocument();
      expect(screen.queryByText("6 years")).not.toBeInTheDocument();
    });

    it("uses localized education when provided", () => {
      render(
        <CharacterInformation
          profile={mockProfile}
          localizedEducation="Sistemas de Informação"
        />,
      );

      expect(screen.getByText("Sistemas de Informação")).toBeInTheDocument();

      expect(screen.queryByText("Information Systems")).not.toBeInTheDocument();
    });

    it("uses original values when localized values are not provided", () => {
      render(<CharacterInformation profile={mockProfile} />);

      expect(screen.getAllByText("Senior")).toHaveLength(2);
      expect(screen.getByText("6 years")).toBeInTheDocument();
      expect(screen.getByText("Information Systems")).toBeInTheDocument();
    });

    it("renders translated labels when the dictionary changes", () => {
      (useLanguage as jest.Mock).mockReturnValue({
        dictionary: {
          characterSelection: {
            information: {
              label: "Informações do personagem",
              level: "Nível",
              experience: "Experiência",
              education: "Formação",
              location: "Localização",
              status: "Status",
              available: "Disponível",
              unavailable: "Indisponível",
            },
          },
        },
      });

      render(<CharacterInformation profile={mockProfile} />);

      expect(
        screen.getByRole("region", {
          name: "Informações do personagem",
        }),
      ).toBeInTheDocument();

      expect(screen.getAllByText("Nível")).toHaveLength(2);
      expect(screen.getByText("Experiência")).toBeInTheDocument();
      expect(screen.getByText("Formação")).toBeInTheDocument();
      expect(screen.getByText("Localização")).toBeInTheDocument();
      expect(screen.getByText("Disponível")).toBeInTheDocument();
    });
  });

  describe("availability status", () => {
    it("renders the available status when the profile is available", () => {
      render(<CharacterInformation profile={mockProfile} />);

      expect(screen.getByText("Available")).toBeInTheDocument();
    });

    it("renders the unavailable status when the profile is unavailable", () => {
      const unavailableProfile = {
        ...mockProfile,
        isAvailable: false,
      } as CharacterProfile;

      render(<CharacterInformation profile={unavailableProfile} />);

      expect(screen.getByText("Unavailable")).toBeInTheDocument();
    });

    it("uses the available status styling", () => {
      render(<CharacterInformation profile={mockProfile} />);

      expect(screen.getByText("Available")).toHaveStyle({
        borderColor: "rgba(128, 255, 0, 0.7)",
        backgroundColor: "rgba(128, 255, 0, 0.1)",
      });
    });

    it("uses the unavailable status styling", () => {
      const unavailableProfile = {
        ...mockProfile,
        isAvailable: false,
      } as CharacterProfile;

      render(<CharacterInformation profile={unavailableProfile} />);

      expect(screen.getByText("Unavailable")).toHaveStyle({
        borderColor: "rgba(255, 59, 92, 0.7)",
        backgroundColor: "rgba(255, 59, 92, 0.1)",
      });
    });
  });

  describe("conditional information", () => {
    it("does not render experience value when experience is empty", () => {
      const profile = {
        ...mockProfile,
        experience: "",
      } as CharacterProfile;

      render(<CharacterInformation profile={profile} />);

      expect(screen.getByText("Experience")).toBeInTheDocument();
      expect(screen.queryByText("6 years")).not.toBeInTheDocument();
    });

    it("does not render education value when education is empty", () => {
      const profile = {
        ...mockProfile,
        education: "",
      } as CharacterProfile;

      render(<CharacterInformation profile={profile} />);

      expect(screen.getByText("Education")).toBeInTheDocument();
      expect(screen.queryByText("Information Systems")).not.toBeInTheDocument();
    });

    it("does not render location value when location is empty", () => {
      const profile = {
        ...mockProfile,
        location: "",
      } as CharacterProfile;

      render(<CharacterInformation profile={profile} />);

      expect(screen.getByText("Location")).toBeInTheDocument();
      expect(screen.queryByText("Brazil")).not.toBeInTheDocument();
    });
  });

  describe("animation", () => {
    it("uses false as the initial animation state by default", () => {
      render(<CharacterInformation profile={mockProfile} />);

      expect(screen.getByTestId("motion-section")).toHaveAttribute(
        "data-initial-state",
        "false",
      );
    });

    it("sets the initial animation when shouldAnimate is true", () => {
      render(<CharacterInformation profile={mockProfile} shouldAnimate />);

      expect(screen.getByTestId("motion-section")).toHaveAttribute(
        "data-initial-state",
        JSON.stringify({
          opacity: 0,
          y: 12,
          filter: "blur(4px)",
        }),
      );
    });

    it("renders the expected animation target", () => {
      render(<CharacterInformation profile={mockProfile} />);

      expect(screen.getByTestId("motion-section")).toHaveAttribute(
        "data-animate-state",
        JSON.stringify({
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }),
      );
    });
  });
});
