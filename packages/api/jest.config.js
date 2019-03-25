module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.ts?(x)',
    '!src/**/*.test.ts?(x)',
    '!src/**/*.d.ts',
  ],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': '<rootDir>/../../node_modules/babel-jest',
    // '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': resolve(
    //   'config/jest/fileTransform.js'
    // ),
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
}
