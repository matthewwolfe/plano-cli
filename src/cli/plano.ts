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
  .option('-p, --templates-paths <path...>', 'Paths to templates')
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

      const prompts = await getContext(`${template.path}/${name}`);
      const context = await inquirer.prompt(prompts);

      generate({
        context,
        helpers: {},
        templatePath: template,
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }

    /*
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: `Are you sure you want to use the "${name}" template`,
        },
      ])
      .then((answers) => {
        console.log(answers);
        // Use user feedback for... whatever!!
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
      */
  });

program.parse();
