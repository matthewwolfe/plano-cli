#!/usr/bin/env node

import { Command } from 'commander';
import { z } from 'zod';
import { generate } from '@pkg/templates/generate';
import { getTemplate } from '@pkg/templates/getTemplate';
import { getAllPaths } from '@pkg/templates/getAllPaths';
import { VERSION } from '@pkg/__generated__/version';
import { promptForContext } from '@pkg/context/promptForContext';
import { promptForTemplate } from '@pkg/templates/promptForTemplate';

const program = new Command();

program
  .name('plano')
  .description('CLI to scaffold files and directories from templates')
  .version(VERSION, '-v, --version');

program
  .command('generate')
  .description('Generate files or directories from a template')
  .argument('[name]', 'template name')
  .option(
    '-p, --paths <path...>',
    'Paths to templates, must be directory named "plano-templates"',
    []
  )
  .action(async (nameArg, optionsArgs) => {
    try {
      let name = z.optional(z.string()).parse(nameArg);

      const { paths } = z
        .object({
          paths: z.array(z.string()),
        })
        .parse(optionsArgs);

      // If no name is specified as the argument, prompt for a template with an inquirer list
      if (name === undefined) {
        name = await promptForTemplate(paths);
      }

      const template = getTemplate({ name, paths });
      const { context, helpers = {} } = await promptForContext({ template });

      generate({
        context,
        helpers,
        template,
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  });

program.parse();
