"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { playSound } from "@/shared/lib/audio/audioManager";

const SKILLS = [
  { name: "React", image: "/images/skills/react.png" },
  { name: "TypeScript", image: "/images/skills/typescript.png" },
  { name: "Next.js", image: "/images/skills/nextjs.png" },
  { name: "Tailwind CSS", image: "/images/skills/tailwindcss.png" },
  { name: "Node.js", image: "/images/skills/nodejs.png" },
  { name: "Express", image: "/images/skills/express.png" },
  { name: "PostgreSQL", image: "/images/skills/postgresql.png" },
  { name: "Docker", image: "/images/skills/docker.png" },
];

const MOBILE_SKILLS_LIMIT = 6;

export function View() {
  const { locale, dictionary } = useLanguage();
  const content = dictionary.profile.skills;

  return (
    <article className="group relative mx-auto w-full max-w-5xl rounded-2xl bg-[#100C24]/55 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] motion-reduce:transform-none">
      <div className="flex min-h-[100px] flex-col items-center gap-4 rounded-2xl px-5 py-5 lg:flex-row lg:gap-4 lg:px-5 lg:py-4">
        {/* Panel heading */}
        <div className="flex w-full items-center justify-center lg:w-auto lg:shrink-0">
          {/* Icon - desktop only */}
          <div className="hidden h-full shrink-0 items-center justify-center lg:flex">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/70 bg-[#17112E]">
              <Code2
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

        {/* Technology logos */}
        <div
          aria-label={content.technologiesLabel}
          className="
            flex w-full items-center justify-center gap-2
            lg:min-w-0 lg:flex-1 lg:justify-end
          "
        >
          {SKILLS.map((skill, index) => (
            <div
              key={skill.name}
              title={skill.name}
              className={`
                flex h-11 w-11 shrink-0 items-center justify-center
                rounded-lg border border-white/30 bg-[#090817]/90 p-1.5
                transition-all duration-200 ease-out
                hover:-translate-y-1 hover:scale-105
                hover:border-white/80
                hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]
                ${index >= MOBILE_SKILLS_LIMIT ? "hidden lg:flex" : ""}
                lg:h-12 lg:w-12 lg:p-2
              `}
            >
              <Image
                src={skill.image}
                alt={skill.name}
                width={36}
                height={36}
                className="h-8 w-8 object-contain lg:h-8 lg:w-8"
              />
            </div>
          ))}
        </div>

        {/* View more */}
        <div className="w-full shrink-0 self-end lg:w-auto lg:self-auto">
          <Link
            href={`/${locale}/skills`}
            onClick={() => playSound("interfaceOpen")}
            className="group/button ml-auto flex h-8 w-fit items-center justify-center gap-1.5 rounded-lg border border-[#80FF00]/80 bg-[#80FF00]/5 px-3 text-[9px] font-extrabold uppercase text-white shadow-[0_0_10px_rgba(128,255,0,0.12)] transition-all hover:bg-[#80FF00]/15 hover:shadow-[0_0_16px_rgba(128,255,0,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#80FF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#100C24]"
          >
            {content.viewMore}

            <ArrowRight
              aria-hidden="true"
              size={12}
              className="text-[#80FF00] transition-transform group-hover/button:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      {/* Decorative gradient border */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full rounded-2xl"
      >
        <defs>
          <linearGradient
            id="skills-border-gradient"
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
          stroke="url(#skills-border-gradient)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </article>
  );
}
