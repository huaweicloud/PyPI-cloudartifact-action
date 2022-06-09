import * as core from '@actions/core';

export interface Inputs {
    repository: string;
    username: string;
    password: string;
    distutilsIndexServer: string;
}

export function getInputs(): Inputs {
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
