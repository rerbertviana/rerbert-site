import { characters } from "@/features/character-selection/data/characters";

describe("characters", () => {
  describe("Data integrity", () => {
    it("should contain characters", () => {
      expect(characters.length).toBeGreaterThan(0);
    });

    it("should contain unique character ids", () => {
      const ids = characters.map((character) => character.id);

      expect(new Set(ids).size).toBe(ids.length);
    });

    it("should contain valid character statuses", () => {
      characters.forEach((character) => {
        expect(["available", "locked"]).toContain(character.status);
      });
    });

    it("should contain valid character names", () => {
      characters.forEach((character) => {
        expect(character.name).toBeTruthy();
      });
    });

    it("should contain valid character roles", () => {
      characters.forEach((character) => {
        expect(character.role).toBeTruthy();
      });
    });

    it("should contain valid character images", () => {
      characters.forEach((character) => {
        expect(character.image).toBeTruthy();
        expect(character.image).toMatch(/^\/images\/characters\//);
      });
    });
  });

  describe("Available character", () => {
    it("should contain exactly one available character", () => {
      const availableCharacters = characters.filter(
        (character) => character.status === "available",
      );

      expect(availableCharacters).toHaveLength(1);
    });

    it("should identify Rerbert as the available character", () => {
      const availableCharacter = characters.find(
        (character) => character.status === "available",
      );

      expect(availableCharacter).toBeDefined();

      expect(availableCharacter).toMatchObject({
        id: "rerbert",
        name: "Rerbert Viana",
        role: "Fullstack Developer",
        status: "available",
      });
    });

    it("should contain profile information for the available character", () => {
      const availableCharacter = characters.find(
        (character) => character.status === "available",
      );

      expect(availableCharacter).toBeDefined();
      expect(availableCharacter?.profile).toBeDefined();
    });

    it("should mark the available character as available for work", () => {
      const availableCharacter = characters.find(
        (character) => character.status === "available",
      );

      expect(availableCharacter).toBeDefined();
      expect(availableCharacter?.profile?.isAvailable).toBe(true);
    });
  });

  describe("Locked characters", () => {
    it("should contain locked characters", () => {
      const lockedCharacters = characters.filter(
        (character) => character.status === "locked",
      );

      expect(lockedCharacters.length).toBeGreaterThan(0);
    });

    it("should not contain profile information for locked characters", () => {
      const lockedCharacters = characters.filter(
        (character) => character.status === "locked",
      );

      lockedCharacters.forEach((character) => {
        expect(character.profile).toBeUndefined();
      });
    });
  });
});
