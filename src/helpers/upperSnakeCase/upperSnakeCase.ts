import { snakeCase as lodashSnakeCase } from 'lodash-es';

function upperSnakeCase(value: string): string {
  return lodashSnakeCase(value).toUpperCase();
}

export { upperSnakeCase };
