import type {
  Skill,
  SkillCategory,
  SkillCategoryId,
} from "@/shared/types/skills";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frameworks-libraries",
    skills: [
      {
        id: "react",
        name: "React",
        image: "/images/skills/react.png",
        proficiency: "advanced",
      },
      {
        id: "nextjs",
        name: "Next.js",
        image: "/images/skills/nextjs.png",
        proficiency: "advanced",
      },
      {
        id: "nodejs",
        name: "Node.js",
        image: "/images/skills/nodejs.png",
        proficiency: "advanced",
      },
      {
        id: "nestjs",
        name: "NestJS",
        image: "/images/skills/nestjs.png",
        proficiency: "intermediate",
      },
      {
        id: "spring-boot",
        name: "Spring Boot",
        image: "/images/skills/spring-boot.png",
        proficiency: "basic",
      },
      {
        id: "angular",
        name: "Angular",
        image: "/images/skills/angular.png",
        proficiency: "intermediate",
      },
      {
        id: "flutter",
        name: "Flutter",
        image: "/images/skills/flutter.png",
        proficiency: "intermediate",
      },
      {
        id: "vuejs",
        name: "Vue.js",
        image: "/images/skills/vuejs.png",
        proficiency: "advanced",
      },
      {
        id: "react-native",
        name: "React Native",
        image: "/images/skills/react-native.png",
        proficiency: "advanced",
      },
      {
        id: "expressjs",
        name: "Express.js",
        image: "/images/skills/expressjs.png",
        proficiency: "advanced",
      },
      {
        id: "tailwindcss",
        name: "Tailwind CSS",
        image: "/images/skills/tailwindcss.png",
        proficiency: "advanced",
      },
      {
        id: "styled-components",
        name: "Styled Components",
        image: "/images/skills/styled-components.png",
        proficiency: "advanced",
      },
      {
        id: "shadcn-ui",
        name: "shadcn/ui",
        image: "/images/skills/shadcn-ui.png",
        proficiency: "advanced",
      },
      {
        id: "laravel",
        name: "Laravel",
        image: "/images/skills/laravel.png",
        proficiency: "basic",
      },
    ],
  },
  {
    id: "languages-core",
    skills: [
      {
        id: "javascript",
        name: "JavaScript",
        image: "/images/skills/javascript.png",
        proficiency: "advanced",
      },
      {
        id: "typescript",
        name: "TypeScript",
        image: "/images/skills/typescript.png",
        proficiency: "advanced",
      },
      {
        id: "java",
        name: "Java",
        image: "/images/skills/java.png",
        proficiency: "advanced",
      },
      {
        id: "html5",
        name: "HTML5",
        image: "/images/skills/html5.png",
        proficiency: "advanced",
      },
      {
        id: "css3",
        name: "CSS3",
        image: "/images/skills/css3.png",
        proficiency: "advanced",
      },
      {
        id: "cpp",
        name: "C++",
        image: "/images/skills/cpp.png",
        proficiency: "intermediate",
      },
      {
        id: "php",
        name: "PHP",
        image: "/images/skills/php.png",
        proficiency: "basic",
      },
      {
        id: "sql",
        name: "SQL",
        image: "/images/skills/sql.png",
        proficiency: "advanced",
      },
    ],
  },
  {
    id: "state-management",
    skills: [
      {
        id: "zustand",
        name: "Zustand",
        image: "/images/skills/zustand.png",
        proficiency: "advanced",
      },
      {
        id: "redux",
        name: "Redux",
        image: "/images/skills/redux.png",
        proficiency: "advanced",
      },
      {
        id: "context-api",
        name: "Context API",
        image: "/images/skills/context-api.png",
        proficiency: "advanced",
      },
      {
        id: "react-query",
        name: "React Query",
        image: "/images/skills/react-query.png",
        proficiency: "advanced",
      },
      {
        id: "vuex",
        name: "Vuex",
        image: "/images/skills/vuex.png",
        proficiency: "advanced",
      },
    ],
  },
  {
    id: "apis-data-fetching",
    skills: [
      {
        id: "axios",
        name: "Axios",
        image: "/images/skills/axios.png",
        proficiency: "advanced",
      },
      {
        id: "rest-apis",
        name: "REST APIs",
        image: "/images/skills/rest-apis.png",
        proficiency: "advanced",
      },
      {
        id: "graphql",
        name: "GraphQL",
        image: "/images/skills/graphql.png",
        proficiency: "intermediate",
      },
      {
        id: "fetch-api",
        name: "Fetch API",
        image: "/images/skills/fetch-api.png",
        proficiency: "advanced",
      },
      {
        id: "postman",
        name: "Postman",
        image: "/images/skills/postman.png",
        proficiency: "advanced",
      },
      {
        id: "swagger",
        name: "Swagger",
        image: "/images/skills/swagger.png",
        proficiency: "intermediate",
      },
    ],
  },
  {
    id: "testing-quality",
    skills: [
      {
        id: "jest",
        name: "Jest",
        image: "/images/skills/jest.png",
        proficiency: "advanced",
      },
      {
        id: "cypress",
        name: "Cypress",
        image: "/images/skills/cypress.png",
        proficiency: "intermediate",
      },
      {
        id: "react-testing-library",
        name: "React Testing Library",
        image: "/images/skills/react-testing-library.png",
        proficiency: "advanced",
      },
      {
        id: "stryker",
        name: "Stryker",
        image: "/images/skills/stryker.png",
        proficiency: "intermediate",
      },
      {
        id: "unit-testing",
        name: "Unit Testing",
        image: "/images/skills/unit-testing.png",
        proficiency: "advanced",
      },
      {
        id: "integration-testing",
        name: "Integration Testing",
        image: "/images/skills/integration-testing.png",
        proficiency: "advanced",
      },
      {
        id: "eslint",
        name: "ESLint",
        image: "/images/skills/eslint.png",
        proficiency: "advanced",
      },
      {
        id: "prettier",
        name: "Prettier",
        image: "/images/skills/prettier.png",
        proficiency: "advanced",
      },
      {
        id: "e2e-testing",
        name: "E2E Testing",
        image: "/images/skills/e2e-testing.png",
        proficiency: "advanced",
      },
    ],
  },
  {
    id: "databases-infrastructure",
    skills: [
      {
        id: "postgresql",
        name: "PostgreSQL",
        image: "/images/skills/postgresql.png",
        proficiency: "advanced",
      },
      {
        id: "mongodb",
        name: "MongoDB",
        image: "/images/skills/mongodb.png",
        proficiency: "intermediate",
      },
      {
        id: "sqlite",
        name: "SQLite",
        image: "/images/skills/sqlite.png",
        proficiency: "intermediate",
      },
      {
        id: "prisma-orm",
        name: "Prisma ORM",
        image: "/images/skills/prisma-orm.png",
        proficiency: "advanced",
      },
      {
        id: "docker",
        name: "Docker",
        image: "/images/skills/docker.png",
        proficiency: "advanced",
      },
      {
        id: "docker-compose",
        name: "Docker Compose",
        image: "/images/skills/docker-compose.png",
        proficiency: "advanced",
      },
      {
        id: "mysql",
        name: "MySQL",
        image: "/images/skills/mysql.png",
        proficiency: "advanced",
      },
      {
        id: "redis",
        name: "Redis",
        image: "/images/skills/redis.png",
        proficiency: "basic",
      },
      {
        id: "typeorm",
        name: "TypeORM",
        image: "/images/skills/typeorm.png",
        proficiency: "advanced",
      },
    ],
  },
  {
    id: "methodologies-workflow",
    skills: [
      {
        id: "agile",
        name: "Agile",
        image: "/images/skills/agile.png",
        proficiency: "advanced",
      },
      {
        id: "scrum",
        name: "Scrum",
        image: "/images/skills/scrum.png",
        proficiency: "advanced",
      },
      {
        id: "kanban",
        name: "Kanban",
        image: "/images/skills/kanban.png",
        proficiency: "intermediate",
      },
      {
        id: "conventional-commits",
        name: "Conventional Commits",
        image: "/images/skills/conventional-commits.png",
        proficiency: "advanced",
      },
      {
        id: "clean-code",
        name: "Clean Code",
        image: "/images/skills/clean-code.png",
        proficiency: "advanced",
      },
      {
        id: "solid-principles",
        name: "SOLID Principles",
        image: "/images/skills/solid-principles.png",
        proficiency: "advanced",
      },
      {
        id: "code-review",
        name: "Code Review",
        image: "/images/skills/code-review.png",
        proficiency: "advanced",
      },
      {
        id: "ddd",
        name: "Domain-Driven Design (DDD)",
        image: "/images/skills/ddd.png",
        proficiency: "advanced",
      },
      {
        id: "tdd",
        name: "Test-Driven Development (TDD)",
        image: "/images/skills/tdd.png",
        proficiency: "advanced",
      },
      {
        id: "microservices",
        name: "Microservices Architecture",
        image: "/images/skills/microservices.png",
        proficiency: "advanced",
      },
      {
        id: "pull-requests",
        name: "Pull Requests",
        image: "/images/skills/pull-requests.png",
        proficiency: "advanced",
      },
    ],
  },
  {
    id: "devops-collaboration-ai",
    skills: [
      {
        id: "git",
        name: "Git",
        image: "/images/skills/git.png",
        proficiency: "advanced",
      },
      {
        id: "github",
        name: "GitHub",
        image: "/images/skills/github.png",
        proficiency: "advanced",
      },
      {
        id: "gitlab",
        name: "GitLab",
        image: "/images/skills/gitlab.png",
        proficiency: "advanced",
      },
      {
        id: "azure-devops",
        name: "Azure DevOps",
        image: "/images/skills/azure-devops.png",
        proficiency: "intermediate",
      },
      {
        id: "jenkins",
        name: "Jenkins",
        image: "/images/skills/jenkins.png",
        proficiency: "basic",
      },
      {
        id: "github-copilot",
        name: "GitHub Copilot",
        image: "/images/skills/github-copilot.png",
        proficiency: "advanced",
      },
      {
        id: "openai-codex",
        name: "OpenAI Codex",
        image: "/images/skills/openai-codex.png",
        proficiency: "advanced",
      },
      {
        id: "jira",
        name: "Jira",
        image: "/images/skills/jira.png",
        proficiency: "advanced",
      },
      {
        id: "chatgpt",
        name: "ChatGPT",
        image: "/images/skills/chatgpt.png",
        proficiency: "advanced",
      },
    ],
  },
];

export const SKILLS: Skill[] = SKILL_CATEGORIES.flatMap(
  (category) => category.skills,
);

export const SKILLS_BY_ID = Object.fromEntries(
  SKILLS.map((skill) => [skill.id, skill]),
) as Record<string, Skill>;

export const SKILL_CATEGORY_IDS: SkillCategoryId[] = SKILL_CATEGORIES.map(
  (category) => category.id,
);
