import * as pip from '../src/pip';
import fs from 'fs';
import * as os from 'os';
import {v4 as uuidv4} from 'uuid';

test('test getPipContents', async () => {
    const inputs = {
        pypiOperationType: 'install',
        indexUrl: 'https://pypi.org/simple',
        trustedHost: 'pypi.org',
        repository: '',
        username: '',
        password: '',
        indexServer: '',
        tools: ''
    };
    expect(pip.getPipContents(inputs)).toBe(
        '[global]\nindex-url = https://pypi.org/simple\ntrusted-host = pypi.org'
    );
});

describe('test normal getPipPath', () => {
    const testCase = [
        {platform: 'linux', result: 'pip.conf'},
        {platform: 'darwin', result: 'pip.conf'},
        {platform: 'win32', result: 'pip.ini'}
    ];
    testCase.forEach(item => {
        const {platform, result} = item;
        test(`platform输入为(${platform}),判断结果：${result}`, async () => {
            expect(pip.getPipPath(platform)).toContain(result);
        });
    });
});

describe('test abnormal getPipPath', () => {
    const testCase = [
        {platform: 'freebsd', result: 'pip.conf'},
        {platform: 'test', result: 'pip.conf'}
    ];
    testCase.forEach(item => {
        const {platform, result} = item;
        test(`platform输入为(${platform}),抛出异常`, async () => {
            expect(() => pip.getPipPath(platform)).toThrow(
                'The pip supports only Linux, Darwin and Windows platforms.'
            );
        });
    });
});

describe('test generatePipConfig', () => {
    const testCase = [
        {
            description: 'pypiOperationType!=install也!=upload',
            inputs: {
                pypiOperationType: 'install',
                indexUrl: 'https://pypi.org/simple',
                trustedHost: 'pypi.org',
                repository: '',
                username: '',
                password: '',
                indexServer: '',
                tools: ''
            },
            result: '[global]\nindex-url = https://pypi.org/simple\ntrusted-host = pypi.org'
        }
    ];
    const configPath = pip.getPipPath(os.platform());
    const tmpPath = './test/pipini-' + uuidv4();
    beforeAll(() => {
        fs.copyFileSync(configPath, tmpPath);
    });
    afterAll(() => {
        fs.copyFileSync(tmpPath, configPath);
        fs.unlinkSync(tmpPath);
    });

    testCase.forEach(item => {
        const {description, inputs, result} = item;
        test(`${description}`, async () => {
            pip.generatePipConfig(inputs);
            expect(fs.readFileSync(configPath, 'utf-8')).toBe(result);
        });
    });
});

describe('test writePipConfig function', () => {
    test('test write pipConfigContent into pipConfigPath', async () => {
        const pipConfigContent = 'hello';
        const pipConfigPath = 'test/.test-' + uuidv4();
        pip.writePipConfig(pipConfigPath, pipConfigContent);
        expect(fs.readFileSync(pipConfigPath, 'utf-8')).toBe(pipConfigContent);
        fs.unlinkSync(pipConfigPath);
    });

    test('test writePipConfig mock existsSync return true ', async () => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        jest.spyOn(fs, 'mkdirSync').mockImplementation(() => '');
        jest.spyOn(fs, 'writeFileSync').mockImplementation(() => '');
        pip.writePipConfig('', '');
        expect(fs.existsSync).toHaveBeenCalled();
        expect(fs.existsSync).toHaveBeenCalledTimes(1);

        expect(fs.mkdirSync).not.toHaveBeenCalled();

        expect(fs.writeFileSync).toHaveBeenCalled();
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });

    test('test writePipConfig mock existsSync return false ', async () => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(false);
        jest.spyOn(fs, 'mkdirSync').mockImplementation(() => '');
        jest.spyOn(fs, 'writeFileSync').mockImplementation(() => '');
        pip.writePipConfig('', '');
        expect(fs.existsSync).toHaveBeenCalled();
        expect(fs.existsSync).toHaveBeenCalledTimes(1);

        expect(fs.mkdirSync).toHaveBeenCalled();
        expect(fs.mkdirSync).toHaveBeenCalledTimes(1);

        expect(fs.writeFileSync).toHaveBeenCalled();
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });
});
