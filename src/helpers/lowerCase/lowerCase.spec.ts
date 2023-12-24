import { describe, expect, test } from 'vitest';
import { lowerCase } from './lowerCase';

describe('lowerCase', () => {
  test('from uppercase', () => {
    expect(lowerCase('EXAMPLE')).toEqual('example');
  });

  test('multiple words', () => {
    expect(lowerCase('exampleTest')).toEqual('exampletest');
  });

  test('empty', () => {
    expect(lowerCase('')).toEqual('');
  });
});
