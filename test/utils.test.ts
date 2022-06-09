import * as utils from '../src/utils';

describe('test check repository is valid', () => {
    const testCase = [
      {repository: 'https://pypi.org/simple', result: true},
      {repository: 'http://pypi.org/simple', result: true},
      {repository: '', result: true},
      {repository: ' ', result: false},
      {repository: 'https://', result: false},
      {repository: 'http://', result: false},
      {repository: 'ddddhttps://pypi.org/simple', result: false},
    ];
    testCase.forEach(item => {
      const {repository, result} = item;
      test(`repository输入为(${repository}),判断结果：${result}`, async () => {
        expect(utils.checkRepository(repository)).toBe(result);
      });
    });
  });

  describe('test check account info is valid', () => {
    const testCase = [
      {description: '用户名密码都输入', inputs: {repository:'', username: 'username', password: 'password', distutilsIndexServer: ''}, result: true},
      {description: '用户名密码都不输入', inputs: {repository:'', username: '', password: '', distutilsIndexServer: ''}, result: true},
      {description: '只输入用户名', inputs: {repository:'', username: 'username', password: '', distutilsIndexServer: ''}, result: true},
      {description: '只输入密码', inputs: {repository:'', username: '', password: 'password', distutilsIndexServer: ''}, result: false},
    ];
    testCase.forEach(item => {
      const {description, inputs, result} = item;
      test(`${description},判断结果：${result}`, async () => {
        expect(utils.checkAccountInfo(inputs)).toBe(result);
      });
    });
  }); 