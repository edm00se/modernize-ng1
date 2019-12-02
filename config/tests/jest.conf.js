const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.html$': '<rootDir>/config/tests/html-loader.js'
  },
  setupFiles: ['<rootDir>/config/tests/setup'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/config/tests/coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/node_modules/**',
    '!src/main.js',
    '!src/sw.js'
  ]
}
