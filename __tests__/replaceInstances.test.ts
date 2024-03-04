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

test('empty prefix and suffix', () => {
  const data: IReplacements = [
    {
      find: 'find',
      replace: 'replaceemptyprefixsuffix'
    }
  ];

  const content = 'some text find blah blah';

  const result = replaceInstances(data, content, '', '');

  expect(result).toMatchSnapshot();
});

test('empty prefix', () => {
  const data: IReplacements = [
    {
      find: 'find',
      replace: 'replaceemtpyprefix'
    }
  ];

  const content = 'some text find blah blah';

  const result = replaceInstances(data, content, '(text )', '');

  expect(result).toMatchSnapshot();
});

test('empty suffix', () => {
  const data: IReplacements = [
    {
      find: 'find',
      replace: 'replaceemptysuffix'
    }
  ];

  const content = 'some text find blah blah';

  const result = replaceInstances(data, content, '', '( blah)');

  expect(result).toMatchSnapshot();
});

test('multiple replacements', () => {
  const prefix = '';
  const suffix = '';

  const data: IReplacements = [
    {
      find: 'DB_USER=',
      replace: 'DB_USER=FozzieBear',
    },
    {
      find: 'DB_PASSWORD=',
      replace: 'DB_PASSWORD=WockaWocka',
    }
  ];

  const content = 'DB_HOST=\nDB_USER=\nDB_PASSWORD=\n';

  const result = replaceInstances(data, content, prefix, suffix);

  expect(result).toMatchSnapshot();
});