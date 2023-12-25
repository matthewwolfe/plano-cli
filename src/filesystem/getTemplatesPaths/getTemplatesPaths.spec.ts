import { describe, expect, test, vi } from 'vitest';
import { existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import { getTemplatesPaths } from './getTemplatesPaths';

import type { Dirent } from 'node:fs';

vi.mock('node:fs');
vi.mock('node:os');
vi.mock('node:path');

const mockedExistsSync = vi.mocked(existsSync);
const mockedReaddirSync = vi.mocked(readdirSync);
const mockedHomedir = vi.mocked(homedir);
const mockedResolve = vi.mocked(resolve);

mockedExistsSync.mockReturnValue(true);
mockedHomedir.mockReturnValue('mock-home-dir');
mockedResolve.mockImplementation((path) => path);

describe('getTemplatesPaths', () => {
  mockedReaddirSync.mockReturnValue([
    { isDirectory: () => true, name: 'mock-template-1' } as Dirent,
  ]);

  test('home directory when no path provided', () => {
    const result = getTemplatesPaths([]);

    expect(result).toEqual([
      {
        path: 'mock-home-dir/plano-templates',
        template: 'mock-template-1',
      },
    ]);
  });

  test('home directory and provided path', () => {
    const result = getTemplatesPaths(['./example/plano-templates']);

    expect(result).toEqual([
      {
        path: 'mock-home-dir/plano-templates',
        template: 'mock-template-1',
      },
      {
        path: './example/plano-templates',
        template: 'mock-template-1',
      },
    ]);
  });
});
