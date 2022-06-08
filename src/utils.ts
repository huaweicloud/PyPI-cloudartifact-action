import * as core from '@actions/core';
import * as context from './context';

/**
 * 检查每个inputs 属性value是否合法
 * @param inputs
 * @returns
 */
export function checkInputs(inputs: context.Inputs): boolean {
    // repository参数以`https://` 或 `http://开头
    if (inputs.repository) {
        const repositoryReg = new RegExp(/^https:\/\/.+|^http:\/\/.+/);
        if (!repositoryReg.test(inputs.repository)) {
            core.info('repository is not correct.It must start with `https://` or `http://`');
            return false;
        }
    }

    if (inputs.password && !inputs.username) {
        core.info('repository is not correct.It must start with `https://` or `http://`');
        return false;
    }
    
  return true;
}