import type { Config } from "jest";
/** @type {import('ts-jest').JestConfigWithTsJest} */

const config: Config = {
  testEnvironment: "node",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  preset: "ts-jest",
};

export default config;
