// const nextJest = require("next/jest");
// const createJestConfig = nextJest({
//   dir: "./",
// });
// const customJestConfig = {
//   moduleDirectories: ["node_modules", "<rootDir>/"],
//   testEnvironment: "jest-environment-jsdom",
// };
// module.exports = createJestConfig(customJestConfig);
module.exports = {
  testEnvironment: "jsdom",
  transform: { "^.+\\.(js|jsx|ts|tsx)$": "babel-jest" },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testPathIgnorePatterns: ["<rootDir>/tests-playwright"],
};
