import { missions } from "@/shared/data/missions";

describe("shared/data/missions", () => {
  test("should contain missions", () => {
    expect(missions.length).toBeGreaterThan(0);
  });

  test("should contain unique mission IDs", () => {
    const ids = missions.map((mission) => mission.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  test("should contain valid mission data", () => {
    missions.forEach((mission) => {
      expect(mission.id).toBeTruthy();
      expect(mission.company).toBeTruthy();
      expect(mission.startDate).toMatch(/^\d{4}-\d{2}$/);
      expect(mission.endDate).toMatch(/^\d{4}-\d{2}$/);
      expect(mission.location).toBeTruthy();

      expect(mission.technologies.length).toBeGreaterThan(0);
    });
  });

  test("should contain valid date ranges", () => {
    missions.forEach((mission) => {
      expect(mission.startDate <= mission.endDate).toBe(true);
    });
  });

  test("should contain unique technologies per mission", () => {
    missions.forEach((mission) => {
      expect(new Set(mission.technologies).size).toBe(
        mission.technologies.length,
      );
    });
  });

  test("should contain English and Portuguese content", () => {
    missions.forEach((mission) => {
      expect(mission.content.en).toBeDefined();
      expect(mission.content["pt-BR"]).toBeDefined();
    });
  });

  test("should contain valid localized content", () => {
    missions.forEach((mission) => {
      ["en", "pt-BR"].forEach((locale) => {
        const content = mission.content[locale as "en" | "pt-BR"];

        expect(content.role).toBeTruthy();
        expect(content.overview).toBeTruthy();
        expect(content.responsibilities.length).toBeGreaterThan(0);
      });
    });
  });

  test("should contain non-empty responsibilities", () => {
    missions.forEach((mission) => {
      ["en", "pt-BR"].forEach((locale) => {
        const responsibilities =
          mission.content[locale as "en" | "pt-BR"].responsibilities;

        responsibilities.forEach((responsibility) => {
          expect(responsibility.trim()).toBeTruthy();
        });
      });
    });
  });
});
