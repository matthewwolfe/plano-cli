#!/usr/bin/env node

import { Command } from 'commander';
import { z } from 'zod';
import { generate } from '@pkg/templates/generate';
import { getTemplate } from '@pkg/templates/getTemplate';
import { VERSION } from '@pkg/__generated__/version';
import { promptForContext } from '@pkg/context/promptForContext';
import { compileTemplate } from '@pkg/templates/compileTemplate';
import { promptForTemplate } from '@pkg/templates/promptForTemplate';
import { getContextPrompts } from '@pkg/context/getContextPrompts';

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
    'Paths to templates, must be directory named "plano"',
    [],
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
        name = await promptForTemplate({
          paths,
          type: 'file',
        });
      }

      const template = getTemplate({
        name,
        paths,
        type: 'file',
      });

      const { helpers: contextHelpers, prompts } = await getContextPrompts({
        template,
      });

      const { context, helpers } = await promptForContext({
        helpers: contextHelpers,
        prompts,
      });

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

program
  .command('snippet')
  .description('Generate a snippet from a template')
  .argument('[name]', 'template name')
  .option(
    '-p, --paths <path...>',
    'Paths to snippets, must be directory named "plano"',
    [],
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
        name = await promptForTemplate({
          paths,
          type: 'snippet',
        });
      }

      const template = getTemplate({
        name,
        paths,
        type: 'snippet',
      });

      process.stdout.write(
        compileTemplate({
          context: {},
          path: `${template.path}/${template.template}/snippet.handlebars`,
        }),
      );
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  });

program.parse();
