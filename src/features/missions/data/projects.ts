import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "rerbert-exe",
    name: "RERBERT.EXE",
    status: "in-progress",
    completedAt: null,
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Lucide React",
    ],
    content: {
      en: {
        description:
          "An interactive developer portfolio inspired by futuristic RPG experiences, combining gaming aesthetics with a professional presentation of my career, skills and projects.",
        highlights: [],
      },
      "pt-BR": {
        description:
          "Um portfólio interativo de desenvolvedor inspirado em experiências RPG futuristas, combinando estética gamer com uma apresentação profissional da minha carreira, habilidades e projetos.",
        highlights: [],
      },
    },
  },
  {
    id: "edupresence",
    name: "EduPresence",
    status: "completed",
    completedAt: "2026-04",
    technologies: [],
    content: {
      en: {
        description:
          "Academic check-in system developed as a final undergraduate project, with an emphasis on software quality.",
        highlights: [],
      },
      "pt-BR": {
        description:
          "Sistema de check-in acadêmico desenvolvido como trabalho de conclusão de curso, com ênfase em qualidade de software.",
        highlights: [],
      },
    },
  },
  {
    id: "kombigogh",
    name: "Kombigogh",
    status: "completed",
    completedAt: "2021-06",
    technologies: [],
    content: {
      en: {
        description:
          "Developed a management and sales platform for Kombigogh, an artist collective based at Shopping Conquista Sul in Vitória da Conquista, Brazil. The system allows independent artists to manage their products and operate as sellers within a shared digital environment.",
        highlights: [],
      },
      "pt-BR": {
        description:
          "Desenvolvi uma plataforma de gerenciamento e vendas para o Kombigogh, uma colaboração de artistas localizada no Shopping Conquista Sul, em Vitória da Conquista. O sistema permite que artistas independentes gerenciem seus produtos e atuem como vendedores em um ambiente digital compartilhado.",
        highlights: [],
      },
    },
  },
];
