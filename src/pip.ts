import * as core from '@actions/core';
import * as context from './context';
import * as os from 'os';
import * as path from 'path';

export function getPipContents(inputs: context.Inputs) {
    const indexUrlContents = `index-url = ${inputs.indexUrl}\n`;
    const trustedHostContents = `trusted-host = ${inputs.trustedHost}\n`;
    const pipContents = `[global]\n[${indexUrlContents}]\n${trustedHostContents}`;
    return pipContents;
}

function getPipPath(platform: string): string {
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

  const platform = os.platform();
  core.info('platform: ' + getPipPath(platform));