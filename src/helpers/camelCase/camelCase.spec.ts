import { describe, expect, test } from 'vitest';
import { camelCase } from './camelCase';

describe('camelCase', () => {
  test('from lowercase', () => {
    expect(camelCase('example')).toEqual('example');
  });

  test('multiple words', () => {
    expect(camelCase('exampleTest')).toEqual('exampleTest');
  });

  test('empty', () => {
    expect(camelCase('')).toEqual('');
  });
});
