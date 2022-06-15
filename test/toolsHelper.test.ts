import * as tool from '../src/toolsHelper';

describe('check execCommand', () => {
    test('check execCommand when invalid command', async () => {
        expect(async () => await tool.execCommand('command')).toThrow;
    });

    test('check execCommand when valid command', async () => {
        expect(await tool.execCommand('node --version')).toBe(true);
    });
});

describe('test installPythonTool', () => {
    test('check installPythonTool when invalid tool', async () => {
        expect(async () => await tool.installPythonTool('twinw')).toThrow;
    });
    test('check installPythonTool when valid tool', async () => {
        expect(await tool.installPythonTool('twine')).toBe(true);
    });
});
