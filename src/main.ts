import * as core from '@actions/core';
import * as context from './context';

export async function run() {
  core.info('Generate configurations for PyPI');
  const inputs: context.Inputs = context.getInputs();

}

run().catch(core.setFailed);
