module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(spec|test).js?(x)"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios|other_modules_to_transform)/)",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
