module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots:['<rootDir>/src/tests'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters:['text', 'lcov'],
};