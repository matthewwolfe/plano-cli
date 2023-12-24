import { describe, expect, test } from 'vitest';
import { upperCase } from './upperCase';

describe('upperCase', () => {
  test('from lowercase', () => {
    expect(upperCase('example')).toEqual('EXAMPLE');
  });

  test('multiple words', () => {
    expect(upperCase('exampleTest')).toEqual('EXAMPLETEST');
  });

  test('empty', () => {
    expect(upperCase('')).toEqual('');
  });
});
