import { get } from '../src/utils';

describe('get', () => {
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

  it('should return value', () => {
    expect(get(values, 'id')).toBe(values.id);
  });

  it('should return nested value', () => {
    expect(get(values, 'info.name')).toBe(values.info.name);
  });

  it('should return value from array', () => {
    expect(get(values, 'commentsIds.0')).toBe(values.commentsIds[0]);
    expect(get(values, 'commentsIds.1')).toBe(values.commentsIds[1]);
    expect(get(values, 'comments')).toBe(values.comments);
    expect(get(values, 'comments.0.text')).toBe(values.comments[0].text);
    expect(get(values, 'comments.1.text')).toBe(values.comments[1].text);
  });

  it('should return undefined when incorrect path', () => {
    expect(get(values, 'incorrect')).toBeUndefined();
    expect(get(values, 'incorrect.incorrect')).toBeUndefined();
    expect(get(values, 'incorrect.0.incorrect')).toBeUndefined();
    expect(get(values, 'id.incorrect')).toBeUndefined();
    expect(get(values, 'info.incorrect')).toBeUndefined();
    expect(get(values, 'commentsIds.3')).toBeUndefined();
    expect(get(values, 'commentsIds.3.incorrect')).toBeUndefined();
    expect(get(values, 'comments.3')).toBeUndefined();
    expect(get(values, 'comments.2.incorrect')).toBeUndefined();
    expect(get(values, 'comments.3.incorrect')).toBeUndefined();
  });
});
