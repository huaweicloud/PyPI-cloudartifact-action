import * as core from '@actions/core';
import * as exec from '@actions/exec';

export async function isAvailable(commandLine: string, args?: string[]): Promise<boolean> {
    return await exec
      .getExecOutput(commandLine, args, {
        ignoreReturnCode: true,
        silent: true
      })
      .then(res => {
        if (res.stderr.length > 0 && res.exitCode != 0) {
            core.info(res.stderr)
            core.info(`${commandLine} is not installed.`)
            return false;
        }
        return res.exitCode == 0;
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(error => {
            core.info(error)
            return false;
      });
  }