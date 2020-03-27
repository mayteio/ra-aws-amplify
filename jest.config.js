module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testMatch: [
    '**/src/**/__tests__/**/*.[jt]s?(x)',
    '**/src/**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  testEnvironment: 'jest-environment-jsdom-sixteen',
};
