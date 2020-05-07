import { renderHook } from '@testing-library/react-hooks';

import { useForm } from '../src';

const values = {
  info: {
    firstName: 'John',
  },
};

const options = {
  initialValues: values,
};

describe('useForm', () => {
  it('should return form instance', () => {
    const { result } = renderHook(() => useForm(options));

    expect(result.current).toMatchSnapshot();
  });

  it('should always return same form instance', () => {
    const { result, rerender } = renderHook(() => useForm(options));
    const form = result.current;

    rerender();
    expect(result.current).toBe(form);
  });
});
