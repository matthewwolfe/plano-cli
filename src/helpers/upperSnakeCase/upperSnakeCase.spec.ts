import { describe, expect, test } from 'vitest';
import { upperSnakeCase } from './upperSnakeCase';

describe('upperSnakeCase', () => {
  test('from lowercase', () => {
    expect(upperSnakeCase('example')).toEqual('EXAMPLE');
  });

  test('multiple words', () => {
    expect(upperSnakeCase('exampleTest')).toEqual('EXAMPLE_TEST');
  });

  test('empty', () => {
    expect(upperSnakeCase('')).toEqual('');
  });
});
