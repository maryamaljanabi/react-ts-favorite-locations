module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>/src"],
  testRegex: ".*\\.(test|spec)\\.(tsx|ts)$",
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.(jpg|ico|jpeg|png|svg)$": "<rootDir>/fileMock.js",
    "^.+\\.(css|scss|less)$": "<rootDir>/fileMock.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(ol)/)", // <- exclude the OL lib
  ],
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "jsdom",
  verbose: true,
};
