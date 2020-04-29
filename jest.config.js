'use strict';

module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ['src/**/*.ts?(x)', '!src/tests/**/*.ts?(x)'],
};
