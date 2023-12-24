import { kebabCase as lodashKebabCase } from 'lodash-es';

function kebabCase(value: string): string {
  return lodashKebabCase(value);
}

export { kebabCase };
