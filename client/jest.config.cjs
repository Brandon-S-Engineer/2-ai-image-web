module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Simulate a browser environment
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest', // Use Babel for .js and .jsx files
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS/SCSS imports
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image imports
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.js', '@testing-library/jest-dom'], // Add global setup and matchers
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore unnecessary folders
};
