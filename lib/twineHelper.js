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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installTwine = exports.isAvailable = void 0;
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
function isAvailable(commandLine, args) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exec
            .getExecOutput(commandLine, args, {
            ignoreReturnCode: true,
            silent: true
        })
            .then(res => {
            if (res.stderr.length > 0 && res.exitCode != 0) {
                core.info(`${commandLine} is not installed.`);
                return false;
            }
            return res.exitCode == 0;
        })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch(error => {
            return false;
        });
    });
}
exports.isAvailable = isAvailable;
/**
 * 下载安装twine
 */
function installTwine() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield isAvailable('twine', ['--version']))) {
            try {
                yield exec.exec('pip', ['install', 'twine']);
            }
            catch (error) {
                console.log(error);
                core.setFailed('intsall twine failed');
            }
        }
    });
}
exports.installTwine = installTwine;
//# sourceMappingURL=twineHelper.js.map