import type { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: "portfolio",
    name: "RERBERT VIANA",
    status: "in-progress",
    completedAt: "2026-11",
    frontendUrl: "https://github.com/rerbertviana/rerbert-site",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Lucide React",
      "Zustand",
      "Jest",
      "Unit Testing",
    ],
    content: {
      en: {
        description:
          "An interactive developer portfolio inspired by futuristic RPG experiences, combining gaming aesthetics with a professional presentation of my career, skills and projects.",
        highlights: [],
      },
      "pt-BR": {
        description:
          "Portfólio interativo de desenvolvedor inspirado em experiências RPG futuristas, combinando estética gamer com uma apresentação profissional da minha carreira, habilidades e projetos.",
        highlights: [],
      },
    },
  },
  {
    id: "edupresence",
    name: "EduPresence",
    status: "completed",
    completedAt: "2026-04",
    frontendUrl: "https://github.com/rerbertviana/edupresence-front-web-final",
    backendUrl: "https://github.com/rerbertviana/edupresence-backend-final",
    technologies: [
      "nextjs",
      "react",
      "typescript",
      "tailwindcss",
      "shadcn-ui",
      "react-query",
      "axios",
      "jest",
      "react-testing-library",
      "nodejs",
      "expressjs",
      "prisma-orm",
      "postgresql",
      "rest-apis",
      "postman",
      "swagger",
      "eslint",
      "git",
      "github",
      "openai-codex",
    ],
    content: {
      en: {
        description:
          "Academic check-in system developed as a final undergraduate project, focused on managing academic attendance through a web application, with an emphasis on software quality, maintainability and reliable system architecture.",
        highlights: [],
      },
      "pt-BR": {
        description:
          "Sistema de check-in acadêmico desenvolvido como trabalho de conclusão de curso, focado no gerenciamento de frequência acadêmica por meio de uma aplicação web, com ênfase em qualidade de software, manutenibilidade e arquitetura confiável.",
        highlights: [],
      },
    },
  },
  {
    id: "kombigogh",
    name: "Kombigogh",
    status: "completed",
    completedAt: "2021-06",
    frontendUrl: "https://github.com/rerbertviana/Kombigogh-Frontend",
    backendUrl: "https://github.com/rerbertviana/Kombigogh-Backend",
    technologies: [
      "vuejs",
      "typescript",
      "axios",
      "nodejs",
      "expressjs",
      "typeorm",
      "postgresql",
      "redis",
      "rest-apis",
      "git",
      "github",
    ],
    content: {
      en: {
        description:
          "Developed a web-based management and sales platform for Kombigogh, a collective of independent artists located at Shopping Conquista Sul in Vitória da Conquista, Brazil. The solution enables artists to register and manage their products while also acting as sellers within a shared digital environment, centralizing operations and simplifying sales management.",
        highlights: [],
      },
      "pt-BR": {
        description:
          "Desenvolvi uma plataforma web de gerenciamento e vendas para o Kombigogh, uma colaboração de artistas independentes localizada no Shopping Conquista Sul, em Vitória da Conquista. A solução permite que os artistas cadastrem e gerenciem seus produtos, além de atuarem como vendedores em um ambiente digital compartilhado, centralizando operações e facilitando a administração das vendas.",
        highlights: [],
      },
    },
  },
];
