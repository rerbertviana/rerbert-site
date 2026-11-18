import Image from "next/image";

import { useLanguage } from "@/shared/i18n/LanguageProvider";
import type { ProficiencyLevel, Skill } from "@/shared/types/skills";

interface SkillCardProps {
  skill: Skill;
}

const PROFICIENCY_PROGRESS: Record<ProficiencyLevel, number> = {
  basic: 35,
  intermediate: 65,
  advanced: 100,
};

const PROFICIENCY_COLORS: Record<ProficiencyLevel, string> = {
  basic: "#38BDF8",
  intermediate: "#B77AFF",
  advanced: "#80FF00",
};

export function View({ skill }: SkillCardProps) {
  const { dictionary } = useLanguage();

  const proficiency = dictionary.skills.proficiency[skill.proficiency];
  const progress = PROFICIENCY_PROGRESS[skill.proficiency];
  const accentColor = PROFICIENCY_COLORS[skill.proficiency];

  return (
    <article
      aria-label={`${skill.name} - ${proficiency}`}
      className="
        group relative flex min-h-[76px] w-full min-w-0
        items-center gap-3 overflow-hidden rounded-lg
        border-2 border-[#A78BFA]/30
        bg-[#100C24]/75 px-3 py-2
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-[#A78BFA]/70
        hover:bg-[#17112E]/90
        motion-reduce:transform-none
      "
    >
      {/* Technology logo */}
      <div
        className="
          flex size-10 shrink-0 items-center justify-center
          rounded-lg border border-[#A78BFA]/50
          bg-[#171326] p-2
          transition-colors duration-300
          group-hover:border-[#A78BFA]
        "
      >
        <Image
          src={skill.image}
          alt=""
          width={32}
          height={32}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Technology information */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-0.5">
          <h3
            className="
              truncate font-[family-name:var(--font-oxanium)]
              text-xs font-bold text-white
            "
          >
            {skill.name}
          </h3>

          <span
            className="
              shrink-0 font-[family-name:var(--font-oxanium)]
              text-[9px] font-bold uppercase tracking-wider
            "
            style={{ color: accentColor }}
          >
            {proficiency}
          </span>
        </div>

        {/* Proficiency bar */}
        <div
          role="progressbar"
          aria-label={`${skill.name} proficiency`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="h-1 w-full overflow-hidden rounded-full bg-[#302744]"
        >
          <div
            className="
              h-full rounded-full
              transition-[width] duration-500 ease-out
              motion-reduce:transition-none
            "
            style={{
              width: `${progress}%`,
              backgroundColor: accentColor,
            }}
          />
        </div>
      </div>
    </article>
  );
}
