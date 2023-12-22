import { camelCase, upperFirst } from 'lodash-es';

function pascalCase(value: string): string {
  return upperFirst(camelCase(value));
}

export { pascalCase };
