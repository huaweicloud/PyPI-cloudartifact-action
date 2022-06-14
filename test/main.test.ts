import * as main from '../src/main';
import * as utils from '../src/utils';
import * as context from '../src/context';
import * as twine from '../src/twineHelper';
import * as pypi from '../src/pypirc';
import * as pip from '../src/pip';

jest.mock('../src/utils');
jest.mock('../src/context');
jest.mock('../src/twineHelper');
jest.mock('../src/pypirc');
jest.mock('../src/pip');

test('mock checkInputs return true and pypiOperationType is install', async () => {
    jest.spyOn(utils, 'checkInputs').mockReturnValue(true);
    jest.spyOn(context, 'getInputs').mockReturnValue({
        pypiOperationType: 'install',
        indexUrl: '',
        trustedHost: '',
        repository: '',
        username: '',
        password: '',
        indexServer: ''
    });
    jest.spyOn(utils, 'getPypiTips').mockReturnValue(
        'Run the following command to publish the Python package to the PyPI repository: twine upload -r pypi dist/*'
    );
    await main.run();

    expect(context.getInputs).toHaveBeenCalled();
    expect(context.getInputs).toHaveBeenCalledTimes(1);

    expect(utils.checkInputs).toHaveBeenCalled();
    expect(utils.checkInputs).toHaveBeenCalledTimes(1);

    expect(twine.installTwine).not.toHaveBeenCalled();

    expect(pypi.generatePypirc).not.toHaveBeenCalled();

    expect(pip.generatePipConfig).toHaveBeenCalled();
});

test('mock checkInputs return true and pypiOperationType is upload', async () => {
    jest.spyOn(utils, 'checkInputs').mockReturnValue(true);
    jest.spyOn(context, 'getInputs').mockReturnValue({
        pypiOperationType: 'upload',
        indexUrl: '',
        trustedHost: '',
        repository: '',
        username: '',
        password: '',
        indexServer: ''
    });
    jest.spyOn(utils, 'getPypiTips').mockReturnValue(
        'Run the following command to publish the Python package to the PyPI repository: twine upload -r pypi dist/*'
    );
    await main.run();

    expect(context.getInputs).toHaveBeenCalled();
    expect(context.getInputs).toHaveBeenCalledTimes(1);

    expect(utils.checkInputs).toHaveBeenCalled();
    expect(utils.checkInputs).toHaveBeenCalledTimes(1);

    expect(twine.installTwine).toHaveBeenCalled();

    expect(pypi.generatePypirc).toHaveBeenCalled();

    expect(pip.generatePipConfig).not.toHaveBeenCalled();
});

test('mock checkInputs return false', async () => {
    jest.spyOn(utils, 'checkInputs').mockReturnValue(false);
    await main.run();

    expect(context.getInputs).toHaveBeenCalled();
    expect(context.getInputs).toHaveBeenCalledTimes(1);

    expect(utils.checkInputs).toHaveBeenCalled();
    expect(utils.checkInputs).toHaveBeenCalledTimes(1);

    expect(twine.installTwine).not.toHaveBeenCalled();

    expect(pypi.generatePypirc).not.toHaveBeenCalled();

    expect(pip.generatePipConfig).not.toHaveBeenCalled();

    expect(utils.getPypiTips).not.toHaveBeenCalled();
});
