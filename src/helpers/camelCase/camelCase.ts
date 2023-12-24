import { camelCase as lodashCamelCase } from 'lodash-es';

function camelCase(value: string): string {
  return lodashCamelCase(value);
}

export { camelCase };
