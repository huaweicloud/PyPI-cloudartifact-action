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
exports.getPypiTips = exports.checkAccountInfo = exports.checkRepository = exports.checkInputs = void 0;
const core = __importStar(require("@actions/core"));
/**
 * 检查每个inputs 属性value是否合法
 * @param inputs
 * @returns
 */
function checkInputs(inputs) {
    return checkRepository(inputs.repository) && checkAccountInfo(inputs);
}
exports.checkInputs = checkInputs;
/**
 * repository参数以`https://` 或 `http://开头
 * @param repository
 * @returns boolean
 */
function checkRepository(repository) {
    if (repository) {
        const repositoryReg = new RegExp(/^https:\/\/.+|^http:\/\/.+/);
        if (!repositoryReg.test(repository)) {
            core.info('repository is not correct.It must start with `https://` or `http://`');
            return false;
        }
    }
    return true;
}
exports.checkRepository = checkRepository;
/**
 * 密码存在的时候用户名必须存在
 * @param inputs
 * @returns boolean
 */
function checkAccountInfo(inputs) {
    if (inputs.password && !inputs.username) {
        core.info('The username must exist when the password exists.');
        return false;
    }
    return true;
}
exports.checkAccountInfo = checkAccountInfo;
/**
 * action页面返回用户上传下载使用命名提示
 * @param inputs
 * @returns string
 */
function getPypiTips(inputs) {
    return `Run the following command to publish the Python package to the PyPI repository: twine upload -r ${inputs.distutilsIndexServer} dist/*`;
}
exports.getPypiTips = getPypiTips;
//# sourceMappingURL=utils.js.map