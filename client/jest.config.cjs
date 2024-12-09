module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Simulate a browser environment
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest', // Use Babel for .js and .jsx files
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock CSS/SCSS imports
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image imports
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // Add extra matchers for assertions
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore unnecessary folders
};
