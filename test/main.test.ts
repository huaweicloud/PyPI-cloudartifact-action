import * as main from '../src/main';
import * as utils from '../src/utils';
import * as context from '../src/context';
import * as twine from '../src/twineHelper';
import * as pypi from '../src/pypiConfig';

jest.mock('../src/utils');
jest.mock('../src/context');
jest.mock('../src/twineHelper');
jest.mock('../src/pypiConfig');

test('mock checkInputs return true', async () => {
    jest.spyOn(utils, 'checkInputs').mockReturnValue(true);
    jest.spyOn(utils, 'getPypiTips').mockReturnValue(
        'Run the following command to publish the Python package to the PyPI repository: twine upload -r pypi dist/*'
    );
    await main.run();

    expect(context.getInputs).toHaveBeenCalled();
    expect(context.getInputs).toHaveBeenCalledTimes(1);

    expect(utils.checkInputs).toHaveBeenCalled();
    expect(utils.checkInputs).toHaveBeenCalledTimes(1);

    expect(twine.installTwine).toHaveBeenCalled();
    expect(twine.installTwine).toHaveBeenCalledTimes(1);

    expect(pypi.generatePypirc).toHaveBeenCalled();
    expect(pypi.generatePypirc).toHaveBeenCalledTimes(1);
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

    expect(utils.getPypiTips).not.toHaveBeenCalled();
});
