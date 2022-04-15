import { IReplacements } from './main';

export function replaceInstances(
  findData: IReplacements,
  content: string,
  prefix: string,
  suffix: string
): string {
  for (const pair of findData) {
    const pattern =
      prefix +
      // escape the find pattern
      // eslint-disable-next-line no-useless-escape
      pair.find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') +
      suffix;

    content = content.replace(new RegExp(pattern, 'g'), `$1${pair.replace}$2`);
  }
  return content;
}
