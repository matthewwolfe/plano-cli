import { readFileSync } from 'node:fs';
import Handlebars from 'handlebars';

interface CompileTemplate {
  context?: Record<string, unknown>;
  path: string;
}

function compileTemplate({ context = {}, path }: CompileTemplate) {
  return Handlebars.compile(readFileSync(path, 'utf-8'))(context);
}

export { compileTemplate };
