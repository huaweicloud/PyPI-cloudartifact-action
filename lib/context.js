"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInputs = void 0;
function getInputs() {
    // return {
    //     repository: core.getInput('repository', {required: false}),
    //     username: core.getInput('username', {required: false}),
    //     password: core.getInput('password', {required: false}),
    //     distutilsIndexServer: core.getInput('distutils-index-server', {required: false})
    // };
    return {
        repository: 'https://pypi.org/simple',
        username: '',
        password: '',
        distutilsIndexServer: 'pypi'
    };
}
exports.getInputs = getInputs;
//# sourceMappingURL=context.js.map