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

    // Handle when prefix and/or suffix are empty
    if (prefix !== '' && suffix !== '') {
      content = content.replace(
        new RegExp(pattern, 'g'),
        `$1${pair.replace}$2`
      );
    }
    if (prefix === '' && suffix !== '') {
      content = content.replace(new RegExp(pattern, 'g'), `${pair.replace}$1`);
    }
    if (prefix !== '' && suffix === '') {
      content = content.replace(new RegExp(pattern, 'g'), `$1${pair.replace}`);
    }
    if (prefix === '' && suffix === '') {
      content = content.replace(new RegExp(pattern, 'g'), pair.replace);
    }
  }
  return content;
}
