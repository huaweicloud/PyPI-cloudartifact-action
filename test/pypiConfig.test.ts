import * as pypi from '../src/pypiConfig';

test('get pypirc path', async () => {
    expect(pypi.getPypircPath()).toMatch(/.pypirc$/)
});