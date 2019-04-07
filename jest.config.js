module.exports = {
  projects: ['<rootDir>/packages/api', '<rootDir>/packages/client'],
  watchPlugins: [
    'jest-watch-select-projects',
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
