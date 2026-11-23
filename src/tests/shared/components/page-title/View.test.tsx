import { render, screen } from "@testing-library/react";

import { View } from "@/shared/components/page-title/View";

describe("PageTitle View", () => {
  const defaultProps = {
    id: "page-heading",
    pageLabel: "PROFILE",
    title: "Developer Profile",
    subtitle: "Explore my developer profile.",
  };

  describe("rendering", () => {
    it("renders the page label, title and subtitle", () => {
      render(<View {...defaultProps} />);

      expect(screen.getByText("PROFILE")).toBeInTheDocument();

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: "Developer Profile",
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByText("Explore my developer profile."),
      ).toBeInTheDocument();
    });

    it("uses the provided id for the heading", () => {
      render(<View {...defaultProps} />);

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: "Developer Profile",
        }),
      ).toHaveAttribute("id", "page-heading");
    });

    it("associates the section with the heading through aria-labelledby", () => {
      render(<View {...defaultProps} />);

      const heading = screen.getByRole("heading", {
        level: 1,
        name: "Developer Profile",
      });

      const section = heading.closest("section");

      expect(section).toHaveAttribute("aria-labelledby", "page-heading");
    });

    it("supports ReactNode as the title", () => {
      render(
        <View
          {...defaultProps}
          title={
            <>
              Developer <span>Profile</span>
            </>
          }
        />,
      );

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: "Developer Profile",
        }),
      ).toBeInTheDocument();
    });
  });

  describe("brackets", () => {
    it("renders angle brackets by default", () => {
      render(<View {...defaultProps} />);

      const decorativeBrackets = screen.getByText("PROFILE").parentElement;

      expect(decorativeBrackets).toHaveTextContent("<");
      expect(decorativeBrackets).toHaveTextContent(">");
    });

    it("renders chevron brackets when configured", () => {
      render(<View {...defaultProps} brackets="chevron" />);

      const decorativeBrackets = screen.getByText("PROFILE").parentElement;

      expect(decorativeBrackets).toHaveTextContent("‹");
      expect(decorativeBrackets).toHaveTextContent("›");
    });
  });

  describe("decoration", () => {
    it("renders side-lines decoration by default", () => {
      const { container } = render(<View {...defaultProps} />);

      const heading = screen.getByRole("heading", {
        level: 1,
        name: "Developer Profile",
      });

      const headingContainer = heading.parentElement;

      expect(headingContainer).toContainElement(heading);

      expect(container.querySelector("svg")).toBeInTheDocument();

      expect(container.querySelector("svg")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("renders angular-divider decoration when configured", () => {
      const { container } = render(
        <View {...defaultProps} decoration="angular-divider" />,
      );

      const heading = screen.getByRole("heading", {
        level: 1,
        name: "Developer Profile",
      });

      const section = heading.closest("section");

      expect(section).toContainElement(heading);

      expect(heading.parentElement).toBe(section);

      const decorativeSvgs = container.querySelectorAll(
        'svg[aria-hidden="true"]',
      );

      expect(decorativeSvgs).toHaveLength(1);
    });
  });

  describe("label font", () => {
    it("uses the default label font configuration", () => {
      render(<View {...defaultProps} />);

      const label = screen.getByText("PROFILE");

      expect(label).toHaveClass("font-[family-name:var(--font-oxanium)]");
    });

    it("allows the default font configuration", () => {
      render(<View {...defaultProps} labelFont="default" />);

      const label = screen.getByText("PROFILE");

      expect(label).not.toHaveClass("font-[family-name:var(--font-oxanium)]");
    });
  });
});
