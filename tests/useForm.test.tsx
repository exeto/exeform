import '@testing-library/jest-dom';

import React, { useContext } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent } from '@testing-library/react';

import { useForm } from '../src';
import { FormContext } from '../src/context';

const values = {
  info: {
    firstName: 'John',
  },
};

const options = {
  initialValues: values,
  onSubmit: () => {},
};

describe('useForm', () => {
  const { result: commonResult } = renderHook(() => useForm(options));

  it('should return form instance', () => {
    expect(commonResult.current.form.values).toBe(values);
  });

  it('should add form instance to context', () => {
    const { result } = renderHook(() => useContext(FormContext), {
      wrapper: commonResult.current.Form,
    });

    expect(result.current).toBe(commonResult.current.form);
  });

  it('should submit form', async () => {
    const onSubmit = jest.fn();

    const { result } = renderHook(() =>
      useForm({
        initialValues: values,
        onSubmit,
      }),
    );

    const { Form } = result.current;

    const { getByTestId } = render(
      <Form>
        <button data-testid="button">Submit</button>
      </Form>,
    );

    expect(onSubmit).not.toBeCalled();

    fireEvent.click(getByTestId('button'));
    expect(onSubmit).toBeCalledTimes(1);
  });

  it('should submit custom onSubmit', () => {
    const onSubmit = jest.fn();
    const customHandleSubmit = jest.fn((event) => event.preventDefault());

    const { result } = renderHook(() =>
      useForm({
        initialValues: values,
        onSubmit: onSubmit,
      }),
    );

    const { Form } = result.current;

    const { getByTestId } = render(
      <Form onSubmit={customHandleSubmit}>
        <button data-testid="button">Submit</button>
      </Form>,
    );

    expect(customHandleSubmit).not.toBeCalled();

    fireEvent.click(getByTestId('button'));
    expect(onSubmit).not.toBeCalled();
    expect(customHandleSubmit).toBeCalledTimes(1);
  });
});
