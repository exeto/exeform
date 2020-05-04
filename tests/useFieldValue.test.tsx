import { renderHook } from '@testing-library/react-hooks';

import { useFieldValue } from '../src';
import { createData } from './useField.test';

describe('useFieldValue', () => {
  it('should return value', () => {
    const { result } = renderHook(() => useFieldValue('info.firstName'), {
      wrapper: createData().wrapper,
    });

    expect(result.current).toBe('John');
  });
});
