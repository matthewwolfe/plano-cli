import { readFileSync } from 'node:fs';
import Handlebars from 'handlebars';

import type { HelperDelegate } from 'handlebars';

interface CompileTemplate {
  context?: Record<string, unknown>;
  helpers?: Record<string, HelperDelegate>;
  path: string;
}

function compileTemplate({
  context = {},
  helpers = {},
  path,
}: CompileTemplate) {
  return Handlebars.compile(readFileSync(path, 'utf-8'))(context);
}

export { compileTemplate };
