'use strict';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/__tests__/**/*.ts',
    '!src/**/*.test.ts',
  ],
};
