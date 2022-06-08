import * as core from '@actions/core';
import * as context from './context';

/**
 * 检查每个inputs 属性value是否合法
 * @param inputs
 * @returns
 */
export function checkInputs(inputs: context.Inputs): boolean {
    return checkRepository(inputs.repository) && checkAccountInfo(inputs);
}

/**
 * repository参数以`https://` 或 `http://开头
 * @param repository
 * @returns boolean
 */
export function checkRepository(repository: string): boolean {
    if (repository) {
        const repositoryReg = new RegExp(/^https:\/\/.+|^http:\/\/.+/);
        if (!repositoryReg.test(repository)) {
            core.info('repository is not correct.It must start with `https://` or `http://`');
            return false;
        }
    }
    return true;
}

/**
 * 密码存在的时候用户名必须存在
 * @param inputs
 * @returns boolean
 */
export function checkAccountInfo(inputs: context.Inputs): boolean {
    if (inputs.password && !inputs.username) {
        core.info('The username must exist when the password exists.');
        return false;
    }
    return true;
}
