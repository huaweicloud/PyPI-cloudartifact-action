import * as core from '@actions/core';
import * as context from './context';

const INDEX_SERVER_REG = new RegExp(/^[a-zA-Z0-9-\_]{2,100}$/);

/**
 * 检查每个inputs 属性value是否合法
 * @param inputs
 * @returns
 */
export function checkInputs(inputs: context.Inputs): boolean {
    if (inputs.pypiOperationType === 'install') {
        return checkInstallInput(inputs);
    }

    if (inputs.pypiOperationType === 'upload') {
        return checkUploadInput(inputs);
    }

    core.setFailed('The pypi-operation-type value can only be install or upload');
    return false;
}

/**
 * pypiOperationType为install时，检查参数是否合法
 * @param inputs
 * @returns boolean
 */
export function checkInstallInput(inputs: context.Inputs): boolean {
    if (!checkRepositoryUrl(inputs.indexUrl)) {
        core.setFailed('index-url is not correct.It must start with `https://` or `http://`');
        return false;
    }
    if (inputs.indexUrl && inputs.trustedHost) {
        if (!inputs.indexUrl.includes(inputs.trustedHost)) {
            return false;
        }
    }
    return true;
}

/**
 * pypiOperationType为upload时，检查参数是否合法
 * @param inputs
 * @returns boolean
 */
export function checkUploadInput(inputs: context.Inputs): boolean {
    if (!checkRepositoryUrl(inputs.repository)) {
        core.setFailed('repository is not correct.It must start with `https://` or `http://`');
        return false;
    }
    if (!checkAccountInfo(inputs)) {
        return false;
    }
    if (!checkIndexServer(inputs.indexServer)) {
        core.setFailed('index-server is not correct.');
        return false;
    }
    return true;
}

/**
 * repository参数以`https://` 或 `http://开头
 * @param repositoryUrl
 * @returns boolean
 */
export function checkRepositoryUrl(repositoryUrl: string): boolean {
    if (repositoryUrl) {
        const repositoryReg = new RegExp(/^https:\/\/.+|^http:\/\/.+/);
        if (!repositoryReg.test(repositoryUrl)) {
            core.info('repository url is not correct.It must start with `https://` or `http://`');
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
    if ((inputs.password && inputs.username) || (!inputs.password && !inputs.username)) {
        return true;
    }
    core.info('Both username and password exist.');
    return false;
}

/**
 * action页面返回用户上传下载使用命名提示
 * @param inputs
 * @returns string
 */
export function getPypiTips(inputs: context.Inputs): string {
    return inputs.pypiOperationType === 'upload'
        ? `Run the following command to publish the Python package to the PyPI repository: twine upload -r ${inputs.indexServer} dist/*`
        : 'Run the following command to install the PyPI package: pip install <PyPI name>';
}

/**
 * 检查region是否合法
 * @returns
 */
 export function checkIndexServer(indexServer: string): boolean {
     if (indexServer) {
        return INDEX_SERVER_REG.test(indexServer);
     }
    return true;
}
