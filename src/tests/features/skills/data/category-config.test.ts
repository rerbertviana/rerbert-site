import { SKILL_CATEGORY_ICONS } from "@/features/skills/data/category-config";

describe("SKILL_CATEGORY_ICONS", () => {
  it("should contain all expected skill categories", () => {
    expect(Object.keys(SKILL_CATEGORY_ICONS)).toEqual(
      expect.arrayContaining([
        "frameworks-libraries",
        "languages-core",
        "state-management",
        "apis-data-fetching",
        "testing-quality",
        "databases-infrastructure",
        "methodologies-workflow",
        "devops-collaboration-ai",
      ]),
    );
  });

  it("should contain exactly 8 categories", () => {
    expect(Object.keys(SKILL_CATEGORY_ICONS)).toHaveLength(8);
  });

  it("should map every category to an icon component", () => {
    Object.values(SKILL_CATEGORY_ICONS).forEach((icon) => {
      expect(icon).toBeDefined();
      expect(icon).not.toBeNull();
    });
  });

  it("should not contain undefined icon mappings", () => {
    Object.entries(SKILL_CATEGORY_ICONS).forEach(([category, icon]) => {
      expect(icon).toBeDefined();
      expect(icon).not.toBeNull();
      expect(category).toBeTruthy();
    });
  });
});
