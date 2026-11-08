"use client";

import {
  Award,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Circle,
} from "lucide-react";
import { motion } from "motion/react";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import type { CharacterProfile } from "../../types/character";

interface CharacterInformationProps {
  profile?: CharacterProfile;
  localizedSeniority?: string;
  localizedExperience?: string;
  localizedEducation?: string;
  shouldAnimate?: boolean;
}

const INFO_ITEM_CLASS =
  "flex min-w-0 flex-row items-center justify-between gap-2 border-b border-white/10 py-2.5 md:flex-col md:items-start md:justify-start md:border-b-0 md:border-l md:border-white/20 md:px-5 md:py-0";

const INFO_HEADER_CLASS = "flex h-6 items-center gap-2";

const INFO_TITLE_CLASS =
  "text-[11px] font-bold uppercase tracking-wide text-gray-100";

const INFO_VALUE_CLASS =
  "text-xs leading-relaxed text-gray-200 md:mt-3 md:text-sm";

const STATUS_COLORS = {
  available: {
    foreground: "#80FF00",
    border: "rgba(128, 255, 0, 0.7)",
    background: "rgba(128, 255, 0, 0.1)",
  },
  unavailable: {
    foreground: "#FF3B5C",
    border: "rgba(255, 59, 92, 0.7)",
    background: "rgba(255, 59, 92, 0.1)",
  },
} as const;

export function CharacterInformation({
  profile,
  localizedSeniority,
  localizedExperience,
  localizedEducation,
  shouldAnimate = false,
}: CharacterInformationProps) {
  const { dictionary } = useLanguage();
  const translations = dictionary.characterSelection.information;

  if (!profile) {
    return null;
  }

  const statusColors = profile.isAvailable
    ? STATUS_COLORS.available
    : STATUS_COLORS.unavailable;

  return (
    <motion.section
      aria-label={translations.label}
      initial={
        shouldAnimate
          ? {
              opacity: 0,
              y: 12,
              filter: "blur(4px)",
            }
          : false
      }
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mx-auto w-full max-w-5xl px-3"
    >
      <div className="relative">
        <div className="relative overflow-hidden rounded-lg md:rounded-2xl">
          <div className="grid grid-cols-1 gap-x-0 rounded-lg bg-white/[0.04] px-4 py-5 shadow-[inset_0_0_35px_rgba(255,255,255,0.05)] backdrop-blur-xl md:grid-cols-5 md:items-stretch md:gap-x-0 md:rounded-2xl md:px-5 md:py-6">
            {/* Seniority - Mobile */}
            <div className={`${INFO_ITEM_CLASS} md:hidden`}>
              <div className={INFO_HEADER_CLASS}>
                <Award size={17} className="shrink-0 text-violet-300" />
                <h2 className={INFO_TITLE_CLASS}>{translations.level}</h2>
              </div>

              <div className="min-w-0 text-right">
                <p className={INFO_VALUE_CLASS}>
                  {localizedSeniority ?? profile.seniority}
                </p>
              </div>
            </div>

            {/* Seniority - Desktop */}
            <div className="hidden min-w-0 items-center justify-center md:flex">
              <div className="rounded-xl bg-gradient-to-br from-violet-500 via-purple-400 to-[#80FF00] p-[2px]">
                <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[10px] bg-[#171A2A]">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-[11px] font-bold leading-none tracking-[0.12em] text-white">
                      {translations.level}
                    </span>

                    <span className="max-w-full px-3 text-center text-base font-black leading-none tracking-wide text-white sm:text-lg">
                      {localizedSeniority ?? profile.seniority}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className={INFO_ITEM_CLASS}>
              <div className={INFO_HEADER_CLASS}>
                <BriefcaseBusiness
                  size={17}
                  className="shrink-0 text-violet-300"
                />
                <h2 className={INFO_TITLE_CLASS}>{translations.experience}</h2>
              </div>

              <div className="min-w-0 text-right md:text-left">
                {profile.experience && (
                  <p className={INFO_VALUE_CLASS}>
                    {localizedExperience ?? profile.experience}
                  </p>
                )}
              </div>
            </div>

            {/* Education */}
            <div className={INFO_ITEM_CLASS}>
              <div className={INFO_HEADER_CLASS}>
                <GraduationCap size={19} className="shrink-0 text-violet-300" />
                <h2 className={INFO_TITLE_CLASS}>{translations.education}</h2>
              </div>

              <div className="min-w-0 text-right md:text-left">
                {profile.education && (
                  <p className={INFO_VALUE_CLASS}>
                    {localizedEducation ?? profile.education}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className={INFO_ITEM_CLASS}>
              <div className={INFO_HEADER_CLASS}>
                <MapPin size={17} className="shrink-0 text-violet-300" />
                <h2 className={INFO_TITLE_CLASS}>{translations.location}</h2>
              </div>

              <div className="min-w-0 text-right md:text-left">
                {profile.location && (
                  <p className={INFO_VALUE_CLASS}>{profile.location}</p>
                )}
              </div>
            </div>

            {/* Status */}
            <div className={`${INFO_ITEM_CLASS} border-b-0`}>
              <div className={INFO_HEADER_CLASS}>
                <Circle
                  size={9}
                  fill="currentColor"
                  className="shrink-0"
                  style={{
                    color: statusColors.foreground,
                  }}
                />
                <h2 className={INFO_TITLE_CLASS}>{translations.status}</h2>
              </div>

              <div className="min-w-0 text-right md:text-left">
                <div className="md:mt-3">
                  <span
                    className="inline-flex max-w-full items-center justify-center rounded-md border px-2 py-1.5 text-center text-[8px] font-bold uppercase leading-tight text-gray-100 md:px-2.5 md:py-2 md:text-[9px]"
                    style={{
                      borderColor: statusColors.border,
                      backgroundColor: statusColors.background,
                    }}
                  >
                    {profile.isAvailable
                      ? translations.available
                      : translations.unavailable}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative border gradient */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 180"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="character-information-border"
                x1="0"
                y1="0"
                x2="1000"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                {/* Left edge - violet */}
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.7" />
                <stop offset="15%" stopColor="#A855F7" stopOpacity="0.55" />

                {/* Transition to neon green */}
                <stop offset="20%" stopColor="#80FF00" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#80FF00" stopOpacity="1" />
                <stop offset="32%" stopColor="#80FF00" stopOpacity="0.65" />
                <stop offset="38%" stopColor="#80FF00" stopOpacity="0" />

                {/* Transparent center */}
                <stop offset="65%" stopColor="#A855F7" stopOpacity="0" />

                {/* Right edge - violet */}
                <stop offset="75%" stopColor="#A855F7" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            <rect
              x="0.5"
              y="0.5"
              width="999"
              height="179"
              rx="8"
              ry="8"
              className="[rx:8px] md:[rx:18px] [ry:8px] md:[ry:18px]"
              fill="none"
              stroke="url(#character-information-border)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </motion.section>
  );
}
