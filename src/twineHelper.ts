import * as core from '@actions/core';
import * as exec from '@actions/exec';

export async function isTwineAvailable(): Promise<boolean> {
    return await exec
      .getExecOutput('twine', ['--version'], {
        ignoreReturnCode: true,
        silent: true
      })
      .then(res => {
        if (res.stderr.length > 0 && res.exitCode != 0) {
            core.info('twine is not installed.')
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