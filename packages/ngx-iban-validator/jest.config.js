module.exports = {
  transform: { "^.+\\.ts$": "ts-jest" },
  testEnvironment: "node",
  testRegex: "/__tests__/.*\\.spec\\.ts$",
  moduleFileExtensions: ["ts", "js", "json"],
  // Source files import siblings with a .js extension (required for Node ESM); map them back to the .ts files
  moduleNameMapper: { "^(\\.{1,2}/.*)\\.js$": "$1" },
};
