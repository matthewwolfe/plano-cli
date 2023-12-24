import { describe, expect, test } from 'vitest';
import { snakeCase } from './snakeCase';

describe('snakeCase', () => {
  test('from lowercase', () => {
    expect(snakeCase('example')).toEqual('example');
  });

  test('multiple words', () => {
    expect(snakeCase('exampleTest')).toEqual('example_test');
  });

  test('empty', () => {
    expect(snakeCase('')).toEqual('');
  });
});
