module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!dist/**',
    '!tests/**',
    '!jest.config.js',
  ],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  roots: ['<rootDir>/test/'],
  testMatch: ['<rootDir>/test/**/*.test.js?(x)'],
};
