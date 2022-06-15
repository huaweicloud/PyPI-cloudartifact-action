import * as core from '@actions/core';

export interface Inputs {
    pypiOperationType: string;
    indexUrl: string;
    trustedHost: string;
    repository: string;
    username: string;
    password: string;
    indexServer: string;
    tools: string;
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
        tools: core.getInput('tools', {required: false})
    };
}

export const DEFAULT_REGISTRY = 'https://pypi.org/simple';

/**
 * 目前支持安装的python依赖工具：
 * twine: Python打包上传工具	
 * build: Python构建工具		
 * setuptools: Python构建工具		
 * wheel: Python构建工具		
 */
 export const TOOLS_ARRAY: string[] = [
    'twine',
    'build',
    'setuptools',
    'wheel'
  ];
