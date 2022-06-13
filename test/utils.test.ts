import * as utils from '../src/utils';

describe('test check input is valid', () => {
    const testCase = [
        {
            description: 'pypiOperationType!=install也!=upload',
            inputs: {
                pypiOperationType: 'ddddd',
                indexUrl: '',
                trustedHost: '',
                repository: '',
                username: '',
                password: '',
                indexServer: ''
            },
            result: false
        },
        {
            description: 'pypiOperationType=install checkInstallInput为true',
            inputs: {
                pypiOperationType: 'install',
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
            description: 'pypiOperationType=install checkInstallInput为false',
            inputs: {
                pypiOperationType: 'install',
                indexUrl: 'https://pypi.org/simple',
                trustedHost: 'pypi.org1',
                repository: '',
                username: '',
                password: '',
                indexServer: ''
            },
            result: false
        },
        {
            description: 'pypiOperationType=upload checkUploadInput为true',
            inputs: {
                pypiOperationType: 'upload',
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
            description: 'pypiOperationType=upload checkUploadInput为false',
            inputs: {
                pypiOperationType: 'upload',
                indexUrl: '',
                trustedHost: '',
                repository: 'pypi.org',
                username: '',
                password: '',
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

describe('test InstallInput is valid', () => {
    const testCase = [
        {
            description: 'indexUrl不以http获取https开头',
            inputs: {
                pypiOperationType: 'install',
                indexUrl: 'dddd',
                trustedHost: '',
                repository: '',
                username: '',
                password: '',
                indexServer: ''
            },
            result: false
        },
        {
            description: 'indexUrl不包含trustedHost',
            inputs: {
                pypiOperationType: 'install',
                indexUrl: 'https://pypi.org/simple',
                trustedHost: 'pypi.org1',
                repository: '',
                username: '',
                password: '',
                indexServer: ''
            },
            result: false
        },
        {
            description: 'indexUrl包含trustedHost',
            inputs: {
                pypiOperationType: 'install',
                indexUrl: 'https://pypi.org/simple',
                trustedHost: 'pypi.org',
                repository: '',
                username: '',
                password: '',
                indexServer: ''
            },
            result: true
        }
    ];
    testCase.forEach(item => {
        const {description, inputs, result} = item;
        test(`${description},判断结果：${result}`, async () => {
            expect(utils.checkInstallInput(inputs)).toBe(result);
        });
    });
});

describe('test UploadInput is valid', () => {
    const testCase = [
        {
            description: 'checkRepositoryUrl返回为true',
            inputs: {
                pypiOperationType: 'upload',
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
            description: 'checkRepositoryUrl返回为false',
            inputs: {
                pypiOperationType: 'upload',
                indexUrl: '',
                trustedHost: '',
                repository: 'ddd',
                username: '',
                password: '',
                indexServer: ''
            },
            result: false
        },
        {
            description: 'checkAccountInfo返回为true',
            inputs: {
                pypiOperationType: 'upload',
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
            description: 'checkAccountInfo返回为false',
            inputs: {
                pypiOperationType: 'upload',
                indexUrl: '',
                trustedHost: '',
                repository: '',
                username: '',
                password: 'xxxx',
                indexServer: ''
            },
            result: false
        }
    ];
    testCase.forEach(item => {
        const {description, inputs, result} = item;
        test(`${description},判断结果：${result}`, async () => {
            expect(utils.checkUploadInput(inputs)).toBe(result);
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
            expect(utils.checkRepositoryUrl(repository)).toBe(result);
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
            result: false
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

describe('test check account info is valid', () => {
    const testCase = [
        {
            description: '上传提示',
            inputs: {
                pypiOperationType: 'upload',
                indexUrl: '',
                trustedHost: '',
                repository: '',
                username: '',
                password: '',
                indexServer: 'pypi'
            },
            result: 'Run the following command to publish the Python package to the PyPI repository: twine upload -r pypi dist/*'
        },
        {
            description: '下载提示',
            inputs: {
                pypiOperationType: 'install',
                indexUrl: '',
                trustedHost: '',
                repository: '',
                username: '',
                password: '',
                indexServer: ''
            },
            result: 'Run the following command to install the PyPI package: pip install <PyPI name>'
        }
    ];
    testCase.forEach(item => {
        const {description, inputs, result} = item;
        test(`${description},判断结果：${result}`, async () => {
            expect(utils.getPypiTips(inputs)).toBe(result);
        });
    });
});
