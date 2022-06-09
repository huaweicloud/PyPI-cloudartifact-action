import * as core from '@actions/core';
import * as context from './context';

export function writePypirc(inputs: context.Inputs) {
    const distutilsIndexServerContents =  `[distutils]\nindex-servers=${inputs.distutilsIndexServer}\n`;
    const repositoryContents = `repository = ${inputs.repository}\n`;
    const usernameContents = inputs.username? `username = ${inputs.username}\n` : ``;
    const passwordContents = inputs.password? `password = ${inputs.password}\n` : ``;
    const pypricContents = `${distutilsIndexServerContents}\n[${inputs.distutilsIndexServer}]\n${repositoryContents}${usernameContents}${passwordContents}`;
    console.log(pypricContents)
  }