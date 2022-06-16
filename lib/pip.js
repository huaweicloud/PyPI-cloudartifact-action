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
exports.generatePipConfig = exports.writePipConfig = exports.getPipPath = exports.getPipContents = void 0;
const core = __importStar(require("@actions/core"));
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function getPipContents(inputs) {
    const indexUrlContents = `index-url = ${inputs.indexUrl}`;
    const trustedHostContents = `trusted-host = ${inputs.trustedHost}`;
    const pipContents = `[global]\n${indexUrlContents}\n${trustedHostContents}`;
    return pipContents;
}
exports.getPipContents = getPipContents;
function getPipPath(platform) {
    switch (platform.toLowerCase()) {
        case 'linux':
            return path.join(os.homedir(), '.pip', 'pip.conf');
        case 'darwin':
            return path.join(os.homedir(), '.pip', 'pip.conf');
        case 'win32':
            return path.join(os.homedir(), 'pip', 'pip.ini');
        default:
            throw new Error('The pip supports only Linux, Darwin and Windows platforms.');
    }
}
exports.getPipPath = getPipPath;
function writePipConfig(pipConfigPath, pipConfigContent) {
    // 不存在(.pip/pip)目录即创建
    if (!fs.existsSync(path.dirname(pipConfigPath))) {
        core.info(`Pip Config Path:${pipConfigPath} does not exist.`);
        fs.mkdirSync(path.dirname(pipConfigPath));
    }
    fs.writeFileSync(pipConfigPath, pipConfigContent);
}
exports.writePipConfig = writePipConfig;
/**
 * 根据用户输入生成pip install配置并写入对应路径
 * @param inputs
 */
function generatePipConfig(inputs) {
    const platform = os.platform();
    core.info('The current platform is: ' + platform);
    writePipConfig(getPipPath(platform), getPipContents(inputs));
}
exports.generatePipConfig = generatePipConfig;
//# sourceMappingURL=pip.js.map