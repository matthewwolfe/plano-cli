import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { globSync } from 'glob';
import Handlebars from 'handlebars';
import { builtins } from '@pkg/helpers';

import type { HelperDelegate } from 'handlebars';
import { FormattedError } from '@pkg/errors';

interface GenerateOptions {
  template: {
    path: string;
    template: string;
  };
  helpers: Record<string, HelperDelegate>;
  context: Record<string, unknown>;
}

Object.entries(builtins).map(([key, value]) =>
  Handlebars.registerHelper(key, value)
);

function generate({
  context = {},
  helpers = {},
  template: { path, template },
}: GenerateOptions) {
  Object.entries(helpers).map(([key, value]) =>
    Handlebars.registerHelper(key, value)
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
      ''
    );

    if (item.isDirectory()) {
      mkdirSync(resolve(process.cwd(), resolvedPath));
    }

    if (item.isFile()) {
      const content = Handlebars.compile(
        readFileSync(item.fullpath(), 'utf-8')
      )(context);

      writeFileSync(
        resolve(process.cwd(), resolvedPath.replace('.handlebars', '')),
        content
      );
    }
  }
}

export { generate };
