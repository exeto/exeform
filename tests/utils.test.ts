import { get } from '../src';
import { set, getTouched, omitOne, isEmpty } from '../src/utils';

const values = {
  id: 42,
  info: {
    name: 'John',
  },
  commentsIds: [56, 78],
  comments: [
    {
      id: 56,
      text: 'foo',
    },
    {
      id: 78,
      text: 'bar',
    },
  ],
};

describe('get', () => {
  it('should return value', () => {
    expect(get(values, 'id')).toBe(values.id);
  });

  it('should return nested value', () => {
    expect(get(values, 'info.name')).toBe(values.info.name);
  });

  it('should return value from array', () => {
    expect(get(values, 'commentsIds[0]')).toBe(values.commentsIds[0]);
    expect(get(values, 'commentsIds[1]')).toBe(values.commentsIds[1]);
    expect(get(values, 'comments')).toBe(values.comments);
    expect(get(values, 'comments[0].text')).toBe(values.comments[0].text);
    expect(get(values, 'comments[1].text')).toBe(values.comments[1].text);
  });

  it('should return undefined when incorrect path', () => {
    expect(get(values, 'incorrect')).toBeUndefined();
    expect(get(values, 'incorrect.incorrect')).toBeUndefined();
    expect(get(values, 'incorrect[0].incorrect')).toBeUndefined();
    expect(get(values, 'id.incorrect')).toBeUndefined();
    expect(get(values, 'info.incorrect')).toBeUndefined();
    expect(get(values, 'commentsIds[3]')).toBeUndefined();
    expect(get(values, 'commentsIds[3].incorrect')).toBeUndefined();
    expect(get(values, 'comments[3]')).toBeUndefined();
    expect(get(values, 'comments[2].incorrect')).toBeUndefined();
    expect(get(values, 'comments[3].incorrect')).toBeUndefined();
  });
});

describe('set', () => {
  it('should set value', () => {
    expect(set(values, 'id', 84)).toMatchSnapshot();
  });

  it('should set value to nested path', () => {
    expect(set(values, 'info.name', 'Mike')).toMatchSnapshot();
  });

  it('should set value to array', () => {
    expect(set(values, 'comments[0].text', 'baz')).toMatchSnapshot();
    expect(set(values, 'comments[1].text', 'bat')).toMatchSnapshot();
  });

  it('should set non-existent path', () => {
    expect(set({}, 'foo[0].bar', 'baz')).toMatchSnapshot();
    expect(set({ foo: 42 }, 'foo[0].bar.baz', 'bat')).toMatchSnapshot();
  });
});

describe('getTouched', () => {
  it('should return touched for errors', () => {
    expect(getTouched({})).toEqual({});
    expect(
      getTouched({ 'info.name': 'error', 'comments[0].text': 'error' }),
    ).toMatchSnapshot();
  });
});

describe('omitOne', () => {
  it('should omit one field from object', () => {
    const data = { foo: 'bar', baz: 'bat' };

    expect(omitOne(data, 'foo')).toEqual({ baz: 'bat' });
    expect(omitOne(data, 'baz')).toEqual({ foo: 'bar' });
  });
});

describe('isEmpty', () => {
  it('should check that object is empty', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ foo: 'bar' })).toBe(false);
    expect(isEmpty({ foo: undefined })).toBe(false);
  });
});
