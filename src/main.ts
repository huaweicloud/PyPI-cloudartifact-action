import * as core from '@actions/core';
import * as context from './context';
import * as utils from './utils';
import * as twine from './twineHelper';
import * as pypi from './pypiConfig';

export async function run() {
    core.info('Generate configurations for PyPI');
    const inputs: context.Inputs = context.getInputs();

    // 检查参数是否合法
    if (!utils.checkInputs(inputs)) {
        core.setFailed('parameter is not correct.');
        return;
    }

    // 安装依赖工具twine
    await twine.installTwine();

    // 生成.pypirc配置内容
    pypi.generatePypirc(inputs);

    core.info(`Run the following command to publish the Python package to the PyPI repository: twine upload -r ${inputs.distutilsIndexServer} dist/*`);
}

run().catch(core.setFailed);
