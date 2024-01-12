import { readFileSync } from "node:fs";
import Handlebars from "handlebars";

interface CompileTemplate {
  context?: Record<string, unknown>;
  options?:
    | {
        encoding: BufferEncoding;
        flag?: string | undefined;
      }
    | BufferEncoding;
  path: string;
}

const compileTemplate = ({
  context = {},
  options = "utf-8",
  path,
}: CompileTemplate) => {
  return Handlebars.compile(readFileSync(path, options))(context);
};

export default compileTemplate;
