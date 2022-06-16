import * as core from '@actions/core';
import * as exec from '@actions/exec';

export async function execCommand(commandLine: string, args?: string[]): Promise<boolean> {
    try {
        core.startGroup(`Exec Command Start`);
        await exec
            .getExecOutput(commandLine, args, {
                ignoreReturnCode: false
            })
            .then(result => {
                if (result.exitCode !== 0 && result.stderr.length > 0) {
                    core.info(result.stderr);
                    return false;
                }
                return result.exitCode === 0;
            });
    } catch (error) {
        core.info(`Exec Command Failed`);
        return false;
    }
    return true;
}

/**
 * 下载安装python tool
 * @param tool
 */
export async function installPythonTool(tool: string): Promise<boolean> {
    if (await execCommand('pip', ['install', '--upgrade', tool])) {
        core.info(`The ${tool} is installed successfully.`);
        if (await execCommand('python', ['-m', tool, '--version'])) {
            core.info(`Checking ${tool} Installation: true`);
        }
        return true;
    }

    return false;
}
