import * as tool from '../src/toolsHelper';

const mockThen = jest.fn();


jest.mock('@actions/exec', () => {
    return {
        getExecOutput: jest.fn(() => ({
            then: mockThen,
            })),
    };
});


describe('check execCommand', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

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
        mockThen.mockImplementation(() => {
            return false;
        }); 
        expect(await tool.installPythonTool('twine')).toBe(true);
    });
});
