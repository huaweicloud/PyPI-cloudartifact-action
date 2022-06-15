import * as core from '@actions/core';
import * as exec from '@actions/exec';

export async function execCommand(commandLine: string, args?: string[]): Promise<boolean> {
    await exec.exec(commandLine, args);
    core.info('exec command successfully.')
    return true;
}

/**
 * 下载安装python tool
 * @param tool 
 */
export async function installPythonTool(tool: string): Promise<boolean>{
    if (await execCommand('pip', ['install', '--upgrade', tool])) {
        core.info(`The ${tool} is installed successfully.`);
    }
    if (await execCommand('python', ['-m', tool, '--version'])) {
        core.info(`Checking ${tool} Installation: true`);
    }
    return true;
}
