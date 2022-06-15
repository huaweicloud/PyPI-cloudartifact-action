"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPypiTips = exports.checkAccountInfo = exports.checkRepositoryUrl = exports.checkUploadInput = exports.checkInstallInput = exports.checkPythonTools = exports.checkInputs = void 0;
const core = __importStar(require("@actions/core"));
const context = __importStar(require("./context"));
/**
 * 检查每个inputs 属性value是否合法
 * @param inputs
 * @returns
 */
function checkInputs(inputs) {
    if (!checkPythonTools(inputs.trustedHost)) {
        core.setFailed('The tools supports: twine,build,setuptools,wheel.');
        return false;
    }
    if (inputs.pypiOperationType === 'install') {
        return checkInstallInput(inputs);
    }
    if (inputs.pypiOperationType === 'upload') {
        return checkUploadInput(inputs);
    }
    core.setFailed('The pypi-operation-type value can only be install or upload');
    return false;
}
exports.checkInputs = checkInputs;
function checkPythonTools(tools) {
    if (tools) {
        const toolsArray = tools.split(',');
        for (let i = 0; i < toolsArray.length; i++) {
            if (!context.TOOLS_ARRAY.includes(toolsArray[i])) {
                core.setFailed('The tools supports: twine,build,setuptools,wheel.');
                return false;
            }
        }
    }
    return true;
}
exports.checkPythonTools = checkPythonTools;
/**
 * pypiOperationType为install时，检查参数是否合法
 * @param inputs
 * @returns boolean
 */
function checkInstallInput(inputs) {
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
exports.checkInstallInput = checkInstallInput;
/**
 * pypiOperationType为upload时，检查参数是否合法
 * @param inputs
 * @returns boolean
 */
function checkUploadInput(inputs) {
    if (!checkRepositoryUrl(inputs.repository)) {
        core.setFailed('repository is not correct.It must start with `https://` or `http://`');
        return false;
    }
    if (!checkAccountInfo(inputs)) {
        return false;
    }
    return true;
}
exports.checkUploadInput = checkUploadInput;
/**
 * repository参数以`https://` 或 `http://开头
 * @param repositoryUrl
 * @returns boolean
 */
function checkRepositoryUrl(repositoryUrl) {
    if (repositoryUrl) {
        const repositoryReg = new RegExp(/^https:\/\/.+|^http:\/\/.+/);
        if (!repositoryReg.test(repositoryUrl)) {
            core.info('repository url is not correct.It must start with `https://` or `http://`');
            return false;
        }
    }
    return true;
}
exports.checkRepositoryUrl = checkRepositoryUrl;
/**
 * 密码存在的时候用户名必须存在
 * @param inputs
 * @returns boolean
 */
function checkAccountInfo(inputs) {
    if ((inputs.password && inputs.username) || (!inputs.password && !inputs.username)) {
        return true;
    }
    core.info('Both username and password exist.');
    return false;
}
exports.checkAccountInfo = checkAccountInfo;
/**
 * action页面返回用户上传下载使用命名提示
 * @param inputs
 * @returns string
 */
function getPypiTips(inputs) {
    return inputs.pypiOperationType === 'upload'
        ? `Run the following command to publish the Python package to the PyPI repository: twine upload -r ${inputs.indexServer} dist/*`
        : 'Run the following command to install the PyPI package: pip install <PyPI name>';
}
exports.getPypiTips = getPypiTips;
//# sourceMappingURL=utils.js.map