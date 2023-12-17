import * as core from '@actions/core';
import { promises as fs } from 'fs';
import { replaceInstances } from './replaceInstances';
import { glob } from 'glob';

export type IReplacements = {
  find: string;
  replace: string;
}[];

async function run(): Promise<void> {
  try {
    core.info('starting');
    const files: string = core.getInput('files', { required: true });
    const find: string = core.getInput('find', { required: true });

    const encoding: BufferEncoding = core.getInput(
      'encoding'
    ) as BufferEncoding;

    const prefix: string = core.getInput('prefix');
    const suffix: string = core.getInput('suffix');

    const findData: IReplacements = JSON.parse(find);

    // options is optional
    const matchedFiles = await glob(files, {});

    for (const file of matchedFiles) {
      const originalContent = await fs.readFile(file, encoding);
      let content = originalContent;

      content = replaceInstances(findData, content, prefix, suffix);

      if (originalContent !== content) {
        await fs.writeFile(file, content, encoding);
        core.info(`Updating ${file}`);
      }
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
