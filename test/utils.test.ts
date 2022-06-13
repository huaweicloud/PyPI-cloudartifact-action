import * as utils from '../src/utils';

describe('test check input is valid', () => {
    const testCase = [
        {
            description: 'checkRepository和checkAccountInfo都为true',
            inputs: {
                pypiOperationType: '',
                indexUrl: '',
                trustedHost: '',
                repository: '',
                username: '',
                password: '',
                indexServer: ''
            },
            result: true
        },
        {
            description: 'checkRepository为true checkAccountInfo为false',
            inputs: {
                pypiOperationType: '',
                indexUrl: '',
                trustedHost: '',
                repository: '',
                username: '',
                password: 'password',
                indexServer: ''
            },
            result: false
        },
        {
            description: 'checkRepository为false checkAccountInfo为true',
            inputs: {
                pypiOperationType: '',
                indexUrl: '',
                trustedHost: '',
                repository: 'url',
                username: '',
                password: '',
                indexServer: ''
            },
            result: false
        },
        {
            description: 'checkRepository和checkAccountInfo都为false',
            inputs: {
                pypiOperationType: '',
                indexUrl: '',
                trustedHost: '',
                repository: 'url',
                username: '',
                password: 'password',
                indexServer: ''
            },
            result: false
        }
    ];
    testCase.forEach(item => {
        const {description, inputs, result} = item;
        test(`${description},判断结果：${result}`, async () => {
            expect(utils.checkInputs(inputs)).toBe(result);
        });
    });
});

describe('test check repository is valid', () => {
    const testCase = [
        {repository: 'https://pypi.org/simple', result: true},
        {repository: 'http://pypi.org/simple', result: true},
        {repository: '', result: true},
        {repository: ' ', result: false},
        {repository: 'https://', result: false},
        {repository: 'http://', result: false},
        {repository: 'ddddhttps://pypi.org/simple', result: false}
    ];
    testCase.forEach(item => {
        const {repository, result} = item;
        test(`repository输入为(${repository}),判断结果：${result}`, async () => {
            expect(utils.checkRepository(repository)).toBe(result);
        });
    });
});

describe('test check account info is valid', () => {
    const testCase = [
        {
            description: '用户名密码都输入',
            inputs: {
                pypiOperationType: '',
                indexUrl: '',
                trustedHost: '',
                repository: '',
                username: 'username',
                password: 'password',
                indexServer: ''
            },
            result: true
        },
        {
            description: '用户名密码都不输入',
            inputs: {
                pypiOperationType: '',
                indexUrl: '',
                trustedHost: '',
                repository: '',
                username: '',
                password: '',
                indexServer: ''
            },
            result: true
        },
        {
            description: '只输入用户名',
            inputs: {
                pypiOperationType: '',
                indexUrl: '',
                trustedHost: '',
                repository: '',
                username: 'username',
                password: '',
                indexServer: ''
            },
            result: true
        },
        {
            description: '只输入密码',
            inputs: {
                pypiOperationType: '',
                indexUrl: '',
                trustedHost: '',
                repository: '',
                username: '',
                password: 'password',
                indexServer: ''
            },
            result: false
        }
    ];
    testCase.forEach(item => {
        const {description, inputs, result} = item;
        test(`${description},判断结果：${result}`, async () => {
            expect(utils.checkAccountInfo(inputs)).toBe(result);
        });
    });
});
