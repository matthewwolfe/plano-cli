import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';
import { uniq } from 'lodash-es';
import { z } from 'zod';
import { FormattedError } from '@pkg/errors';
import { getTemplatesPaths } from '@pkg/filesystem/getTemplatesPaths';
import { generate } from '@pkg/templates/generate';
import { getContext } from '@pkg/context/getContext';

const program = new Command();

program
  .name('plano')
  .description('CLI to scaffold files and directories from templates')
  .version('0.0.1');

program
  .command('generate')
  .description('Generate files or directories from a template')
  .argument('<name>', 'template name')
  .option(
    '-p, --templates-paths <path...>',
    'Paths to templates, must be directory named "plano-templates"',
    []
  )
  .action(async (nameArg, optionsArgs) => {
    try {
      const name = z.string().parse(nameArg);

      const options = z
        .object({
          templatesPaths: z.array(z.string()),
        })
        .parse(optionsArgs);

      const templatesPaths = getTemplatesPaths(options.templatesPaths);

      const template = templatesPaths.find(
        (templates) => templates.template === name
      );

      if (!template) {
        throw new FormattedError([
          chalk.red(`Unable to find template "${name}" at paths:`),
          ...uniq(templatesPaths.map((templatesPath) => templatesPath.path)),
        ]);
      }

      const { context, helpers = {} } = await getContext(
        `${template.path}/${name}`
      );

      const answers = await inquirer.prompt<Record<string, unknown>>(context);

      generate({
        context: answers,
        helpers,
        templatePath: template,
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  });

program.parse();
