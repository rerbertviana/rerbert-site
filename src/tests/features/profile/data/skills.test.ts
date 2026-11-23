import { SKILLS, MOBILE_SKILLS_LIMIT } from "@/features/profile/data/skills";

describe("profile skills data", () => {
  it("should contain profile skills", () => {
    expect(SKILLS.length).toBeGreaterThan(0);
  });

  it("should contain exactly 8 profile skills", () => {
    expect(SKILLS).toHaveLength(8);
  });

  it("should contain unique skill ids", () => {
    const ids = SKILLS.map((skill) => skill.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("should contain the expected profile skills", () => {
    const ids = SKILLS.map((skill) => skill.id);

    expect(ids).toEqual([
      "react",
      "typescript",
      "nextjs",
      "tailwindcss",
      "nodejs",
      "expressjs",
      "postgresql",
      "docker",
    ]);
  });

  it("should contain valid skill entries", () => {
    SKILLS.forEach((skill) => {
      expect(skill).toBeDefined();
      expect(skill.id).toBeTruthy();
      expect(skill.name).toBeTruthy();
    });
  });

  it("should define the mobile skills limit", () => {
    expect(MOBILE_SKILLS_LIMIT).toBeDefined();
  });

  it("should have a positive mobile skills limit", () => {
    expect(MOBILE_SKILLS_LIMIT).toBeGreaterThan(0);
  });

  it("should set the mobile skills limit to 6", () => {
    expect(MOBILE_SKILLS_LIMIT).toBe(6);
  });

  it("should have a mobile limit lower than the total skills count", () => {
    expect(MOBILE_SKILLS_LIMIT).toBeLessThan(SKILLS.length);
  });
});
