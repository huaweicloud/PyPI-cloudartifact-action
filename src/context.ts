import * as core from '@actions/core';

export interface Inputs {
    pypiOperationType: string;
    indexUrl: string;
    trustedHost: string;
    repository: string;
    username: string;
    password: string;
    indexServer: string;
}

export function getInputs(): Inputs {
    return {
        pypiOperationType: core.getInput('pypi-operation-type', {required: true}),
        indexUrl: core.getInput('index-url', {required: false}),
        trustedHost: core.getInput('trusted-host', {required: false}),
        repository: core.getInput('repository', {required: false}),
        username: core.getInput('username', {required: false}),
        password: core.getInput('password', {required: false}),
        indexServer: core.getInput('index-server', {required: false}),
    };
}

export const DEFAULT_REGISTRY = 'https://pypi.org/simple';
