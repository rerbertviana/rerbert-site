import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",

  roots: ["<rootDir>/src/tests"],

  testMatch: ["**/*.test.ts", "**/*.test.tsx"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/src/tests/setup/jest.setup.ts"],

  clearMocks: true,
};

export default createJestConfig(customJestConfig);
