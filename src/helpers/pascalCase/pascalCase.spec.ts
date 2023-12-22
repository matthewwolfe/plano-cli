import { describe, expect, test } from 'vitest';
import { pascalCase } from './pascalCase';

describe('pascalCase', () => {
  test('from lowercase', () => {
    expect(pascalCase('example')).toEqual('Example');
  });

  test('multiple words', () => {
    expect(pascalCase('exampleTest')).toEqual('ExampleTest');
  });

  test('empty', () => {
    expect(pascalCase('')).toEqual('');
  });
});
