import { describe, expect, test } from 'vitest';
import { FormattedError } from './FormattedError';

describe('FormattedError', () => {
  test('single line', () => {
    expect(() => {
      throw new FormattedError(['single line']);
    }).toThrowError('single line');
  });

  test('multiple lines', () => {
    expect(() => {
      throw new FormattedError(['line 1', 'line 2']);
    }).toThrowError('line 1\nline 2');
  });
});
