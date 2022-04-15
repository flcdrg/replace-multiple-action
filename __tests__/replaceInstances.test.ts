import { expect, test } from '@jest/globals';
import { IReplacements } from '../src/main';
import { replaceInstances } from '../src/replaceInstances';

const prefix = '(^|\\s+|\\()';
const suffix = '($|\\s+|\\))';

test('space separated', () => {
  const data: IReplacements = [
    {
      find: 'http://localhost',
      replace: 'https://wayback.org/http://localhost'
    }
  ];

  const content = 'some text http://localhost blah blah';

  const result = replaceInstances(data, content, prefix, suffix);

  expect(result).toMatchSnapshot();
});

test('start and end', () => {
  const data: IReplacements = [
    {
      find: 'http://localhost',
      replace: 'https://wayback.org/http://localhost'
    }
  ];

  const content = 'http://localhost blah \nblah and http://localhost';

  const result = replaceInstances(data, content, prefix, suffix);

  expect(result).toMatchSnapshot();
});

test('in a link', () => {
  const data: IReplacements = [
    {
      find: 'http://localhost',
      replace: 'https://wayback.org/http://localhost'
    }
  ];

  const content = 'some [text](http://localhost) blah blah';

  const result = replaceInstances(data, content, prefix, suffix);

  expect(result).toMatchSnapshot();
});

test('not links', () => {
  const data: IReplacements = [
    {
      find: 'http://localhost',
      replace: 'https://wayback.org/http://localhost'
    }
  ];

  const content =
    'some [text]http://localhost) blah blah and this -http://localhost';

  const result = replaceInstances(data, content, prefix, suffix);

  expect(result).toMatchSnapshot();
});
