import { IReplacements } from './main';

export function replaceInstances(
  findData: IReplacements,
  content: string
): string {
  for (const pair of findData) {
    const pattern =
      // eslint-disable-next-line prefer-template
      '(^|\\s+|\\()' +
      // eslint-disable-next-line no-useless-escape
      pair.find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') +
      '($|\\s+|\\))';

    content = content.replace(new RegExp(pattern, 'g'), `$1${pair.replace}$2`);
  }
  return content;
}
