import * as twine from '../src/twineHelper';

describe('test tool is available', () => {
    const testCase = [
        {description: '工具没安装', commandLine: 'buildx', args:['version'], result: false},
        {description: '工具命令错误', commandLine: 'twine', args:['version'], result: false},
        {description: '工具已安装', commandLine: 'java', args:['-version'], result: true},
        
    ];
    testCase.forEach(item => {
        const {description, commandLine, args, result} = item;
        test(`${description},判断结果：${result}`, async () => {
            expect(await twine.isAvailable(commandLine, args)).toBe(result);
        });
    });
});