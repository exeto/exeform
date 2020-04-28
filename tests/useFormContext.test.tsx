import React, { FC } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useFormContext } from '../src';
import { FormProvider } from '../src/context';

describe('useFormContext', () => {
  it('should throw error if no form in context', () => {
    const { result } = renderHook(() => useFormContext());

    expect(result.error).toEqual(
      Error(
        'Could not find exeform context value; please ensure the component is wrapped in a <Form>',
      ),
    );
  });

  it('should return form context', () => {
    const form = 'form-context';
    const wrapper: FC = ({ children }) => (
      <FormProvider value={form as any}>{children}</FormProvider>
    );
    const { result } = renderHook(() => useFormContext(), { wrapper });

    expect(result.current).toBe('form-context');
  });
});
