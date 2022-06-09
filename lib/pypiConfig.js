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
exports.generatePypirc = exports.writePypirc = exports.getPypircPath = exports.getPypricContents = void 0;
const context = __importStar(require("./context"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
function getPypricContents(inputs) {
    const distutilsIndexServer = inputs.distutilsIndexServer
        ? `${inputs.distutilsIndexServer}`
        : `pypi`;
    const repository = inputs.repository ? `${inputs.repository}` : `${context.DEFAULT_REGISTRY}`;
    const distutilsIndexServerContents = `[distutils]\nindex-servers=${distutilsIndexServer}\n`;
    const repositoryContents = `repository = ${repository}\n`;
    const usernameContents = inputs.username ? `username = ${inputs.username}\n` : ``;
    const passwordContents = inputs.password ? `password = ${inputs.password}\n` : ``;
    const pypricContents = `${distutilsIndexServerContents}\n[${distutilsIndexServer}]\n${repositoryContents}${usernameContents}${passwordContents}`;
    return pypricContents;
}
exports.getPypricContents = getPypricContents;
function getPypircPath() {
    return path.join(os.homedir(), '.pypirc');
}
exports.getPypircPath = getPypircPath;
/**
 * pypirc配置写入~/.pypirc
 * @param pypircPath
 * @param pypircContent
 */
function writePypirc(pypircPath, pypircContent) {
    fs.writeFileSync(pypircPath, pypircContent);
}
exports.writePypirc = writePypirc;
/**
 * 根据用户输入生成pypirc配置并写入~/.pypirc
 * @param inputs
 */
function generatePypirc(inputs) {
    writePypirc(getPypircPath(), getPypricContents(inputs));
}
exports.generatePypirc = generatePypirc;
//# sourceMappingURL=pypiConfig.js.map