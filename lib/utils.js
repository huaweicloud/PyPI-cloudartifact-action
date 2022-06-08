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
exports.checkInputs = void 0;
const core = __importStar(require("@actions/core"));
/**
 * 检查每个inputs 属性value是否合法
 * @param inputs
 * @returns
 */
function checkInputs(inputs) {
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
exports.checkInputs = checkInputs;
//# sourceMappingURL=utils.js.map