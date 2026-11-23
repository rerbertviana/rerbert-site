import { fireEvent, render, screen } from "@testing-library/react";
import type { HTMLAttributes } from "react";

import { View } from "@/shared/components/animations/digital-reconstruction-entrance/View";

let mockReducedMotion = false;

jest.mock("motion/react", () => ({
  useReducedMotion: () => mockReducedMotion,
  motion: {
    div: ({
      children,
      onAnimationComplete,
      ...props
    }: HTMLAttributes<HTMLDivElement> & {
      onAnimationComplete?: () => void;
    }) => (
      <div {...props}>
        {children}
        {onAnimationComplete && (
          <button
            type="button"
            data-testid="animation-complete"
            onClick={onAnimationComplete}
          >
            Complete animation
          </button>
        )}
      </div>
    ),
  },
}));

describe("DigitalReconstructionEntrance", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockReducedMotion = false;
  });

  describe("Rendering", () => {
    it("should render its children", () => {
      render(
        <View>
          <p>Page content</p>
        </View>,
      );

      expect(screen.getByText("Page content")).toBeInTheDocument();
    });

    it("should render multiple children", () => {
      render(
        <View>
          <p>First child</p>
          <p>Second child</p>
        </View>,
      );

      expect(screen.getByText("First child")).toBeInTheDocument();
      expect(screen.getByText("Second child")).toBeInTheDocument();
    });

    it("should render the animation wrapper", () => {
      const { container } = render(
        <View>
          <p>Page content</p>
        </View>,
      );

      expect(container.querySelector(".relative.isolate")).toBeInTheDocument();
    });
  });

  describe("Reconstruction state", () => {
    it("should mark the container as busy during reconstruction", () => {
      const { container } = render(
        <View>
          <p>Page content</p>
        </View>,
      );

      expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument();
    });

    it("should disable interaction during reconstruction", () => {
      const { container } = render(
        <View>
          <p>Page content</p>
        </View>,
      );

      expect(container.querySelector("[inert]")).toBeInTheDocument();
    });

    it("should render the digital fragments layer during reconstruction", () => {
      render(
        <View>
          <p>Page content</p>
        </View>,
      );

      expect(
        document.querySelector('[aria-hidden="true"]'),
      ).toBeInTheDocument();
    });

    it("should render the digital interference element", () => {
      const { container } = render(
        <View>
          <p>Page content</p>
        </View>,
      );

      const fragmentsLayer = container.querySelector('[aria-hidden="true"]');

      expect(fragmentsLayer).toBeInTheDocument();
      expect(fragmentsLayer?.children.length).toBeGreaterThan(0);
    });

    it("should render the reconstruction fragments", () => {
      const { container } = render(
        <View>
          <p>Page content</p>
        </View>,
      );

      const fragmentsLayer = container.querySelector('[aria-hidden="true"]');

      expect(fragmentsLayer?.children.length).toBeGreaterThanOrEqual(16);
    });
  });

  describe("Animation completion", () => {
    it("should render an animation completion control for the mocked last fragment", () => {
      render(
        <View>
          <p>Page content</p>
        </View>,
      );

      expect(screen.getByTestId("animation-complete")).toBeInTheDocument();
    });

    it("should stop reconstruction after the last fragment completes", () => {
      const { container } = render(
        <View>
          <p>Page content</p>
        </View>,
      );

      fireEvent.click(screen.getByTestId("animation-complete"));

      expect(
        screen.queryByTestId("animation-complete"),
      ).not.toBeInTheDocument();

      expect(
        container.querySelector('[aria-busy="true"]'),
      ).not.toBeInTheDocument();

      expect(
        container.querySelector('[aria-busy="false"]'),
      ).toBeInTheDocument();

      expect(container.querySelector("[inert]")).not.toBeInTheDocument();
    });
  });

  describe("Reduced motion", () => {
    it("should render children without the animation wrapper when reduced motion is enabled", () => {
      mockReducedMotion = true;

      const { container } = render(
        <View>
          <p>Page content</p>
        </View>,
      );

      expect(screen.getByText("Page content")).toBeInTheDocument();

      expect(
        container.querySelector('[aria-hidden="true"]'),
      ).not.toBeInTheDocument();

      expect(container.querySelector("[aria-busy]")).not.toBeInTheDocument();
    });

    it("should not render digital fragments when reduced motion is enabled", () => {
      mockReducedMotion = true;

      const { container } = render(
        <View>
          <p>Page content</p>
        </View>,
      );

      expect(
        container.querySelector('[aria-hidden="true"]'),
      ).not.toBeInTheDocument();
    });

    it("should render multiple children without animation when reduced motion is enabled", () => {
      mockReducedMotion = true;

      render(
        <View>
          <p>First child</p>
          <p>Second child</p>
        </View>,
      );

      expect(screen.getByText("First child")).toBeInTheDocument();
      expect(screen.getByText("Second child")).toBeInTheDocument();
    });
  });
});
