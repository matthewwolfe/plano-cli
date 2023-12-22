import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Handlebars from 'handlebars';
import { builtins } from '@pkg/helpers';

import type { HelperDelegate } from 'handlebars';
import type { TemplatePath } from '@pkg/types/template';

interface GenerateOptions {
  templatePath: TemplatePath;
  helpers: Record<string, HelperDelegate>;
  context: Record<string, unknown>;
}

Object.entries(builtins).map(([key, value]) =>
  Handlebars.registerHelper(key, value)
);

function generate({
  context = {},
  helpers = {},
  templatePath: { path, template },
}: GenerateOptions) {
  Object.entries(helpers).map(([key, value]) =>
    Handlebars.registerHelper(key, value)
  );

  const templateDirectory = resolve(path, template, 'template');

  const files = readdirSync(templateDirectory).filter((file) =>
    file.endsWith('handlebars')
  );

  files.forEach((file) => {
    const name = Handlebars.compile(file.replace('.handlebars', ''))(context);

    const content = Handlebars.compile(
      readFileSync(resolve(templateDirectory, file), 'utf-8')
    )(context);

    writeFileSync(resolve(process.cwd(), name), content);
  });
}

export { generate };
