import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { globSync } from 'glob';
import Handlebars from 'handlebars';
import { FormattedError } from '@pkg/errors';
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
  });

  directoryContent.forEach((item) => {
    if (item.isFile() && !item.name.endsWith('.handlebars')) {
      throw new FormattedError([
        'Template files must end with .handlebars:',
        item.fullpath(),
      ]);
    }
  });

  for (let item of directoryContent) {
    const resolvedPath = Handlebars.compile(item.fullpath())(context).replace(
      `${templateDirectory}/`,
      '',
    );

    if (item.isDirectory()) {
      mkdirSync(resolve(copyToPath, resolvedPath));
    }

    if (item.isFile()) {
      const content = compileTemplate({
        context,
        helpers,
        path: item.fullpath(),
      });

      writeFileSync(
        resolve(copyToPath, resolvedPath.replace('.handlebars', '')),
        content,
      );
    }
  }
}

export { generate };
