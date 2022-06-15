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
exports.TOOLS_ARRAY = exports.DEFAULT_REGISTRY = exports.getInputs = void 0;
const core = __importStar(require("@actions/core"));
function getInputs() {
    return {
        pypiOperationType: core.getInput('pypi-operation-type', { required: true }),
        indexUrl: core.getInput('index-url', { required: false }),
        trustedHost: core.getInput('trusted-host', { required: false }),
        repository: core.getInput('repository', { required: false }),
        username: core.getInput('username', { required: false }),
        password: core.getInput('password', { required: false }),
        indexServer: core.getInput('index-server', { required: false }),
        tools: core.getInput('tools', { required: false })
    };
}
exports.getInputs = getInputs;
exports.DEFAULT_REGISTRY = 'https://pypi.org/simple';
/**
 * 目前支持安装的python依赖工具：
 * twine: Python打包上传工具
 * build: Python构建工具
 * setuptools: Python构建工具
 * wheel: Python构建工具
 */
exports.TOOLS_ARRAY = [
    'twine',
    'build',
    'setuptools',
    'wheel'
];
//# sourceMappingURL=context.js.map