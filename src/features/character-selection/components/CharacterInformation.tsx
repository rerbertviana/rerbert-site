import { BriefcaseBusiness, GraduationCap, MapPin, Circle } from "lucide-react";

import { profile } from "../data/profile";

const INFO_ITEM_CLASS =
  "flex min-w-0 flex-col md:border-l md:border-white/20 md:px-5";

const INFO_HEADER_CLASS = "flex h-6 items-center gap-2";

const INFO_TITLE_CLASS =
  "text-[11px] font-bold uppercase tracking-wide text-gray-100";

const INFO_VALUE_CLASS = "mt-3 text-sm leading-relaxed text-gray-200";

export function CharacterInformation() {
  return (
    <section
      aria-label="Character information"
      className="mx-auto w-full max-w-5xl px-3"
    >
      <div className="relative overflow-hidden rounded-2xl">
        {/* Glass panel */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-6 shadow-[inset_0_0_35px_rgba(255,255,255,0.05)] backdrop-blur-xl md:grid-cols-[112px_repeat(4,minmax(0,1fr))] md:items-stretch md:gap-x-0 md:px-7">
          {/* Seniority */}
          <div className="col-span-2 flex items-center justify-center md:col-span-1">
            <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-xl border-2 border-[#80FF00] bg-[#171A2A] shadow-[0_0_10px_rgba(128,255,0,0.35),0_0_22px_rgba(128,255,0,0.2)]">
              <div className="flex flex-col items-center justify-center gap-1">
                <span className="text-[11px] font-bold leading-none tracking-[0.12em] text-white">
                  LV
                </span>

                <span className="text-xl font-black leading-none tracking-wide text-white">
                  {profile.seniority}
                </span>
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
              <h2 className={INFO_TITLE_CLASS}>Experience</h2>
            </div>

            <p className={INFO_VALUE_CLASS}>{profile.experience}</p>
          </div>

          {/* Education */}
          <div className={INFO_ITEM_CLASS}>
            <div className={INFO_HEADER_CLASS}>
              <GraduationCap size={19} className="shrink-0 text-violet-300" />
              <h2 className={INFO_TITLE_CLASS}>Education</h2>
            </div>

            <p className={INFO_VALUE_CLASS}>{profile.education}</p>
          </div>

          {/* Location */}
          <div className={INFO_ITEM_CLASS}>
            <div className={INFO_HEADER_CLASS}>
              <MapPin size={17} className="shrink-0 text-violet-300" />
              <h2 className={INFO_TITLE_CLASS}>Location</h2>
            </div>

            <p className={INFO_VALUE_CLASS}>{profile.location}</p>
          </div>

          {/* Status */}
          <div className={INFO_ITEM_CLASS}>
            <div className={INFO_HEADER_CLASS}>
              <Circle
                size={9}
                fill="currentColor"
                className="shrink-0 text-[#80FF00]"
              />
              <h2 className={INFO_TITLE_CLASS}>Status</h2>
            </div>

            <div className="mt-3">
              <span className="inline-flex rounded-md border border-[#80FF00]/70 bg-[#80FF00]/10 px-2.5 py-2 text-[9px] font-bold uppercase leading-tight text-gray-100">
                {profile.availability}
              </span>
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
