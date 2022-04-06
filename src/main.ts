import * as core from '@actions/core';
//import { promises as fs } from 'fs';

async function run(): Promise<void> {
  try {
    core.info('starting');
    const files: string = core.getInput('files', { required: true });
    const find: string = core.getInput('find', { required: true });

    core.info(files);
    core.info(find);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
