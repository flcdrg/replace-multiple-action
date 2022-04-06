import * as core from '@actions/core';
import glob from 'glob';
import { promises as fs } from 'fs';

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

    core.info(files);
    core.info(find);

    const findData: IReplacements = JSON.parse(find);

    // options is optional
    glob('**/*.md', {}, async (er, matchedFiles) => {
      for (const file of matchedFiles) {
        const originalContent = await fs.readFile(file, encoding);
        let content = originalContent;

        for (const pair of findData) {
          content = content.replace(pair.find, pair.replace);
        }

        if (originalContent !== content) {
          await fs.writeFile(file, content, encoding);
          core.info(`Updating ${file}`);
        }
      }
    });
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
