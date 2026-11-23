import { fireEvent, render, screen } from "@testing-library/react";
import { View } from "@/features/skills/views/View";

const mockPush = jest.fn();
let mockSearchParams = new URLSearchParams();
let mockPathname = "/en/skills";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams,
}));

jest.mock("@/shared/i18n/LanguageProvider", () => ({
  useLanguage: () => ({
    dictionary: {
      skills: {
        backToProfile: "Back to Profile",
      },
    },
  }),
}));

jest.mock("@/shared/data/skills", () => ({
  SKILL_CATEGORY_IDS: ["frameworks-libraries", "backend", "testing"],
  SKILL_CATEGORIES: [
    {
      id: "frameworks-libraries",
      skills: [{ id: "react" }, { id: "nextjs" }],
    },
    {
      id: "backend",
      skills: [{ id: "node" }, { id: "express" }, { id: "prisma" }],
    },
    {
      id: "testing",
      skills: [{ id: "jest" }],
    },
  ],
}));

jest.mock("@/shared/components/navigation/back-button/View", () => ({
  View: ({ href, label }: { href: string; label: string }) => (
    <div data-testid="back-button" data-href={href}>
      {label}
    </div>
  ),
}));

jest.mock(
  "@/shared/components/animations/digital-reconstruction-entrance/View",
  () => ({
    View: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="entrance">{children}</div>
    ),
  }),
);

jest.mock("@/features/skills/components/skills-title/View", () => ({
  View: () => <div data-testid="skills-title" />,
}));

jest.mock("@/features/skills/components/category-navigation/View", () => ({
  View: ({
    selectedCategoryId,
    onCategoryChange,
  }: {
    selectedCategoryId: string;
    onCategoryChange: (id: string) => void;
  }) => (
    <div
      data-testid="category-navigation"
      data-selected-category={selectedCategoryId}
    >
      <button
        type="button"
        data-testid="change-category"
        onClick={() => onCategoryChange("backend")}
      >
        Change category
      </button>
    </div>
  ),
}));

jest.mock("@/features/skills/components/category-header/View", () => ({
  View: ({
    categoryId,
    technologiesCount,
  }: {
    categoryId: string;
    technologiesCount: number;
  }) => (
    <div
      data-testid="category-header"
      data-category-id={categoryId}
      data-technologies-count={technologiesCount}
    />
  ),
}));

jest.mock("@/features/skills/components/skills-grid/View", () => ({
  View: ({ selectedCategoryId }: { selectedCategoryId: string }) => (
    <div
      data-testid="skills-grid"
      data-selected-category={selectedCategoryId}
    />
  ),
}));

describe("Skills Views", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockSearchParams = new URLSearchParams();
    mockPathname = "/en/skills";
  });

  describe("Rendering", () => {
    it("should render the entrance animation wrapper", () => {
      render(<View />);

      expect(screen.getByTestId("entrance")).toBeInTheDocument();
    });

    it("should render the main element", () => {
      render(<View />);

      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should render the SkillsTitle component", () => {
      render(<View />);

      expect(screen.getByTestId("skills-title")).toBeInTheDocument();
    });

    it("should render the BackButton component", () => {
      render(<View />);

      expect(screen.getByTestId("back-button")).toBeInTheDocument();
    });

    it("should render the CategoryNavigation component", () => {
      render(<View />);

      expect(screen.getByTestId("category-navigation")).toBeInTheDocument();
    });

    it("should render the CategoryHeader component", () => {
      render(<View />);

      expect(screen.getByTestId("category-header")).toBeInTheDocument();
    });

    it("should render the SkillsGrid component", () => {
      render(<View />);

      expect(screen.getByTestId("skills-grid")).toBeInTheDocument();
    });
  });

  describe("BackButton", () => {
    it("should pass the correct href to BackButton", () => {
      render(<View />);

      expect(screen.getByTestId("back-button")).toHaveAttribute(
        "data-href",
        "/profile",
      );
    });

    it("should pass the translated label to BackButton", () => {
      render(<View />);

      expect(screen.getByTestId("back-button")).toHaveTextContent(
        "Back to Profile",
      );
    });
  });

  describe("Category selection", () => {
    it("should use the default category when no query parameter is provided", () => {
      render(<View />);

      expect(screen.getByTestId("category-navigation")).toHaveAttribute(
        "data-selected-category",
        "frameworks-libraries",
      );
    });

    it("should use the default category when the query parameter is invalid", () => {
      mockSearchParams = new URLSearchParams("category=invalid-category");

      render(<View />);

      expect(screen.getByTestId("category-navigation")).toHaveAttribute(
        "data-selected-category",
        "frameworks-libraries",
      );
    });

    it("should select the category provided in the query parameter", () => {
      mockSearchParams = new URLSearchParams("category=backend");

      render(<View />);

      expect(screen.getByTestId("category-navigation")).toHaveAttribute(
        "data-selected-category",
        "backend",
      );
    });

    it("should select the testing category when specified in the query parameter", () => {
      mockSearchParams = new URLSearchParams("category=testing");

      render(<View />);

      expect(screen.getByTestId("category-navigation")).toHaveAttribute(
        "data-selected-category",
        "testing",
      );
    });
  });

  describe("CategoryHeader", () => {
    it("should receive the default category ID", () => {
      render(<View />);

      expect(screen.getByTestId("category-header")).toHaveAttribute(
        "data-category-id",
        "frameworks-libraries",
      );
    });

    it("should receive the selected category ID from the URL", () => {
      mockSearchParams = new URLSearchParams("category=backend");

      render(<View />);

      expect(screen.getByTestId("category-header")).toHaveAttribute(
        "data-category-id",
        "backend",
      );
    });

    it("should receive the number of technologies in the selected category", () => {
      render(<View />);

      expect(screen.getByTestId("category-header")).toHaveAttribute(
        "data-technologies-count",
        "2",
      );
    });

    it("should receive the correct technology count for the backend category", () => {
      mockSearchParams = new URLSearchParams("category=backend");

      render(<View />);

      expect(screen.getByTestId("category-header")).toHaveAttribute(
        "data-technologies-count",
        "3",
      );
    });

    it("should receive the correct technology count for the testing category", () => {
      mockSearchParams = new URLSearchParams("category=testing");

      render(<View />);

      expect(screen.getByTestId("category-header")).toHaveAttribute(
        "data-technologies-count",
        "1",
      );
    });
  });

  describe("SkillsGrid", () => {
    it("should receive the default selected category", () => {
      render(<View />);

      expect(screen.getByTestId("skills-grid")).toHaveAttribute(
        "data-selected-category",
        "frameworks-libraries",
      );
    });

    it("should receive the category selected through the URL", () => {
      mockSearchParams = new URLSearchParams("category=backend");

      render(<View />);

      expect(screen.getByTestId("skills-grid")).toHaveAttribute(
        "data-selected-category",
        "backend",
      );
    });
  });

  describe("Category navigation", () => {
    it("should update the URL when the category changes", () => {
      render(<View />);

      fireEvent.click(screen.getByTestId("change-category"));

      expect(mockPush).toHaveBeenCalledWith("/en/skills?category=backend", {
        scroll: false,
      });
    });

    it("should preserve existing query parameters when changing categories", () => {
      mockSearchParams = new URLSearchParams(
        "category=testing&lang=en&source=portfolio",
      );

      render(<View />);

      fireEvent.click(screen.getByTestId("change-category"));

      expect(mockPush).toHaveBeenCalledWith(
        "/en/skills?category=backend&lang=en&source=portfolio",
        { scroll: false },
      );
    });

    it("should preserve existing query parameters when no category parameter exists", () => {
      mockSearchParams = new URLSearchParams("lang=en&source=portfolio");

      render(<View />);

      fireEvent.click(screen.getByTestId("change-category"));

      expect(mockPush).toHaveBeenCalledWith(
        "/en/skills?lang=en&source=portfolio&category=backend",
        { scroll: false },
      );
    });

    it("should use the current pathname when updating the URL", () => {
      mockPathname = "/pt-BR/skills";
      mockSearchParams = new URLSearchParams("category=testing");

      render(<View />);

      fireEvent.click(screen.getByTestId("change-category"));

      expect(mockPush).toHaveBeenCalledWith("/pt-BR/skills?category=backend", {
        scroll: false,
      });
    });

    it("should disable scroll when navigating between categories", () => {
      render(<View />);

      fireEvent.click(screen.getByTestId("change-category"));

      expect(mockPush).toHaveBeenCalledWith(expect.any(String), {
        scroll: false,
      });
    });
  });
});
