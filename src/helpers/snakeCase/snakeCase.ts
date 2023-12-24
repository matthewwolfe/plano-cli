import { snakeCase as lodashSnakeCase } from 'lodash-es';

function snakeCase(value: string): string {
  return lodashSnakeCase(value);
}

export { snakeCase };
