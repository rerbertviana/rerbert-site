"use client";

import { useLanguage } from "@/shared/i18n/LanguageProvider";

interface SelectCharacterButtonProps {
  disabled?: boolean;
  onClick: () => void;
}

export function SelectCharacterButton({
  disabled = false,
  onClick,
}: SelectCharacterButtonProps) {
  const { dictionary } = useLanguage();
  const translations = dictionary.characterSelection.button;

  const buttonLabel = disabled ? translations.select : translations.confirm;

  return (
    <div className="relative isolate mx-auto flex w-full items-center justify-center px-4 py-6">
      {/* Horizontal energy line behind the button */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-24 w-[min(760px,calc(100vw-32px))] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="select-character-energy"
            x1="0"
            y1="0"
            x2="1000"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#80FF00" stopOpacity="0" />
            <stop offset="12%" stopColor="#80FF00" stopOpacity="0.2" />
            <stop offset="27%" stopColor="#80FF00" stopOpacity="0.8" />
            <stop offset="39%" stopColor="#80FF00" stopOpacity="0" />
            <stop offset="61%" stopColor="#80FF00" stopOpacity="0" />
            <stop offset="73%" stopColor="#80FF00" stopOpacity="0.8" />
            <stop offset="88%" stopColor="#80FF00" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#80FF00" stopOpacity="0" />
          </linearGradient>

          <filter
            id="select-character-glow"
            x="-20%"
            y="-250%"
            width="140%"
            height="600%"
          >
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* Green glow */}
        <path
          d="M0 50 H1000"
          fill="none"
          stroke="url(#select-character-energy)"
          strokeWidth="8"
          filter="url(#select-character-glow)"
          opacity="0.9"
        />

        {/* Sharp central line */}
        <path
          d="M0 50 H1000"
          fill="none"
          stroke="url(#select-character-energy)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Button border */}
      <div
        className={`
          relative z-10 w-full max-w-[360px] rounded-xl p-[1.5px]
          transition-[background-color,box-shadow] duration-300
          ${
            disabled
              ? "bg-[#354137]"
              : "bg-[linear-gradient(90deg,#80FF00_0%,#BFFF80_35%,#FFFFFF_50%,#BFFF80_65%,#80FF00_100%)] shadow-[0_0_20px_rgba(128,255,0,0.35)] hover:shadow-[0_0_32px_rgba(128,255,0,0.55)]"
          }
        `}
      >
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={`
            flex h-[64px] w-full items-center justify-center
            rounded-[11px] px-6
            font-[family-name:var(--font-oxanium)]
            text-base font-bold uppercase tracking-[0.14em]
            transition-[filter,transform] duration-300
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-[#80FF00] focus-visible:ring-offset-2
            focus-visible:ring-offset-[#080516]
            sm:text-lg
            ${
              disabled
                ? "cursor-not-allowed bg-[#182019] text-[#657064]"
                : "cursor-pointer bg-[#80FF00] text-[#17200F] hover:brightness-110 active:scale-[0.98]"
            }
          `}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
