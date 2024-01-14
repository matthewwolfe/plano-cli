import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import inquirer from 'inquirer';
import { describe, expect, test, vi } from 'vitest';
import { promptForContext } from './promptForContext';

vi.mock('node:fs');
vi.mock('node:path');
vi.mock('inquirer');

const mockedExistsSync = vi.mocked(existsSync);
const mockedResolve = vi.mocked(resolve);
const mockedInquirer = vi.mocked(inquirer);

mockedResolve.mockImplementation((...paths: string[]) => paths.join('/'));

describe('promptForContext', () => {
  test('returns empty values when unable to find file', async () => {
    mockedExistsSync.mockReturnValue(false);

    const result = await promptForContext({
      template: { path: 'doesnt-exist', template: 'mock-template' },
    });

    expect(result).toEqual({
      context: {},
      helpers: {},
    });
  });

  test('throws when prompts does not pass validation', async () => {
    mockedExistsSync.mockReturnValue(true);

    vi.mock('invalid-prompts/mock-template/context.mjs', () => ({
      prompts: 5,
      helpers: undefined,
    }));

    expect(() =>
      promptForContext({
        template: { path: 'invalid-prompts', template: 'mock-template' },
      }),
    ).rejects.toThrowError();
  });

  test('throws when helpers does not pass validation', async () => {
    mockedExistsSync.mockReturnValue(true);

    vi.mock('invalid-helpers/mock-template/context.mjs', () => ({
      prompts: undefined,
      helpers: 5,
    }));

    expect(() =>
      promptForContext({
        template: { path: 'invalid-helpers', template: 'mock-template' },
      }),
    ).rejects.toThrowError();
  });

  test('does not throw when prompts and helpers are undefined', async () => {
    mockedExistsSync.mockReturnValue(true);

    vi.mock('valid-undefined/mock-template/context.mjs', () => ({
      prompts: undefined,
      helpers: undefined,
    }));

    const result = await promptForContext({
      template: { path: 'valid-undefined', template: 'mock-template' },
    });

    expect(result).toEqual({
      context: {},
      helpers: {},
    });
  });
});
