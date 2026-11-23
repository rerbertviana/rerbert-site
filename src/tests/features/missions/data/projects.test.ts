import { projects } from "@/features/missions/data/projects";

describe("projects", () => {
  describe("Data integrity", () => {
    it("should contain projects", () => {
      expect(projects.length).toBeGreaterThan(0);
    });

    it("should contain unique project ids", () => {
      const ids = projects.map((project) => project.id);

      expect(new Set(ids).size).toBe(ids.length);
    });

    it("should contain valid project names", () => {
      projects.forEach((project) => {
        expect(project.name).toBeTruthy();
      });
    });

    it("should contain valid project statuses", () => {
      projects.forEach((project) => {
        expect(["completed", "in-progress"]).toContain(project.status);
      });
    });

    it("should contain valid completion dates", () => {
      projects.forEach((project) => {
        expect(project.completedAt).toMatch(/^\d{4}-\d{2}$/);
      });
    });

    it("should contain at least one technology per project", () => {
      projects.forEach((project) => {
        expect(project.technologies.length).toBeGreaterThan(0);
      });
    });

    it("should contain valid technology entries", () => {
      projects.forEach((project) => {
        project.technologies.forEach((technology) => {
          expect(technology).toBeTruthy();
          expect(typeof technology).toBe("string");
        });
      });
    });
  });

  describe("Project links", () => {
    it("should contain valid frontend URLs", () => {
      projects.forEach((project) => {
        expect(project.frontendUrl).toBeTruthy();
        expect(project.frontendUrl).toMatch(/^https?:\/\//);
      });
    });

    it("should contain valid backend URLs when provided", () => {
      projects.forEach((project) => {
        if (project.backendUrl) {
          expect(project.backendUrl).toMatch(/^https?:\/\//);
        }
      });
    });
  });

  describe("Localized content", () => {
    it("should contain English and Portuguese content for every project", () => {
      projects.forEach((project) => {
        expect(project.content.en).toBeDefined();
        expect(project.content["pt-BR"]).toBeDefined();
      });
    });

    it("should contain valid descriptions in both languages", () => {
      projects.forEach((project) => {
        expect(project.content.en.description).toBeTruthy();
        expect(project.content["pt-BR"].description).toBeTruthy();
      });
    });

    it("should contain highlights arrays in both languages", () => {
      projects.forEach((project) => {
        expect(Array.isArray(project.content.en.highlights)).toBe(true);
        expect(Array.isArray(project.content["pt-BR"].highlights)).toBe(true);
      });
    });
  });

  describe("Project status consistency", () => {
    it("should identify the portfolio as in progress", () => {
      const portfolio = projects.find((project) => project.id === "portfolio");

      expect(portfolio).toBeDefined();
      expect(portfolio?.status).toBe("in-progress");
    });

    it("should contain completed projects", () => {
      const completedProjects = projects.filter(
        (project) => project.status === "completed",
      );

      expect(completedProjects.length).toBeGreaterThan(0);
    });
  });
});
