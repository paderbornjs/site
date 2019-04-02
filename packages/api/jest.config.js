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
    '^.+\\.(gql|graphql)$': 'jest-transform-graphql',
    '^.+\\.(ts|tsx)$': '<rootDir>/../../node_modules/babel-jest',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
}
