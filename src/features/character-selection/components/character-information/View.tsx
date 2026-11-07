"use client";

import {
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  Circle,
  LoaderCircle,
} from "lucide-react";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import type { CharacterProfile } from "../../types/character";

interface CharacterInformationProps {
  profile?: CharacterProfile;
  localizedSeniority?: string;
  localizedExperience?: string;
  localizedEducation?: string;
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

function LoadingIndicator() {
  return (
    <div className="flex h-6 items-center" aria-hidden="true">
      <LoaderCircle size={17} className="animate-spin text-violet-300" />
    </div>
  );
}

export function CharacterInformation({
  profile,
  localizedSeniority,
  localizedExperience,
  localizedEducation,
}: CharacterInformationProps) {
  const { dictionary } = useLanguage();
  const translations = dictionary.characterSelection.information;

  const statusColors = profile?.isAvailable
    ? STATUS_COLORS.available
    : STATUS_COLORS.unavailable;

  return (
    <section
      aria-label={translations.label}
      aria-busy={!profile}
      className="mx-auto w-full max-w-5xl px-3"
    >
      <div className="relative overflow-hidden rounded-2xl">
        <div className="grid grid-cols-[76px_minmax(0,1fr)] gap-x-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 shadow-[inset_0_0_35px_rgba(255,255,255,0.05)] backdrop-blur-xl md:grid-cols-[112px_repeat(4,minmax(0,1fr))] md:items-stretch md:gap-x-0 md:px-7 md:py-6">
          {/* Seniority */}
          <div className="row-span-4 flex items-center justify-start md:row-span-1 md:justify-center">
            <div className="rounded-xl bg-gradient-to-br from-violet-500 via-purple-400 to-[#80FF00] p-[2px]">
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[10px] bg-[#171A2A]">
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-[11px] font-bold leading-none tracking-[0.12em] text-white">
                    {translations.level}
                  </span>

                  {profile ? (
                    <span className="max-w-full px-3 text-base font-black leading-none tracking-wide text-center text-white sm:text-lg">
                      {localizedSeniority ?? profile.seniority}
                    </span>
                  ) : (
                    <LoadingIndicator />
                  )}
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
              {profile?.experience ? (
                <p className={INFO_VALUE_CLASS}>
                  {localizedExperience ?? profile.experience}
                </p>
              ) : (
                <LoadingIndicator />
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
              {profile?.education ? (
                <p className={INFO_VALUE_CLASS}>
                  {localizedEducation ?? profile.education}
                </p>
              ) : (
                <LoadingIndicator />
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
              {profile?.location ? (
                <p className={INFO_VALUE_CLASS}>{profile.location}</p>
              ) : (
                <LoadingIndicator />
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
              {profile ? (
                <div className="md:mt-3">
                  <span
                    className="inline-flex max-w-full rounded-md border px-2 py-1.5 text-[8px] font-bold uppercase leading-tight text-gray-100 md:px-2.5 md:py-2 md:text-[9px]"
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
              ) : (
                <LoadingIndicator />
              )}
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
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.7" />
              <stop offset="20%" stopColor="#A855F7" stopOpacity="0.55" />
              <stop offset="35%" stopColor="#D8C4F5" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="65%" stopColor="#D8C4F5" stopOpacity="0.75" />
              <stop offset="80%" stopColor="#A855F7" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          <rect
            x="0.5"
            y="0.5"
            width="999"
            height="179"
            rx="18"
            ry="18"
            fill="none"
            stroke="url(#character-information-border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  );
}
