import { describe, expect, test } from 'vitest';
import { kebabCase } from './kebabCase';

describe('kebabCase', () => {
  test('from lowercase', () => {
    expect(kebabCase('example')).toEqual('example');
  });

  test('multiple words', () => {
    expect(kebabCase('exampleTest')).toEqual('example-test');
  });

  test('empty', () => {
    expect(kebabCase('')).toEqual('');
  });
});
