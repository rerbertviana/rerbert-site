import {
  SKILL_CATEGORIES,
  SKILLS,
  SKILLS_BY_ID,
  SKILL_CATEGORY_IDS,
} from "@/shared/data/skills";

describe("shared/data/skills", () => {
  test("should contain all expected skill categories", () => {
    expect(SKILL_CATEGORIES).toHaveLength(8);

    expect(SKILL_CATEGORY_IDS).toHaveLength(8);

    expect(SKILL_CATEGORY_IDS).toEqual(
      SKILL_CATEGORIES.map((category) => category.id),
    );
  });

  test("should contain unique category IDs", () => {
    const categoryIds = SKILL_CATEGORIES.map((category) => category.id);

    expect(new Set(categoryIds).size).toBe(categoryIds.length);
  });

  test("should contain unique skill IDs across all categories", () => {
    const skillIds = SKILLS.map((skill) => skill.id);

    expect(new Set(skillIds).size).toBe(skillIds.length);
  });

  test("should contain valid skill data", () => {
    SKILLS.forEach((skill) => {
      expect(skill.id).toBeTruthy();
      expect(skill.name).toBeTruthy();
      expect(skill.image).toBeTruthy();

      expect(skill.image).toMatch(/^\/images\/skills\/.+\.png$/);

      expect(["advanced", "intermediate", "basic"]).toContain(
        skill.proficiency,
      );
    });
  });

  test("should contain skills in every category", () => {
    SKILL_CATEGORIES.forEach((category) => {
      expect(category.skills.length).toBeGreaterThan(0);
    });
  });

  test("should flatten all category skills into SKILLS", () => {
    const flattenedSkills = SKILL_CATEGORIES.flatMap(
      (category) => category.skills,
    );

    expect(SKILLS).toEqual(flattenedSkills);
  });

  test("should map every skill correctly in SKILLS_BY_ID", () => {
    SKILLS.forEach((skill) => {
      expect(SKILLS_BY_ID[skill.id]).toEqual(skill);
    });
  });

  test("should contain the same number of entries in SKILLS_BY_ID as SKILLS", () => {
    expect(Object.keys(SKILLS_BY_ID)).toHaveLength(SKILLS.length);
  });

  test("should contain valid category IDs", () => {
    SKILL_CATEGORY_IDS.forEach((categoryId) => {
      expect(categoryId).toBeTruthy();
    });
  });
});
