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
        responsibilities: [
          "Desenvolvimento de sistemas utilizando React.js, Next.js, Vue.js e Node.js.",
          "Gerenciamento de estado com Zustand, Context API e Redux.",
          "Integração de APIs e soluções de cache com Fetch, Axios e React Query.",
          "Desenvolvimento de testes unitários, de mutação e de componentes com Jest, Cypress e Stryker.",
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
        responsibilities: [
          "Developed systems using React.js and Node.js.",
          "Applied Atomic Design principles when building user interfaces.",
        ],
      },
      "pt-BR": {
        role: "Desenvolvedor de Software Júnior",
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
    technologies: ["PHP", "CodeIgniter", "JavaScript", "Node.js", "Vue.js"],
    content: {
      en: {
        role: "Junior Software Developer",
        responsibilities: [
          "Developed systems using PHP, CodeIgniter and JavaScript.",
          "Worked with Node.js and Vue.js.",
        ],
      },
      "pt-BR": {
        role: "Desenvolvedor de Software Júnior",
        responsibilities: [
          "Desenvolvimento de sistemas utilizando PHP, CodeIgniter e JavaScript.",
          "Atuação com Node.js e Vue.js.",
        ],
      },
    },
  },
  {
    id: "vitoria-da-conquista-city-hall",
    company: "Prefeitura Municipal de Vitória da Conquista",
    startDate: "2020-01",
    endDate: "2021-01",
    location: "Vitória da Conquista, BA, Brazil",
    technologies: ["PHP", "CodeIgniter", "JavaScript", "Node.js"],
    content: {
      en: {
        role: "Junior Programmer",
        responsibilities: [
          "Provided system support and developed software solutions.",
          "Worked with PHP, CodeIgniter, JavaScript and Node.js.",
        ],
      },
      "pt-BR": {
        role: "Programador Júnior",
        responsibilities: [
          "Suporte e desenvolvimento de sistemas.",
          "Atuação com PHP, CodeIgniter, JavaScript e Node.js.",
        ],
      },
    },
  },
  {
    id: "tv-sudoeste",
    company: "TV Sudoeste",
    startDate: "2016-01",
    endDate: "2017-01",
    location: "Vitória da Conquista, BA, Brazil",
    technologies: [],
    content: {
      en: {
        role: "IT Intern",
        responsibilities: [
          "Provided system support.",
          "Performed backups and network management.",
          "Handled customer support and computer maintenance.",
        ],
      },
      "pt-BR": {
        role: "Estagiário de TI",
        responsibilities: [
          "Suporte a sistemas.",
          "Realização de backups e gerenciamento de rede.",
          "Atendimento ao cliente e manutenção de computadores.",
        ],
      },
    },
  },
  {
    id: "comagro",
    company: "Comagro Peças e Serviços",
    startDate: "2014-01",
    endDate: "2015-12",
    location: "Vitória da Conquista, BA, Brazil",
    technologies: ["ERP Seculos", "Computer Maintenance", "Network Support"],
    content: {
      en: {
        role: "Computer Technician",
        responsibilities: [
          "Performed computer and network maintenance.",
          "Provided support for the Seculos ERP system.",
          "Provided user support and installed computer networks.",
        ],
      },
      "pt-BR": {
        role: "Técnico de Computador",
        responsibilities: [
          "Manutenção de redes e computadores.",
          "Suporte ao ERP Seculos.",
          "Suporte ao usuário e instalação de redes.",
        ],
      },
    },
  },
  {
    id: "ifba-computer-technician",
    company: "IFBA",
    startDate: "2011-01",
    endDate: "2012-12",
    location: "Vitória da Conquista, BA, Brazil",
    technologies: [],
    content: {
      en: {
        role: "Computer Technician",
        responsibilities: [
          "Set up computer laboratories.",
          "Performed computer maintenance and user support.",
          "Worked on network installation projects.",
        ],
      },
      "pt-BR": {
        role: "Técnico de Computador",
        responsibilities: [
          "Montagem de laboratórios de informática.",
          "Manutenção de computadores e suporte ao usuário.",
          "Participação em projetos de instalação de redes.",
        ],
      },
    },
  },
];
