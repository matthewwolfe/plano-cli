import { mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { globSync } from 'glob';
import Handlebars from 'handlebars';
import { builtins } from '@pkg/helpers';
import { compileTemplate } from '@pkg/templates/compileTemplate';

import type { HelperDelegate } from 'handlebars';

interface GenerateOptions {
  copyToPath?: string;
  template: {
    path: string;
    template: string;
  };
  helpers: Record<string, HelperDelegate>;
  context: Record<string, unknown>;
}

function generate({
  copyToPath = process.cwd(),
  context = {},
  helpers = {},
  template: { path, template },
}: GenerateOptions) {
  Object.entries({ ...builtins, ...helpers }).map(([key, value]) =>
    Handlebars.registerHelper(key, value),
  );

  const templateDirectory = resolve(path, template, 'template');

  const directoryContent = globSync(`${templateDirectory}/**/*`, {
    withFileTypes: true,
    dot: true,
  });

  for (let item of directoryContent) {
    const fullpath = item.fullpath();

    const resolvedPath = Handlebars.compile(fullpath)(context).replace(
      `${templateDirectory}/`,
      '',
    );

    if (item.isDirectory()) {
      mkdirSync(resolve(copyToPath, resolvedPath));
    }

    if (item.isFile()) {
      if (!item.name.endsWith('.handlebars')) {
        copyFileSync(fullpath, resolve(copyToPath, resolvedPath));
      } else {
        const content = compileTemplate({
          context,
          helpers,
          path: fullpath,
        });

        writeFileSync(
          resolve(copyToPath, resolvedPath.replace('.handlebars', '')),
          content,
        );
      }
    }
  }
}

export { generate };
