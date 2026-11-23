import { render, screen } from "@testing-library/react";

import { SiteLayout } from "@/shared/components/layout/site-layout/View";

import { SiteHeader } from "@/shared/components/layout/site-header/View";
import { SiteFooter } from "@/shared/components/layout/site-footer/View";

jest.mock("@/shared/components/layout/site-header/View", () => ({
  SiteHeader: jest.fn(() => <header data-testid="site-header" />),
}));

jest.mock("@/shared/components/layout/site-footer/View", () => ({
  SiteFooter: jest.fn(() => <footer data-testid="site-footer" />),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <div role="img" aria-label={alt || undefined} data-src={src} />
  ),
}));

describe("SiteLayout View", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("renders the shared layout", () => {
      render(
        <SiteLayout>
          <div>Page content</div>
        </SiteLayout>,
      );

      expect(screen.getByText("Page content")).toBeInTheDocument();
    });

    it("renders the SiteHeader", () => {
      render(
        <SiteLayout>
          <div>Page content</div>
        </SiteLayout>,
      );

      expect(screen.getByTestId("site-header")).toBeInTheDocument();
      expect(SiteHeader).toHaveBeenCalled();
    });

    it("renders the SiteFooter", () => {
      render(
        <SiteLayout>
          <div>Page content</div>
        </SiteLayout>,
      );

      expect(screen.getByTestId("site-footer")).toBeInTheDocument();
      expect(SiteFooter).toHaveBeenCalled();
    });

    it("renders the header, content and footer in the correct order", () => {
      const { container } = render(
        <SiteLayout>
          <main>Page content</main>
        </SiteLayout>,
      );

      const layout = container.querySelector(".relative.z-10");

      expect(layout).toBeInTheDocument();

      const elements = Array.from(layout!.children);

      expect(elements[0]).toContainElement(screen.getByTestId("site-header"));

      expect(elements[1]).toContainElement(screen.getByRole("main"));

      expect(elements[2]).toContainElement(screen.getByTestId("site-footer"));
    });
  });

  describe("children", () => {
    it("renders children inside the content container", () => {
      render(
        <SiteLayout>
          <main data-testid="page-content">Page content</main>
        </SiteLayout>,
      );

      const content = screen.getByTestId("page-content");

      expect(content).toBeInTheDocument();
      expect(content.parentElement).toHaveClass("flex");
      expect(content.parentElement).toHaveClass("flex-1");
    });

    it("supports multiple children", () => {
      render(
        <SiteLayout>
          <div>First section</div>
          <div>Second section</div>
        </SiteLayout>,
      );

      expect(screen.getByText("First section")).toBeInTheDocument();
      expect(screen.getByText("Second section")).toBeInTheDocument();
    });

    it("supports empty children", () => {
      render(<SiteLayout>{null}</SiteLayout>);

      expect(screen.getByTestId("site-header")).toBeInTheDocument();
      expect(screen.getByTestId("site-footer")).toBeInTheDocument();
    });
  });

  describe("background", () => {
    it("renders the shared background container", () => {
      const { container } = render(
        <SiteLayout>
          <div>Page content</div>
        </SiteLayout>,
      );

      const background = container.querySelector(
        ".pointer-events-none.fixed.inset-0",
      );

      expect(background).toBeInTheDocument();
      expect(background).toHaveAttribute("aria-hidden", "true");
    });

    it("renders the desktop background image", () => {
      const { container } = render(
        <SiteLayout>
          <div>Page content</div>
        </SiteLayout>,
      );

      expect(
        container.querySelector('[data-src="/images/developer-room.png"]'),
      ).toBeInTheDocument();
    });

    it("renders the mobile background source", () => {
      const { container } = render(
        <SiteLayout>
          <div>Page content</div>
        </SiteLayout>,
      );

      const mobileSource = container.querySelector(
        'source[media="(max-width: 767px)"]',
      );

      expect(mobileSource).toHaveAttribute(
        "srcSet",
        "/images/developer-room-mobile.png",
      );
    });

    it("renders the background overlay", () => {
      const { container } = render(
        <SiteLayout>
          <div>Page content</div>
        </SiteLayout>,
      );

      const background = container.querySelector(
        ".pointer-events-none.fixed.inset-0",
      );

      expect(
        background?.querySelector(".bg-gradient-to-b"),
      ).toBeInTheDocument();
    });
  });

  describe("layout structure", () => {
    it("renders the main layout container with the expected classes", () => {
      const { container } = render(
        <SiteLayout>
          <div>Page content</div>
        </SiteLayout>,
      );

      const layout = container.querySelector(".relative.z-10");

      expect(layout).toBeInTheDocument();
      expect(layout).toHaveClass("flex");
      expect(layout).toHaveClass("min-h-screen");
      expect(layout).toHaveClass("flex-col");
    });
  });
});
