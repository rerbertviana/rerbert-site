"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, CodeXml, X } from "lucide-react";

import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import { SKILLS } from "@/shared/data/skills";
import { playSound } from "@/shared/lib/audio/audioManager";

interface Props {
  id: string;
  title: string;
  description: string;
  details: string[];
  period: string;
  image: string;
  technologies: string[];
  isExperience: boolean;
  frontendUrl?: string;
  backendUrl?: string;
  onClose: () => void;
}

interface ModalSectionTitleProps {
  children: ReactNode;
}

function normalizeTechnology(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const SKILLS_BY_NAME = new Map(
  SKILLS.map((skill) => [normalizeTechnology(skill.name), skill]),
);

const TECHNOLOGY_ALIASES: Record<string, string> = {
  reactjs: "react",
  express: "expressjs",
};

function getTechnologySkill(technology: string) {
  const normalizedName = normalizeTechnology(technology);
  const skillName = TECHNOLOGY_ALIASES[normalizedName] ?? normalizedName;

  return SKILLS_BY_NAME.get(skillName);
}

function ModalSectionTitle({ children }: ModalSectionTitleProps) {
  return (
    <div className="mb-4 flex items-center gap-4">
      <h3
        className="
          flex shrink-0 items-center gap-2
          font-[family-name:var(--font-oxanium)]
          text-sm font-bold uppercase
          tracking-[0.15em] text-white
          sm:text-base
        "
      >
        <span aria-hidden="true" className="text-[#8AFF00]">
          ❮
        </span>

        {children}

        <span aria-hidden="true" className="text-[#8AFF00]">
          ❯
        </span>
      </h3>

      <div
        aria-hidden="true"
        className="
          h-[2px] min-w-0 flex-1
          bg-gradient-to-r
          from-[#A78BFA] via-[#A78BFA]/70 to-transparent
        "
      />
    </div>
  );
}

export function View({
  id,
  title,
  description,
  details,
  period,
  image,
  technologies,
  isExperience,
  frontendUrl,
  backendUrl,
  onClose,
}: Props) {
  const { dictionary } = useLanguage();
  const content = dictionary.missions.card;

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  const handleClose = useCallback(() => {
    playSound("interfaceClose");
    onClose();
  }, [onClose]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      handleClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    if (!focusableElements?.length) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const portalRoot = typeof document !== "undefined" ? document.body : null;

  if (!portalRoot) {
    return null;
  }

  return createPortal(
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        overflow-y-auto
        bg-black/80 p-4
        backdrop-blur-sm
        animate-in fade-in duration-200
      "
      onClick={handleClose}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`mission-modal-title-${id}`}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
        className="
          relative isolate my-auto
          flex max-h-[80vh] w-full max-w-2xl
          flex-col overflow-hidden rounded-xl
          bg-[#100C24]/95
          shadow-[0_0_35px_rgba(167,139,250,0.12)]
          animate-in zoom-in-95 duration-200
        "
      >
        {/* Dedicated image area */}
        <header
          className="
            relative h-[140px] shrink-0
            overflow-hidden bg-[#080D18]
          "
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
          />

          {/* Gradual image fade */}
          <div
            aria-hidden="true"
            className="
              absolute inset-0
              bg-gradient-to-b
              from-transparent
              via-[#100C24]/10
              to-[#100C24]
            "
          />

          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="Close mission details"
            className="
              absolute right-4 top-4 z-20
              flex h-9 w-9 items-center justify-center
              rounded-md border border-white/30
              bg-[#080D18]/75 text-white
              backdrop-blur-sm transition-colors
              hover:border-[#A78BFA]
              hover:bg-[#080D18]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#A78BFA]
            "
          >
            <X size={18} />
          </button>
        </header>

        {/* Mission title and period */}
        <div className="relative shrink-0 bg-[#100C24] px-6 pb-5 pt-1 sm:px-10">
          <h2
            id={`mission-modal-title-${id}`}
            className="
              text-left
              font-[family-name:var(--font-oxanium)]
              text-2xl font-extrabold uppercase
              tracking-wider text-white
              sm:text-3xl
            "
          >
            {title}
          </h2>

          <div
            className="
              mt-2 flex items-center gap-2
              text-left text-xs font-medium
              tracking-wide text-white/80
            "
          >
            <span>{period}</span>

            <CalendarDays
              size={14}
              className="shrink-0 text-white/80"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Modal body */}
        <div
          className="
            min-h-0 overflow-y-auto
            bg-[#100C24]/80
            px-5 pb-6 pt-2
            backdrop-blur-xl
            sm:px-8 sm:pb-8
          "
        >
          {/* Overview */}
          <section>
            <ModalSectionTitle>{content.overview}</ModalSectionTitle>

            <p className="px-4 text-justify text-sm leading-relaxed text-gray-200 sm:text-base">
              {description}
            </p>
          </section>

          {/* Professional responsibilities */}
          {isExperience && details.length > 0 && (
            <section className="mt-6">
              <ModalSectionTitle>{content.responsibilities}</ModalSectionTitle>

              <ul className="space-y-2 px-7">
                {details.map((detail, index) => (
                  <li
                    key={`${index}-${detail}`}
                    className="
                      flex gap-2
                      text-justify text-sm leading-relaxed text-gray-200
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        mt-1.5 h-2 w-2 shrink-0
                        bg-[#8AFF00]
                        shadow-[0_0_8px_rgba(138,255,0,0.6)]
                      "
                    />

                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Project source code */}
          {!isExperience && (frontendUrl || backendUrl) && (
            <section className="mt-6">
              <ModalSectionTitle>{content.sourceCode}</ModalSectionTitle>

              <div className="flex flex-wrap gap-3 px-4">
                {frontendUrl && (
                  <a
                    href={frontendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View frontend source code on GitHub"
                    className="
                      inline-flex items-center gap-2
                      rounded-md border border-violet-400/60
                      bg-[#080D18]/80 px-4 py-2.5
                      text-sm font-semibold text-white
                      transition-colors duration-200
                      hover:border-[#A78BFA]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#A78BFA]
                    "
                  >
                    <CodeXml size={17} />
                    Frontend
                  </a>
                )}

                {backendUrl && (
                  <a
                    href={backendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View backend source code on GitHub"
                    className="
                      inline-flex items-center gap-2
                      rounded-md border border-violet-400/60
                      bg-[#080D18]/80 px-4 py-2.5
                      text-sm font-semibold text-white
                      transition-colors duration-200
                      hover:border-[#A78BFA]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#A78BFA]
                    "
                  >
                    <CodeXml size={17} />
                    Backend
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <section className="mt-6">
              <ModalSectionTitle>{content.technologies}</ModalSectionTitle>

              <div className="flex flex-wrap items-center justify-start gap-3 px-4">
                {technologies.map((technology) => {
                  const skill = getTechnologySkill(technology);

                  return (
                    <div
                      key={technology}
                      title={technology}
                      aria-label={technology}
                      className="
                        flex h-10 w-10 items-center justify-center
                        rounded-lg border-[1.5px] border-white/60
                        bg-[#080D18]/80 p-1.5
                        transition-all duration-200
                        hover:-translate-y-1
                      "
                    >
                      {skill ? (
                        <Image
                          src={skill.image}
                          alt={technology}
                          width={26}
                          height={26}
                          className="h-[26px] w-[26px] object-contain"
                        />
                      ) : (
                        <span
                          className="text-sm font-bold text-violet-300"
                          aria-hidden="true"
                        >
                          &lt;/&gt;
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>,
    portalRoot,
  );
}
