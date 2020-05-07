import '@testing-library/jest-dom';

import React, { useContext } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent } from '@testing-library/react';

import { Form } from '../src';
import { FormContext } from '../src/context';

describe('Form', () => {
  it('should add form instance to context', () => {
    const form: any = 'form-instance';

    const { result } = renderHook(() => useContext(FormContext), {
      wrapper: (props) => <Form {...props} form={form} />,
    });

    expect(result.current).toBe(form);
  });

  it('should submit form', () => {
    const onSubmit = jest.fn();
    const handleSubmit = jest.fn((event) => event.preventDefault());

    const form: any = 'form-instance';

    const { getByTestId } = render(
      <Form form={form} onSubmit={handleSubmit}>
        <button data-testid="button">Submit</button>
      </Form>,
    );

    expect(handleSubmit).not.toBeCalled();

    fireEvent.click(getByTestId('button'));
    expect(onSubmit).not.toBeCalled();
    expect(handleSubmit).toBeCalledTimes(1);
  });
});
