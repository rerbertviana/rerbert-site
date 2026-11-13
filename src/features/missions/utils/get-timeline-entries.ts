import { missions } from "@/shared/data/missions";
import { projects } from "../data/projects";
import type { TimelineEntry } from "../types/timeline";

export function getTimelineEntries(): TimelineEntry[] {
  const experiences: TimelineEntry[] = missions.map((mission) => ({
    id: mission.id,
    type: "experience",
    data: mission,
    sortDate: mission.endDate,
    isInProgress: false,
  }));

  const personalProjects: TimelineEntry[] = projects.map((project) => ({
    id: project.id,
    type: "project",
    data: project,
    sortDate: project.completedAt,
    isInProgress: project.status === "in-progress",
  }));

  return [...experiences, ...personalProjects].sort((a, b) => {
    if (a.isInProgress !== b.isInProgress) {
      return a.isInProgress ? -1 : 1;
    }

    if (!a.sortDate) return 1;
    if (!b.sortDate) return -1;

    return b.sortDate.localeCompare(a.sortDate);
  });
}
