import * as utils from '../src/utils';

function getInputs(pypiOperationType: string, indexUrl: string, trustedHost: string, repository: string, username: string, password: string, indexServer: string) {
    return {
        pypiOperationType: pypiOperationType,
        indexUrl: indexUrl,
        trustedHost: trustedHost,
        repository: repository,
        username: username,
        password: password,
        indexServer: indexServer
    };
}

describe('test check input is valid', () => {
    const testCase = [
        {
            description: 'pypiOperationType!=install也!=upload',
            inputs: getInputs('ddddd', '', '', '', '', '', ''),
            result: false
        },
        {
            description: 'pypiOperationType=install checkInstallInput为true',
            inputs: getInputs('install', '', '', '', '', '', ''),
            result: true
        },
        {
            description: 'pypiOperationType=install checkInstallInput为false',
            inputs: getInputs('install', 'https://pypi.org/simple', 'pypi.org1', '', '', '', ''),
            result: false
        },
        {
            description: 'pypiOperationType=upload checkUploadInput为true',
            inputs: getInputs('upload', '', '', '', '', '', ''),
            result: true
        },
        {
            description: 'pypiOperationType=upload checkUploadInput为false',
            inputs: getInputs('upload', '', '', 'pypi.org', '', '', ''),
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
            inputs: getInputs('install', 'dddd', '', '', '', '', ''),
            result: false
        },
        {
            description: 'indexUrl不包含trustedHost',
            inputs: getInputs('install', 'https://pypi.org/simple', 'pypi.org1', '', '', '', ''),
            result: false
        },
        {
            description: 'indexUrl包含trustedHost',
            inputs: getInputs('install', 'https://pypi.org/simple', 'pypi.org', '', '', '', ''),
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
            inputs: getInputs('upload', '', '', '', '', '', ''),
            result: true
        },
        {
            description: 'checkRepositoryUrl返回为false',
            inputs: getInputs('upload', '', '', 'ddd', '', '', ''),
            result: false
        },
        {
            description: 'checkAccountInfo返回为true',
            inputs: getInputs('upload', '', '', '', '', '', ''),
            result: true
        },
        {
            description: 'checkAccountInfo返回为false',
            inputs: getInputs('upload', '', '', '', '', 'xxxx', ''),
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
            inputs: getInputs('', '', '', '', 'username', 'password', ''),
            result: true
        },
        {
            description: '用户名密码都不输入',
            inputs: getInputs('', '', '', '', '', '', ''),
            result: true
        },
        {
            description: '只输入用户名',
            inputs: getInputs('', '', '', '', 'username', '', ''),
            result: false
        },
        {
            description: '只输入密码',
            inputs: getInputs('', '', '', '', '', 'password', ''),
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
            inputs: getInputs('upload', '', '', '', '', '', 'pypi'),
            result: 'Run the following command to publish the Python package to the PyPI repository: twine upload -r pypi dist/*'
        },
        {
            description: '下载提示',
            inputs: getInputs('install', '', '', '', '', '', ''),
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
