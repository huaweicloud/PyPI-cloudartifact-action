import * as core from '@actions/core';
import * as context from './context';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

export function getPipContents(inputs: context.Inputs) {
    const indexUrlContents = `index-url = ${inputs.indexUrl}`;
    const trustedHostContents = `trusted-host = ${inputs.trustedHost}`;
    const pipContents = `[global]\n${indexUrlContents}\n${trustedHostContents}`;
    return pipContents;
}

export function getPipPath(platform: string): string {
    switch (platform.toLowerCase()) {
        case 'linux':
            return path.join(os.homedir(), '.pip', 'pip.conf');
        case 'darwin':
            return path.join(os.homedir(), '.pip', 'pip.conf');
        case 'win32':
            return path.join(os.homedir(), 'pip', 'pip.ini');
        default:
          throw new Error(
            'The pip supports only Linux, Darwin and Windows platforms.'
          );
      }
  }

export function writePipConfig(pipCobfigPath: string, pipConfigContent: string ) {
    // 不存在(.pip/pip)目录即创建
    if (!fs.existsSync(path.dirname(pipCobfigPath))) {
      core.info(`Pip Config Path:${pipCobfigPath} does not exist.`);
      fs.mkdirSync(path.dirname(pipCobfigPath));
    }
    fs.writeFileSync(pipCobfigPath, pipConfigContent);
}

/**
 * 根据用户输入生成pip install配置并写入对应路径
 * @param inputs
 */
export function generatePipConfig(inputs: context.Inputs) {
  const platform = os.platform();
  core.info('The current platform is: ' + platform);
  writePipConfig(getPipPath(platform), getPipContents(inputs));
}
  