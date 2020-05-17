import React, { FC } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { useFormIsValid } from '../src';
import createForm from '../src/createForm';
import { FormProvider } from '../src/context';

const createData = () => {
  const form = createForm({
    initialValues: {
      firstName: null,
    },
    validate: (values) => (values.firstName ? {} : { firstName: 'error' }),
  });

  const wrapper: FC = ({ children }) => (
    <FormProvider value={form}>{children}</FormProvider>
  );

  return { form, wrapper };
};

describe('useFormIsValid', () => {
  it('should return validation status', () => {
    const { form, wrapper } = createData();
    const { result } = renderHook(() => useFormIsValid(), { wrapper });

    expect(result.current).toBe(false);

    act(() => form.setFieldValue('firstName', 'John'));
    expect(result.current).toBe(true);
  });
});
