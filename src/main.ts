import * as core from '@actions/core';
import * as context from './context';
import * as utils from './utils';
import * as tool from './toolsHelper';
import * as pypi from './pypirc';
import * as pip from './pip';

export async function run() {
    core.info('Generate configurations for PyPI');
    const inputs: context.Inputs = context.getInputs();

    // 检查参数是否合法
    if (!utils.checkInputs(inputs)) {
        core.setFailed('parameter is not correct.');
        return;
    }

    if (inputs.pypiOperationType === 'upload') {
        core.info('Generate pypirc configurations for uploading PyPI packages.');

        // 安装依赖工具twine
        await tool.installPythonTool('twine');

        // 生成.pypirc配置内容
        pypi.generatePypirc(inputs);

        return;
    }

    if (inputs.pypiOperationType === 'install') {
        core.info('Generate pip configurations for downloading PyPI packages.');

        // 安装依赖工具build
        await tool.installPythonTool('build');

        // 生成pip配置内容
        pip.generatePipConfig(inputs);
    }

    core.info(utils.getPypiTips(inputs));
}

run().catch(core.setFailed);
