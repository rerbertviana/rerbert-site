import { SOCIAL_LINKS } from "@/features/profile/data/social-links";

describe("SOCIAL_LINKS", () => {
  describe("Data integrity", () => {
    it("should contain social links", () => {
      expect(SOCIAL_LINKS.length).toBeGreaterThan(0);
    });

    it("should contain unique ids", () => {
      const ids = SOCIAL_LINKS.map((link) => link.id);

      expect(new Set(ids).size).toBe(ids.length);
    });

    it("should contain valid labels", () => {
      SOCIAL_LINKS.forEach((link) => {
        expect(link.label).toBeTruthy();
      });
    });

    it("should contain valid URLs", () => {
      SOCIAL_LINKS.forEach((link) => {
        expect(link.href).toMatch(/^https?:\/\//);
      });
    });

    it("should contain valid image paths", () => {
      SOCIAL_LINKS.forEach((link) => {
        expect(link.image).toBeTruthy();
        expect(link.image).toMatch(/^\/images\/social\//);
      });
    });
  });

  describe("Expected social networks", () => {
    it("should contain GitHub, LinkedIn and WhatsApp", () => {
      const ids = SOCIAL_LINKS.map((link) => link.id);

      expect(ids).toEqual(
        expect.arrayContaining(["github", "linkedin", "whatsapp"]),
      );
    });

    it("should contain the expected GitHub URL", () => {
      const github = SOCIAL_LINKS.find((link) => link.id === "github");

      expect(github).toBeDefined();
      expect(github?.href).toBe("https://github.com/rerbertviana");
    });

    it("should contain the expected LinkedIn URL", () => {
      const linkedin = SOCIAL_LINKS.find((link) => link.id === "linkedin");

      expect(linkedin).toBeDefined();
      expect(linkedin?.href).toBe(
        "https://www.linkedin.com/in/rerbert-brito-viana-279857214/",
      );
    });

    it("should contain a WhatsApp link using wa.me", () => {
      const whatsapp = SOCIAL_LINKS.find((link) => link.id === "whatsapp");

      expect(whatsapp).toBeDefined();
      expect(whatsapp?.href).toMatch(/^https:\/\/wa\.me\//);
    });
  });
});
