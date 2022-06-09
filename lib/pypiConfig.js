"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePypirc = void 0;
function writePypirc(inputs) {
    const distutilsIndexServerContents = `[distutils]\nindex-servers=${inputs.distutilsIndexServer}\n`;
    const repositoryContents = `repository = ${inputs.repository}\n`;
    const usernameContents = inputs.username ? `username = ${inputs.username}\n` : ``;
    const passwordContents = inputs.password ? `password = ${inputs.password}\n` : ``;
    const pypricContents = `${distutilsIndexServerContents}\n[${inputs.distutilsIndexServer}]\n${repositoryContents}${usernameContents}${passwordContents}`;
    console.log(pypricContents);
}
exports.writePypirc = writePypirc;
//# sourceMappingURL=pypiConfig.js.map