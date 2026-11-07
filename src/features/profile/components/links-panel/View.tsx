"use client";

import Image from "next/image";
import { Link2 } from "lucide-react";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { playSound } from "@/shared/lib/audio/audioManager";

import { SOCIAL_LINKS } from "../../data/social-links";

export function View() {
  const { dictionary } = useLanguage();
  const content = dictionary.profile.links;

  return (
    <article
      onMouseEnter={() => playSound("interfaceOpen")}
      className="group relative mx-auto w-full max-w-5xl rounded-2xl bg-[#100C24]/55 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] motion-reduce:transform-none"
    >
      <div className="flex min-h-[130px] flex-col items-center gap-4 rounded-2xl px-5 py-5 lg:flex-row lg:gap-4 lg:px-5 lg:py-4">
        {/* Panel heading */}
        <div className="flex w-full items-center justify-center lg:w-auto lg:shrink-0">
          {/* Icon - desktop only */}
          <div className="hidden h-full shrink-0 items-center justify-center lg:flex">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/70 bg-[#17112E]">
              <Link2
                aria-hidden="true"
                className="h-6 w-6 text-white"
                strokeWidth={2.2}
              />
            </div>
          </div>

          {/* Title and description */}
          <div className="w-full min-w-0 text-center lg:ml-5 lg:w-[320px] lg:text-left">
            <h2 className="font-[family-name:var(--font-oxanium)] text-lg font-extrabold uppercase tracking-wide text-white">
              {content.title}
            </h2>

            <p className="mt-1 text-center text-xs leading-relaxed text-gray-300 lg:text-justify">
              {content.description}
            </p>
          </div>
        </div>

        {/* Vertical divider */}
        <div
          aria-hidden="true"
          className="hidden h-12 w-px shrink-0 bg-gradient-to-b from-transparent via-violet-400/60 to-transparent lg:block"
        />

        {/* Social links */}
        <nav
          aria-label={content.title}
          className="flex w-full flex-1 flex-wrap items-center justify-center gap-5 lg:justify-end lg:gap-6"
        >
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${social.label}`}
              title={social.label}
              onClick={() => playSound("buttonConfirm")}
              className="
                group/link flex h-11 w-11 shrink-0 items-center justify-center
                rounded-xl border border-white/30 bg-[#090817]/90
                transition-all duration-200 ease-out
                hover:-translate-y-1 hover:scale-105
                hover:border-white/80 hover:bg-[#17112E]
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-[#80FF00]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#100C24]
                lg:h-12 lg:w-12
              "
            >
              <Image
                src={social.image}
                alt=""
                width={26}
                height={26}
                unoptimized
                className="h-6 w-6 object-contain transition-transform duration-200 group-hover/link:scale-105"
              />
            </a>
          ))}
        </nav>
      </div>

      {/* Decorative gradient border */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full rounded-2xl"
      >
        <defs>
          <linearGradient
            id="links-border-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.7" />
            <stop offset="15%" stopColor="#A855F7" stopOpacity="0.55" />

            <stop offset="20%" stopColor="#80FF00" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#80FF00" stopOpacity="1" />
            <stop offset="32%" stopColor="#80FF00" stopOpacity="0.65" />
            <stop offset="38%" stopColor="#80FF00" stopOpacity="0" />

            <stop offset="65%" stopColor="#A855F7" stopOpacity="0" />
            <stop offset="75%" stopColor="#A855F7" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        <rect
          x="0.5"
          y="0.5"
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx="16"
          ry="16"
          fill="none"
          stroke="url(#links-border-gradient)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </article>
  );
}
