import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",

  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },

  testMatch: ["**/__tests__/**/*.test.ts"],
};

export default config;
