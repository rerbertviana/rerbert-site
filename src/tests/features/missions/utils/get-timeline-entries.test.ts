import { getTimelineEntries } from "@/features/missions/utils/get-timeline-entries";
import { missions } from "@/shared/data/missions";
import { projects } from "@/features/missions/data/projects";

describe("getTimelineEntries", () => {
  const entries = getTimelineEntries();

  it("should return experiences and projects in a single list", () => {
    expect(entries).toHaveLength(missions.length + projects.length);
  });

  it("should map experiences correctly", () => {
    const experienceEntries = entries.filter(
      (entry) => entry.type === "experience",
    );

    expect(experienceEntries).toHaveLength(missions.length);

    missions.forEach((mission) => {
      const entry = experienceEntries.find((item) => item.id === mission.id);

      expect(entry).toBeDefined();
      expect(entry?.data).toBe(mission);
      expect(entry?.sortDate).toBe(mission.endDate);
      expect(entry?.isInProgress).toBe(false);
    });
  });

  it("should map projects correctly", () => {
    const projectEntries = entries.filter((entry) => entry.type === "project");

    expect(projectEntries).toHaveLength(projects.length);

    projects.forEach((project) => {
      const entry = projectEntries.find((item) => item.id === project.id);

      expect(entry).toBeDefined();
      expect(entry?.data).toBe(project);
      expect(entry?.sortDate).toBe(project.completedAt);
      expect(entry?.isInProgress).toBe(project.status === "in-progress");
    });
  });

  it("should prioritize entries that are in progress", () => {
    const inProgressEntries = entries.filter((entry) => entry.isInProgress);

    const otherEntries = entries.filter((entry) => !entry.isInProgress);

    if (inProgressEntries.length === 0) {
      return;
    }

    const firstNonInProgressIndex = entries.findIndex(
      (entry) => !entry.isInProgress,
    );

    const lastInProgressIndex = entries.findLastIndex(
      (entry) => entry.isInProgress,
    );

    expect(lastInProgressIndex).toBeLessThan(firstNonInProgressIndex);

    expect(inProgressEntries.length).toBeGreaterThan(0);
    expect(otherEntries.length).toBeGreaterThan(0);
  });

  it("should sort dated entries by descending date", () => {
    const datedEntries = entries.filter((entry) => entry.sortDate);

    for (let index = 0; index < datedEntries.length - 1; index++) {
      const current = datedEntries[index];
      const next = datedEntries[index + 1];

      if (current.isInProgress === next.isInProgress) {
        expect(
          current.sortDate!.localeCompare(next.sortDate!),
        ).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it("should place entries without dates after dated entries", () => {
    const datedEntries = entries.filter((entry) => entry.sortDate);

    const undatedEntries = entries.filter((entry) => !entry.sortDate);

    if (undatedEntries.length === 0) {
      return;
    }

    const firstUndatedIndex = entries.findIndex((entry) => !entry.sortDate);

    const lastDatedIndex = entries.findLastIndex((entry) => entry.sortDate);

    expect(lastDatedIndex).toBeLessThan(firstUndatedIndex);

    expect(datedEntries.length).toBeGreaterThan(0);
  });

  it("should preserve the relative order of entries without dates", () => {
    const undatedEntries = entries.filter((entry) => !entry.sortDate);

    const originalOrder = [
      ...missions
        .filter((mission) => !mission.endDate)
        .map((mission) => mission.id),
      ...projects
        .filter((project) => !project.completedAt)
        .map((project) => project.id),
    ];

    const actualOrder = undatedEntries.map((entry) => entry.id);

    expect(actualOrder).toEqual(originalOrder);
  });
});
