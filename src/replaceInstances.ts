import { IReplacements } from './main';

export function replaceInstances(
  findData: IReplacements,
  content: string,
  prefix: string,
  suffix: string
): string {
  for (const pair of findData) {
    const escapedFind = pair.find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    let pattern: string;
    let regex: RegExp;
    let replacement: string;

    // Try to use lookbehind/lookahead if supported
    try {
      if (prefix !== '' && suffix !== '') {
        pattern = `(?<=${prefix})${escapedFind}(?=${suffix})`;
        regex = new RegExp(pattern, 'g');
        replacement = pair.replace;
      } else if (prefix === '' && suffix !== '') {
        pattern = `${escapedFind}(?=${suffix})`;
        regex = new RegExp(pattern, 'g');
        replacement = pair.replace;
      } else if (prefix !== '' && suffix === '') {
        pattern = `(?<=${prefix})${escapedFind}`;
        regex = new RegExp(pattern, 'g');
        replacement = pair.replace;
      } else {
        pattern = `${escapedFind}`;
        regex = new RegExp(pattern, 'g');
        replacement = pair.replace;
      }
      content = content.replace(regex, replacement);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      // Fallback for environments without lookbehind support
      if (prefix !== '' && suffix !== '') {
        pattern = `(${prefix})${escapedFind}(${suffix})`;
        regex = new RegExp(pattern, 'g');
        replacement = `$1${pair.replace}$2`;
      } else if (prefix === '' && suffix !== '') {
        pattern = `${escapedFind}(${suffix})`;
        regex = new RegExp(pattern, 'g');
        replacement = `${pair.replace}$1`;
      } else if (prefix !== '' && suffix === '') {
        pattern = `(${prefix})${escapedFind}`;
        regex = new RegExp(pattern, 'g');
        replacement = `$1${pair.replace}`;
      } else {
        pattern = `${escapedFind}`;
        regex = new RegExp(pattern, 'g');
        replacement = pair.replace;
      }
      content = content.replace(regex, replacement);
    }
  }
  return content;
}
