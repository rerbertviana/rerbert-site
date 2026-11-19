"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { View as BackButton } from "@/shared/components/navigation/back-button/View";
import { View as DigitalReconstructionEntrance } from "@/shared/components/animations/digital-reconstruction-entrance/View";
import { useLanguage } from "@/shared/i18n/LanguageProvider";

import { View as MissionsTitle } from "../components/missions-title/View";
import { View as MissionsFilter } from "../components/missions-filter/View";
import { View as MissionsTimeline } from "../components/missions-timeline/View";

import { getTimelineEntries } from "../utils/get-timeline-entries";

import type { MissionFilter } from "../types/timeline";

const DEFAULT_FILTER: MissionFilter = "all";
const FILTER_QUERY_PARAM = "filter";

const VALID_FILTERS: MissionFilter[] = ["all", "experience", "project"];

function isMissionFilter(value: string | null): value is MissionFilter {
  return value !== null && VALID_FILTERS.includes(value as MissionFilter);
}

export function View() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { dictionary } = useLanguage();

  const filterParam = searchParams.get(FILTER_QUERY_PARAM);

  const selectedFilter = isMissionFilter(filterParam)
    ? filterParam
    : DEFAULT_FILTER;

  const timelineEntries = getTimelineEntries();

  const filteredEntries = timelineEntries.filter(
    (entry) => selectedFilter === "all" || entry.type === selectedFilter,
  );

  function handleFilterChange(filter: MissionFilter) {
    const params = new URLSearchParams(searchParams.toString());

    params.set(FILTER_QUERY_PARAM, filter);

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

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
            onFilterChange={handleFilterChange}
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
