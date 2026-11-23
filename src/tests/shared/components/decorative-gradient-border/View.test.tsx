import { render } from "@testing-library/react";

import { View } from "@/shared/components/decorative-gradient-border/View";

describe("DecorativeGradientBorder View", () => {
  test("should render the SVG", () => {
    const { container } = render(<View />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  test("should render the SVG as decorative", () => {
    const { container } = render(<View />);

    const svg = container.querySelector("svg");

    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  test("should apply the default SVG classes", () => {
    const { container } = render(<View />);

    const svg = container.querySelector("svg");

    expect(svg).toHaveClass(
      "pointer-events-none",
      "absolute",
      "inset-0",
      "h-full",
      "w-full",
    );
  });

  test("should apply a custom className to the SVG", () => {
    const { container } = render(<View className="custom-svg-class" />);

    const svg = container.querySelector("svg");

    expect(svg).toHaveClass("custom-svg-class");
  });

  test("should render the rectangle with the default radius", () => {
    const { container } = render(<View />);

    const rect = container.querySelector("rect");

    expect(rect).toHaveAttribute("rx", "16");
    expect(rect).toHaveAttribute("ry", "16");
  });

  test("should apply a custom radius to the rectangle", () => {
    const { container } = render(<View radius={24} />);

    const rect = container.querySelector("rect");

    expect(rect).toHaveAttribute("rx", "24");
    expect(rect).toHaveAttribute("ry", "24");
  });

  test("should apply a custom class to the rectangle", () => {
    const { container } = render(<View rectClassName="custom-rect-class" />);

    const rect = container.querySelector("rect");

    expect(rect).toHaveClass("custom-rect-class");
  });

  test("should render the gradient definition", () => {
    const { container } = render(<View />);

    expect(container.querySelector("linearGradient")).toBeInTheDocument();
  });

  test("should reference the gradient from the rectangle stroke", () => {
    const { container } = render(<View />);

    const gradient = container.querySelector("linearGradient");
    const rect = container.querySelector("rect");

    expect(gradient).toBeInTheDocument();
    expect(rect).toBeInTheDocument();

    const gradientId = gradient?.getAttribute("id");

    expect(gradientId).toBeTruthy();
    expect(rect).toHaveAttribute("stroke", `url(#${gradientId})`);
  });

  test("should generate a gradient with a unique ID for each instance", () => {
    const { container } = render(
      <>
        <View />
        <View />
      </>,
    );

    const gradients = container.querySelectorAll("linearGradient");

    expect(gradients).toHaveLength(2);

    const firstId = gradients[0].getAttribute("id");
    const secondId = gradients[1].getAttribute("id");

    expect(firstId).not.toBe(secondId);
  });

  test("should render the gradient stops", () => {
    const { container } = render(<View />);

    const stops = container.querySelectorAll("stop");

    expect(stops.length).toBeGreaterThan(0);
  });

  test("should render the rectangle with the expected SVG attributes", () => {
    const { container } = render(<View />);

    const rect = container.querySelector("rect");

    expect(rect).toHaveAttribute("x", "0.5");
    expect(rect).toHaveAttribute("y", "0.5");
    expect(rect).toHaveAttribute("fill", "none");
    expect(rect?.getAttribute("stroke-width")).toBe("1");
    expect(rect?.getAttribute("vector-effect")).toBe("non-scaling-stroke");
  });
});
