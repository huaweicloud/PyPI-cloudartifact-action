import * as core from '@actions/core';
import * as context from './context';
import * as utils from './utils';

export async function run() {
    core.info('Generate configurations for PyPI');
    const inputs: context.Inputs = context.getInputs();
    
    // 检查参数是否合法
    if (!utils.checkInputs(inputs)) {
        core.setFailed('parameter is not correct.');
        return;
    }
}

run().catch(core.setFailed);
