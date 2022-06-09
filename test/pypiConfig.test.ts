import * as pypi from '../src/pypiConfig';

describe('test get pypric contents', () => {
    const testCase = [
        {
            description: 'input不传参数',
            inputs: {repository: '', username: '', password: '', distutilsIndexServer: ''},
            result: `[distutils]\nindex-servers=pypi\n\n[pypi]\nrepository = https://pypi.org/simple\n`
        },
        {
            description: '只传repository',
            inputs: {
                repository: 'https://repo.huaweicloud.com/repository/pypi/simple',
                username: '',
                password: '',
                distutilsIndexServer: ''
            },
            result: `[distutils]\nindex-servers=pypi\n\n[pypi]\nrepository = https://repo.huaweicloud.com/repository/pypi/simple\n`
        },
        {
            description: '传用户名密码',
            inputs: {
                repository: '',
                username: 'username',
                password: 'password',
                distutilsIndexServer: ''
            },
            result: `[distutils]\nindex-servers=pypi\n\n[pypi]\nrepository = https://pypi.org/simple\nusername = username\npassword = password\n`
        }
    ];
    testCase.forEach(item => {
        const {description, inputs, result} = item;
        test(`${description}`, async () => {
            expect(pypi.getPypricContents(inputs)).toBe(result);
        });
    });
});

test('get pypirc path', async () => {
    expect(pypi.getPypircPath()).toMatch(/.pypirc$/);
});
