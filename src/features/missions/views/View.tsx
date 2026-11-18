"use client";

import { useMemo, useState } from "react";

import { View as BackButton } from "@/shared/components/navigation/back-button/View";
import { View as DigitalReconstructionEntrance } from "@/shared/components/animations/digital-reconstruction-entrance/View";
import { useLanguage } from "@/shared/i18n/LanguageProvider";

import { View as MissionsTitle } from "../components/missions-title/View";
import { View as MissionsFilter } from "../components/missions-filter/View";
import { View as MissionsTimeline } from "../components/missions-timeline/View";

import { getTimelineEntries } from "../utils/get-timeline-entries";

import type { MissionFilter } from "../types/timeline";

export function View() {
  const { dictionary } = useLanguage();

  const [selectedFilter, setSelectedFilter] = useState<MissionFilter>("all");

  const timelineEntries = useMemo(() => getTimelineEntries(), []);

  const filteredEntries = timelineEntries.filter((entry) => {
    if (selectedFilter === "all") return true;

    if (selectedFilter === "experience") {
      return entry.type === "experience";
    }

    return entry.type === "project";
  });

  return (
    <DigitalReconstructionEntrance>
      <main
        aria-labelledby="missions-title"
        className="flex w-full flex-1 flex-col"
      >
        <MissionsTitle />

        {/* Back button */}
        <section className="mx-auto mt-5 w-full max-w-[1200px] px-4">
          <BackButton
            href="/profile"
            label={dictionary.missions.backToProfile}
          />
        </section>

        {/* Centered filters */}
        <section className="mx-auto mt-3 w-full max-w-[1200px] px-4">
          <MissionsFilter
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </section>

        {/* Timeline */}
        <section
          aria-label={dictionary.missions.title}
          className="
            mx-auto mt-6 w-full max-w-[1200px]
            flex-1 px-4 pb-8
          "
        >
          <MissionsTimeline entries={filteredEntries} />
        </section>
      </main>
    </DigitalReconstructionEntrance>
  );
}
