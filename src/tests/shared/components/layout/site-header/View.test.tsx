import { render, screen, fireEvent } from "@testing-library/react";

import { SiteHeader } from "@/shared/components/layout/site-header/View";

import { useController } from "@/shared/components/layout/site-header/useController";

jest.mock("@/shared/components/layout/site-header/useController", () => ({
  useController: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => {
    return <div role="img" aria-label={alt || undefined} data-src={src} />;
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("SiteHeader View", () => {
  const mockHandleSoundToggle = jest.fn();
  const mockHandleLanguageMenuToggle = jest.fn();
  const mockHandleLanguageChange = jest.fn();
  const mockHandleLanguageMenuKeyDown = jest.fn();
  const mockHandleLanguageButtonKeyDown = jest.fn();

  const mockLanguageMenuRef = { current: null };
  const mockLanguageListRef = { current: null };
  const mockLanguageButtonRef = { current: null };

  const mockDictionary = {
    navigation: {
      home: "Home",
    },
    header: {
      developerPortfolio: "Developer Portfolio",
      disableSound: "Disable sound",
      enableSound: "Enable sound",
      selectLanguage: "Select language",
      languageOptions: "Language options",
      downloadCv: "Download CV",
      cv: "CV",
    },
  };

  const createControllerMock = (overrides: Record<string, unknown> = {}) => ({
    locale: "en",
    dictionary: mockDictionary,
    resumeUrl: "/resume/rerbert-cv-english.pdf",
    isLanguageMenuOpen: false,
    isSoundEnabled: true,
    languageMenuRef: mockLanguageMenuRef,
    languageListRef: mockLanguageListRef,
    languageButtonRef: mockLanguageButtonRef,
    handleSoundToggle: mockHandleSoundToggle,
    handleLanguageMenuToggle: mockHandleLanguageMenuToggle,
    handleLanguageChange: mockHandleLanguageChange,
    handleLanguageMenuKeyDown: mockHandleLanguageMenuKeyDown,
    handleLanguageButtonKeyDown: mockHandleLanguageButtonKeyDown,
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();

    (useController as jest.Mock).mockReturnValue(createControllerMock());
  });

  describe("rendering", () => {
    it("renders the header", () => {
      render(<SiteHeader />);

      expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("renders the brand", () => {
      render(<SiteHeader />);

      expect(
        screen.getByRole("link", {
          name: "RERBERT — Home",
        }),
      ).toBeInTheDocument();

      expect(screen.getByText("RERBERT")).toBeInTheDocument();

      expect(screen.getByText("Developer Portfolio")).toBeInTheDocument();
    });

    it("links the brand to the current locale homepage", () => {
      render(<SiteHeader />);

      expect(
        screen.getByRole("link", {
          name: "RERBERT — Home",
        }),
      ).toHaveAttribute("href", "/en");
    });

    it("links the brand to the Brazilian Portuguese homepage", () => {
      (useController as jest.Mock).mockReturnValue(
        createControllerMock({
          locale: "pt-BR",
        }),
      );

      render(<SiteHeader />);

      expect(
        screen.getByRole("link", {
          name: "RERBERT — Home",
        }),
      ).toHaveAttribute("href", "/pt-BR");
    });

    it("renders the decorative header SVG", () => {
      const { container } = render(<SiteHeader />);

      const decorativeSvg = container.querySelector('svg[aria-hidden="true"]');

      expect(decorativeSvg).toBeInTheDocument();
    });
  });

  describe("audio control", () => {
    it("renders the sound enabled state", () => {
      render(<SiteHeader />);

      const soundButton = screen.getByRole("button", {
        name: "Disable sound",
      });

      expect(soundButton).toBeInTheDocument();
      expect(soundButton).toHaveAttribute("aria-pressed", "true");
    });

    it("renders the sound disabled state", () => {
      (useController as jest.Mock).mockReturnValue(
        createControllerMock({
          isSoundEnabled: false,
        }),
      );

      render(<SiteHeader />);

      const soundButton = screen.getByRole("button", {
        name: "Enable sound",
      });

      expect(soundButton).toBeInTheDocument();
      expect(soundButton).toHaveAttribute("aria-pressed", "false");
    });

    it("calls the sound toggle handler when clicked", () => {
      render(<SiteHeader />);

      fireEvent.click(
        screen.getByRole("button", {
          name: "Disable sound",
        }),
      );

      expect(mockHandleSoundToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe("language control", () => {
    it("renders the language selector button", () => {
      render(<SiteHeader />);

      const languageButton = screen.getByRole("button", {
        name: "Select language",
      });

      expect(languageButton).toBeInTheDocument();
      expect(languageButton).toHaveAttribute("aria-haspopup", "menu");
      expect(languageButton).toHaveAttribute("aria-expanded", "false");
      expect(languageButton).toHaveAttribute("aria-controls", "language-menu");
    });

    it("renders the current language short label", () => {
      render(<SiteHeader />);

      expect(screen.getByText("EN")).toBeInTheDocument();
    });

    it("renders the Brazilian Portuguese short label", () => {
      (useController as jest.Mock).mockReturnValue(
        createControllerMock({
          locale: "pt-BR",
        }),
      );

      render(<SiteHeader />);

      expect(screen.getByText("PT")).toBeInTheDocument();
    });

    it("calls the language menu toggle handler when clicked", () => {
      render(<SiteHeader />);

      fireEvent.click(
        screen.getByRole("button", {
          name: "Select language",
        }),
      );

      expect(mockHandleLanguageMenuToggle).toHaveBeenCalledTimes(1);
    });

    it("calls the language button keyboard handler", () => {
      render(<SiteHeader />);

      fireEvent.keyDown(
        screen.getByRole("button", {
          name: "Select language",
        }),
        {
          key: "ArrowDown",
        },
      );

      expect(mockHandleLanguageButtonKeyDown).toHaveBeenCalledTimes(1);
    });

    it("does not render the language menu when closed", () => {
      render(<SiteHeader />);

      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("renders the language menu when open", () => {
      (useController as jest.Mock).mockReturnValue(
        createControllerMock({
          isLanguageMenuOpen: true,
        }),
      );

      render(<SiteHeader />);

      expect(
        screen.getByRole("menu", {
          name: "Language options",
        }),
      ).toBeInTheDocument();
    });

    it("sets aria-expanded to true when the language menu is open", () => {
      (useController as jest.Mock).mockReturnValue(
        createControllerMock({
          isLanguageMenuOpen: true,
        }),
      );

      render(<SiteHeader />);

      expect(
        screen.getByRole("button", {
          name: "Select language",
        }),
      ).toHaveAttribute("aria-expanded", "true");
    });

    it("renders both language options when the menu is open", () => {
      (useController as jest.Mock).mockReturnValue(
        createControllerMock({
          isLanguageMenuOpen: true,
        }),
      );

      render(<SiteHeader />);

      expect(
        screen.getByRole("menuitemradio", {
          name: "English",
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("menuitemradio", {
          name: "Português (Brasil)",
        }),
      ).toBeInTheDocument();
    });

    it("marks English as selected when the current locale is English", () => {
      (useController as jest.Mock).mockReturnValue(
        createControllerMock({
          isLanguageMenuOpen: true,
          locale: "en",
        }),
      );

      render(<SiteHeader />);

      expect(
        screen.getByRole("menuitemradio", {
          name: "English",
        }),
      ).toHaveAttribute("aria-checked", "true");

      expect(
        screen.getByRole("menuitemradio", {
          name: "Português (Brasil)",
        }),
      ).toHaveAttribute("aria-checked", "false");
    });

    it("marks Brazilian Portuguese as selected when the current locale is pt-BR", () => {
      (useController as jest.Mock).mockReturnValue(
        createControllerMock({
          isLanguageMenuOpen: true,
          locale: "pt-BR",
        }),
      );

      render(<SiteHeader />);

      expect(
        screen.getByRole("menuitemradio", {
          name: "Português (Brasil)",
        }),
      ).toHaveAttribute("aria-checked", "true");

      expect(
        screen.getByRole("menuitemradio", {
          name: "English",
        }),
      ).toHaveAttribute("aria-checked", "false");
    });

    it("calls the language change handler when English is selected", () => {
      (useController as jest.Mock).mockReturnValue(
        createControllerMock({
          isLanguageMenuOpen: true,
          locale: "pt-BR",
        }),
      );

      render(<SiteHeader />);

      fireEvent.click(
        screen.getByRole("menuitemradio", {
          name: "English",
        }),
      );

      expect(mockHandleLanguageChange).toHaveBeenCalledWith("en");
    });

    it("calls the language change handler when Brazilian Portuguese is selected", () => {
      (useController as jest.Mock).mockReturnValue(
        createControllerMock({
          isLanguageMenuOpen: true,
          locale: "en",
        }),
      );

      render(<SiteHeader />);

      fireEvent.click(
        screen.getByRole("menuitemradio", {
          name: "Português (Brasil)",
        }),
      );

      expect(mockHandleLanguageChange).toHaveBeenCalledWith("pt-BR");
    });

    it("calls the language menu keyboard handler", () => {
      (useController as jest.Mock).mockReturnValue(
        createControllerMock({
          isLanguageMenuOpen: true,
        }),
      );

      render(<SiteHeader />);

      fireEvent.keyDown(
        screen.getByRole("menu", {
          name: "Language options",
        }),
        {
          key: "ArrowDown",
        },
      );

      expect(mockHandleLanguageMenuKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  describe("resume download", () => {
    it("renders the CV download link", () => {
      render(<SiteHeader />);

      const resumeLink = screen.getByRole("link", {
        name: "Download CV",
      });

      expect(resumeLink).toBeInTheDocument();
    });

    it("uses the resume URL provided by the controller", () => {
      render(<SiteHeader />);

      const resumeLink = screen.getByRole("link", {
        name: "Download CV",
      });

      expect(resumeLink).toHaveAttribute(
        "href",
        "/resume/rerbert-cv-english.pdf",
      );
    });

    it("enables the download attribute", () => {
      render(<SiteHeader />);

      const resumeLink = screen.getByRole("link", {
        name: "Download CV",
      });

      expect(resumeLink).toHaveAttribute("download");
    });

    it("uses the Portuguese resume URL when provided", () => {
      (useController as jest.Mock).mockReturnValue(
        createControllerMock({
          locale: "pt-BR",
          resumeUrl: "/resume/rerbert-cv.pdf",
        }),
      );

      render(<SiteHeader />);

      const resumeLink = screen.getByRole("link", {
        name: "Download CV",
      });

      expect(resumeLink).toHaveAttribute("href", "/resume/rerbert-cv.pdf");
    });

    it("renders the mobile CV label", () => {
      render(<SiteHeader />);

      expect(screen.getByText("CV")).toBeInTheDocument();
    });
  });
});
