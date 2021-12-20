/** @jest-environment jsdom */

import React, { FC } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { render, act as reactAct } from '@testing-library/react';

import { FormProvider, useField } from '../src';
import createForm from '../src/createForm';

export const createData = () => {
  const form = createForm({
    initialValues: {
      info: {
        firstName: 'John',
        lastName: 'Doe',
      },
    },
  });

  const wrapper: FC = ({ children }) => (
    <FormProvider value={form}>{children}</FormProvider>
  );

  return { form, wrapper };
};

const createEvent = (value: any): any => ({ target: { value } });

describe('useField', () => {
  it('should return initial values', () => {
    const { result } = renderHook(() => useField('info.firstName'), {
      wrapper: createData().wrapper,
    });

    expect(result.current.field.name).toBe('info.firstName');
    expect(result.current.field.value).toBe('John');
    expect(result.current.meta).toEqual({ error: null, touched: false });
  });

  it('should return new value after change', () => {
    const { form, wrapper } = createData();

    const { result } = renderHook(() => useField('info.firstName'), {
      wrapper,
    });

    act(() => result.current.field.onChange(createEvent('Mike')));
    expect(result.current.field.value).toBe('Mike');

    act(() => result.current.helpers.setValue('Alex'));
    expect(result.current.field.value).toBe('Alex');

    act(() => form.setFieldValue('info.firstName', 'Nick'));
    expect(result.current.field.value).toBe('Nick');
  });

  it('should change touched status', () => {
    const { form, wrapper } = createData();
    const { result } = renderHook(() => useField('info.firstName'), {
      wrapper,
    });

    expect(result.current.meta.touched).toBe(false);

    act(() => result.current.field.onBlur());
    expect(result.current.meta.touched).toBe(true);

    act(() => result.current.helpers.setTouched(false));
    expect(result.current.meta.touched).toBe(false);

    act(() => result.current.helpers.setTouched());
    expect(result.current.meta.touched).toBe(true);

    act(() => form.setFieldTouched('info.firstName', false));
    expect(result.current.meta.touched).toBe(false);

    act(() => result.current.helpers.setError('error'));
    expect(result.current.meta.touched).toBe(true);
  });

  it('should change error', () => {
    const { form, wrapper } = createData();

    const { result } = renderHook(() => useField('info.firstName'), {
      wrapper,
    });

    expect(result.current.meta.error).toBeNull();

    act(() => result.current.helpers.setError('foo'));
    expect(result.current.meta.error).toBe('foo');

    act(() => form.setFieldError('info.firstName', 'bar'));
    expect(result.current.meta.error).toBe('bar');

    act(() => result.current.helpers.setValue('Mike'));
    expect(result.current.meta.error).toBeNull();
  });

  it('should not render when state not changed', () => {
    const { wrapper: Wrapper, form } = createData();
    const spy = jest.fn();

    const Component = () => {
      useField('info.lastName');
      spy();

      return null;
    };

    render(
      <Wrapper>
        <Component />
      </Wrapper>,
    );

    reactAct(() => form.setFieldValue('info.firstName', 'Mike'));
    expect(spy).toBeCalledTimes(1);
  });
});
