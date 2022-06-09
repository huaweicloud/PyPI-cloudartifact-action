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
            core.info(`${commandLine} is not installed.`)
            return false;
        }
        return res.exitCode == 0;
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(error => {
            return false;
      });
  }

  /**
   * 下载安装twine
   */
  export async function installTwine() {
    if (!await isAvailable('twine', ['--version'])) {
        try {
            await exec.exec('pip', ['install', 'twine']);
        } catch (error) {
            console.log(error);
            core.setFailed('intsall twine failed');
        }
    }
  }
