import * as main from '../src/main';
import * as utils from '../src/utils';
import * as context from '../src/context';
import * as tools from '../src/toolsHelper';
import * as pypi from '../src/pypirc';
import * as pip from '../src/pip';

jest.mock('../src/utils');
jest.mock('../src/context');
jest.mock('../src/toolsHelper');
jest.mock('../src/pypirc');
jest.mock('../src/pip');

function getInputs(
    pypiOperationType: string,
    indexUrl: string,
    trustedHost: string,
    repository: string,
    username: string,
    password: string,
    indexServer: string
) {
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

test('mock checkInputs return true and pypiOperationType is install', async () => {
    jest.spyOn(utils, 'checkInputs').mockReturnValue(true);
    jest.spyOn(context, 'getInputs').mockReturnValue(getInputs('install', '', '', '', '', '', ''));
    jest.spyOn(utils, 'getPypiTips').mockReturnValue(
        'Run the following command to install the PyPI package: pip install <PyPI name>'
    );
    await main.run();

    expect(context.getInputs).toHaveBeenCalled();
    expect(context.getInputs).toHaveBeenCalledTimes(1);

    expect(utils.checkInputs).toHaveBeenCalled();
    expect(utils.checkInputs).toHaveBeenCalledTimes(1);

    expect(pip.generatePipConfig).toHaveBeenCalled();

    expect(tools.installPythonTool).toHaveBeenCalled();

    expect(pypi.generatePypirc).not.toHaveBeenCalled();
});

test('mock checkInputs return true and pypiOperationType is upload', async () => {
    jest.spyOn(utils, 'checkInputs').mockReturnValue(true);
    jest.spyOn(context, 'getInputs').mockReturnValue(getInputs('upload', '', '', '', '', '', ''));
    jest.spyOn(utils, 'getPypiTips').mockReturnValue(
        'Run the following command to publish the Python package to the PyPI repository: twine upload -r pypi dist/*'
    );
    await main.run();

    expect(context.getInputs).toHaveBeenCalled();
    expect(context.getInputs).toHaveBeenCalledTimes(1);

    expect(utils.checkInputs).toHaveBeenCalled();
    expect(utils.checkInputs).toHaveBeenCalledTimes(1);

    expect(pip.generatePipConfig).not.toHaveBeenCalled();

    expect(tools.installPythonTool).toHaveBeenCalled();

    expect(pypi.generatePypirc).toHaveBeenCalled();
});

test('mock checkInputs return false', async () => {
    jest.spyOn(utils, 'checkInputs').mockReturnValue(false);
    await main.run();

    expect(context.getInputs).toHaveBeenCalled();
    expect(context.getInputs).toHaveBeenCalledTimes(1);

    expect(utils.checkInputs).toHaveBeenCalled();
    expect(utils.checkInputs).toHaveBeenCalledTimes(1);

    expect(tools.installPythonTool).not.toHaveBeenCalled();

    expect(pypi.generatePypirc).not.toHaveBeenCalled();

    expect(pip.generatePipConfig).not.toHaveBeenCalled();

    expect(utils.getPypiTips).not.toHaveBeenCalled();
});
