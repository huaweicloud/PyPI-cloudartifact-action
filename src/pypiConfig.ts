import * as core from '@actions/core';
import * as context from './context';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

export function writePypirc(inputs: context.Inputs) {
    const distutilsIndexServerContents =  `[distutils]\nindex-servers=${inputs.distutilsIndexServer}\n`;
    const repositoryContents = `repository = ${inputs.repository}\n`;
    const usernameContents = inputs.username? `username = ${inputs.username}\n` : ``;
    const passwordContents = inputs.password? `password = ${inputs.password}\n` : ``;
    const pypricContents = `${distutilsIndexServerContents}\n[${inputs.distutilsIndexServer}]\n${repositoryContents}${usernameContents}${passwordContents}`;
    console.log(pypricContents)
  }

  export function getPypircPath() {
    return path.join(os.homedir(), '.pypirc');
  }