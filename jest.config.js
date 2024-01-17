/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  moduleNameMapper: {
    '^@src/(.*)$': ['<rootDir>/src/$1'],
    '^@db/(.*)$': ['<rootDir>/db/$1'],
    '^@controllers/(.*)$': ['<rootDir>/src/controllers/$1'],
    '^@services/(.*)$': ['<rootDir>/src/services/$1'],
    '^@routes/(.*)$': ['<rootDir>/src/routes/$1'],
    '^@middlewares/(.*)$': ['<rootDir>/src/middlewares/$1'],
    '^@schemas/(.*)$': ['<rootDir>/src/schemas/$1'],
    '^@constants/(.*)$': ['<rootDir>/src/constants/$1'],
    '^@utils/(.*)$': ['<rootDir>/src/utils/$1'],
  },
};
