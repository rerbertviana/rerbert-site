import type { Mission } from "../types/mission";

export const missions: Mission[] = [
  {
    id: "compass-uol",
    company: "Compass UOL",
    startDate: "2022-02",
    endDate: "2026-06",
    location: "Passo Fundo, RS, Brazil",
    technologies: [
      "React.js",
      "Next.js",
      "Node.js",
      "Vue.js",
      "Zustand",
      "Context API",
      "Redux",
      "Fetch API",
      "Axios",
      "React Query",
      "REST APIs",
      "Jest",
      "Cypress",
      "Stryker",
      "BFF",
      "Jira",
      "Scrum",
      "Kanban",
      "Git",
      "GitLab",
      "Azure DevOps",
      "GitHub Copilot",
    ],
    content: {
      en: {
        role: "Frontend Developer",
        overview:
          "Development of digital solutions for Vivo (Telefônica Brasil), building user-facing interfaces with React.js, Next.js and Vue.js. Contributed to accessibility improvements and frontend development, integrating applications with BFF (Backend for Frontend) services developed using Spring Boot.",
        responsibilities: [
          "Developed systems using React.js, Next.js, Vue.js and Node.js.",
          "Managed application state using Zustand, Context API and Redux.",
          "Integrated APIs and caching solutions using Fetch, Axios and React Query.",
          "Developed unit, mutation and component tests using Jest, Cypress and Stryker.",
          "Worked with Backend for Frontend (BFF) architecture.",
          "Participated in Agile workflows using Scrum, Kanban and Jira.",
          "Collaborated through Git, GitLab and Azure DevOps.",
          "Used GitHub Copilot for AI-assisted software development.",
        ],
      },
      "pt-BR": {
        role: "Desenvolvedor de Front-end",
        overview:
          "Desenvolvimento de soluções digitais para a VIVO (Telefônica Brasil), construindo interfaces com React.js, Next.js e Vue.js. Contribuição para melhorias de acessibilidade e desenvolvimento frontend, integrando aplicações a serviços BFF (Backend for Frontend) desenvolvidos com Spring Boot.",
        responsibilities: [
          "Desenvolvimento de sistemas utilizando React.js, Next.js, Vue.js e Node.js.",
          "Gerenciamento de estado com Zustand, Context API e Redux.",
          "Integração de APIs e soluções de cache com Fetch, Axios e React Query.",
          "Testes unitários, mutação e de componentes com Jest, Cypress e Stryker.",
          "Atuação com arquitetura Backend for Frontend (BFF).",
          "Participação em fluxos ágeis utilizando Scrum, Kanban e Jira.",
          "Colaboração e versionamento com Git, GitLab e Azure DevOps.",
          "Utilização do GitHub Copilot para desenvolvimento de software assistido por IA.",
        ],
      },
    },
  },
  {
    id: "izap-softworks",
    company: "iZap Softworks",
    startDate: "2021-10",
    endDate: "2022-02",
    location: "Minas Gerais, Brazil",
    technologies: ["React.js", "Node.js", "Atomic Design"],
    content: {
      en: {
        role: "Junior Software Developer",
        overview:
          "Software development company focused on delivering custom digital solutions for clients across different business domains. I worked on multiple projects, adapting to diverse requirements, business contexts and technical challenges while collaborating with teams in the development, evolution and maintenance of software systems.",
        responsibilities: [
          "Developed systems using React.js and Node.js.",
          "Applied Atomic Design principles when building user interfaces.",
        ],
      },
      "pt-BR": {
        role: "Desenvolvedor de Software Júnior",
        overview:
          "Fábrica de software responsável pelo desenvolvimento de soluções digitais sob medida para clientes de diferentes segmentos. Trabalhei em diversos projetos, adaptando-me a diferentes requisitos, contextos de negócio e desafios técnicos, colaborando com equipes no desenvolvimento, evolução e manutenção de sistemas.",
        responsibilities: [
          "Desenvolvimento de sistemas utilizando React.js e Node.js.",
          "Aplicação de conceitos de Atomic Design na construção de interfaces.",
        ],
      },
    },
  },
  {
    id: "elleven-tecnologia",
    company: "Elleven Tecnologia",
    startDate: "2021-01",
    endDate: "2021-10",
    location: "Vitória da Conquista, BA, Brazil",
    technologies: ["PHP", "CodeIgniter", "JavaScript"],
    content: {
      en: {
        role: "Junior Software Developer",
        overview:
          "Technology company specializing in intelligent software solutions for the transportation and mobility sector. I contributed to the development and evolution of software solutions tailored to the industry's needs, working on features, improvements and system maintenance to support business operations and processes.",
        responsibilities: [
          "Developed systems using PHP, CodeIgniter and JavaScript.",
        ],
      },
      "pt-BR": {
        role: "Desenvolvedor de Software Júnior",
        overview:
          "Empresa de tecnologia especializada no desenvolvimento de sistemas inteligentes para o setor de transporte e mobilidade. Atuei no desenvolvimento e evolução de soluções de software voltadas às necessidades do setor, contribuindo para funcionalidades, melhorias e manutenção de sistemas que apoiam operações e processos de negócio.",
        responsibilities: [
          "Desenvolvimento de sistemas utilizando PHP, CodeIgniter e JavaScript.",
        ],
      },
    },
  },
  {
    id: "vitoria-da-conquista-city-hall",
    company: "PMVC",
    startDate: "2020-01",
    endDate: "2021-01",
    location: "Vitória da Conquista, BA, Brazil",
    technologies: ["PHP", "CodeIgniter", "JavaScript", "Node.js", "Vue.js"],
    content: {
      en: {
        role: "Junior Programmer",
        overview:
          "Worked as an IT intern focused on the development and maintenance of systems used by the Municipal Government of Vitória da Conquista. Contributed to bug fixes, maintenance of existing features and application improvements, supporting the continuity and proper functioning of the systems.",
        responsibilities: [
          "Provided system support and developed software solutions.",
          "Worked with PHP, CodeIgniter, JavaScript, Vue and Node.js.",
        ],
      },
      "pt-BR": {
        role: "Programador Júnior",
        overview:
          "Atuei como estagiário de TI, com foco no desenvolvimento e na manutenção de sistemas utilizados pela Prefeitura Municipal de Vitória da Conquista. Contribuí para a correção de problemas, manutenção de funcionalidades existentes e evolução das aplicações, apoiando a continuidade e o funcionamento dos sistemas.",
        responsibilities: [
          "Suporte e desenvolvimento de sistemas.",
          "Atuação com PHP, CodeIgniter, JavaScript, Vue e Node.js.",
        ],
      },
    },
  },
];
