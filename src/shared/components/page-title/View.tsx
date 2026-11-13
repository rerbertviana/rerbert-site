import { useId, type ReactNode } from "react";

type PageTitleDecoration = "side-lines" | "angular-divider";
type PageTitleBrackets = "angle" | "chevron";
type PageTitleLabelFont = "oxanium" | "default";

interface PageTitleProps {
  id: string;
  pageLabel: string;
  title: ReactNode;
  subtitle: string;
  decoration?: PageTitleDecoration;
  brackets?: PageTitleBrackets;
  labelFont?: PageTitleLabelFont;
}

export function View({
  id,
  pageLabel,
  title,
  subtitle,
  decoration = "side-lines",
  brackets = "angle",
  labelFont = "oxanium",
}: PageTitleProps) {
  const generatedId = useId().replace(/:/g, "");
  const gradientId = `page-title-${generatedId}`;

  const bracketCharacters =
    brackets === "chevron"
      ? { left: "‹", right: "›" }
      : { left: "<", right: ">" };

  const labelFontClass =
    labelFont === "oxanium" ? "font-[family-name:var(--font-oxanium)]" : "";

  const heading = (
    <h1
      id={id}
      className="relative z-10 flex flex-wrap justify-center gap-x-3 font-[family-name:var(--font-oxanium)] text-3xl font-extrabold uppercase leading-none tracking-tight sm:text-4xl md:text-5xl"
    >
      {title}
    </h1>
  );

  return (
    <section
      aria-labelledby={id}
      className="flex flex-col items-center px-4 pt-5 text-center sm:pt-6"
    >
      {/* Section label */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="text-xl font-bold leading-none text-[#8AFF00]"
        >
          {bracketCharacters.left}
        </span>

        <p
          className={`${labelFontClass} text-xs font-bold uppercase tracking-[0.3em] text-[#B77AFF] sm:text-sm`}
        >
          {pageLabel}
        </p>

        <span
          aria-hidden="true"
          className="text-xl font-bold leading-none text-[#8AFF00]"
        >
          {bracketCharacters.right}
        </span>
      </div>

      {/* Main heading */}
      {decoration === "side-lines" ? (
        <div className="relative mt-3 flex w-full max-w-[900px] items-center justify-center">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-1/2 h-7 w-full -translate-y-1/2"
            viewBox="0 0 900 28"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id={`${gradientId}-left-desktop`}
                x1="0"
                y1="0"
                x2="160"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
                <stop offset="35%" stopColor="#80FF00" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#80FF00" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#80FF00" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id={`${gradientId}-right-desktop`}
                x1="900"
                y1="0"
                x2="740"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
                <stop offset="35%" stopColor="#80FF00" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#80FF00" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#80FF00" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id={`${gradientId}-left-mobile`}
                x1="0"
                y1="0"
                x2="90"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
                <stop offset="35%" stopColor="#80FF00" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#80FF00" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#80FF00" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id={`${gradientId}-right-mobile`}
                x1="900"
                y1="0"
                x2="810"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
                <stop offset="35%" stopColor="#80FF00" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#80FF00" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#80FF00" stopOpacity="0" />
              </linearGradient>
            </defs>

            <g className="hidden sm:block">
              <path
                d="M0 14 H160"
                stroke={`url(#${gradientId}-left-desktop)`}
                strokeWidth="1.2"
              />
              <path
                d="M900 14 H740"
                stroke={`url(#${gradientId}-right-desktop)`}
                strokeWidth="1.2"
              />
            </g>

            <g className="sm:hidden">
              <path
                d="M0 14 H90"
                stroke={`url(#${gradientId}-left-mobile)`}
                strokeWidth="1.2"
              />
              <path
                d="M900 14 H810"
                stroke={`url(#${gradientId}-right-mobile)`}
                strokeWidth="1.2"
              />
            </g>
          </svg>

          {heading}
        </div>
      ) : (
        heading
      )}

      {/* Description */}
      <p className="mt-3 max-w-xl text-sm font-medium text-white/90 sm:text-base">
        {subtitle}
      </p>

      {/* Angular decorative divider */}
      {decoration === "angular-divider" && (
        <svg
          aria-hidden="true"
          className="pointer-events-none mt-4 h-7 w-full max-w-[700px]"
          viewBox="0 0 700 28"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id={`${gradientId}-angular-left`}
              x1="0"
              y1="0"
              x2="180"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
              <stop offset="25%" stopColor="#80FF00" stopOpacity="1" />
              <stop offset="45%" stopColor="#80FF00" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#A855F7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient
              id={`${gradientId}-angular-right`}
              x1="700"
              y1="0"
              x2="520"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
              <stop offset="25%" stopColor="#80FF00" stopOpacity="1" />
              <stop offset="45%" stopColor="#80FF00" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#A855F7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.35" />
            </linearGradient>
          </defs>

          <path
            d="M0 22 H45 L60 7 H180"
            stroke={`url(#${gradientId}-angular-left)`}
            strokeWidth="1.2"
          />

          <path
            d="M700 22 H655 L640 7 H520"
            stroke={`url(#${gradientId}-angular-right)`}
            strokeWidth="1.2"
          />
        </svg>
      )}
    </section>
  );
}
