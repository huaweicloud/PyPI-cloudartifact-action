import * as context from './context';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export function getPypricContents(inputs: context.Inputs) {
    const distutilsIndexServer = inputs.indexServer ? `${inputs.indexServer}` : `pypi`;
    const repository = inputs.repository ? `${inputs.repository}` : `${context.DEFAULT_REGISTRY}`;
    const distutilsIndexServerContents = `[distutils]\nindex-servers=${distutilsIndexServer}\n`;
    const repositoryContents = `repository = ${repository}\n`;
    const usernameContents = inputs.username ? `username = ${inputs.username}\n` : ``;
    const passwordContents = inputs.password ? `password = ${inputs.password}\n` : ``;
    const pypricContents = `${distutilsIndexServerContents}\n[${distutilsIndexServer}]\n${repositoryContents}${usernameContents}${passwordContents}`;
    return pypricContents;
}

export function getPypircPath() {
    return path.join(os.homedir(), '.pypirc');
}

/**
 * pypirc配置写入~/.pypirc
 * @param pypircPath
 * @param pypircContent
 */
export function writePypirc(pypircPath: string, pypircContent: string) {
    fs.writeFileSync(pypircPath, pypircContent);
}

/**
 * 根据用户输入生成pypirc配置并写入~/.pypirc
 * @param inputs
 */
export function generatePypirc(inputs: context.Inputs) {
    writePypirc(getPypircPath(), getPypricContents(inputs));
}
