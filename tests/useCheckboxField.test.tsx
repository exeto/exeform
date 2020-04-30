import { renderHook, act } from '@testing-library/react-hooks';

import { useCheckboxField } from '../src';
import { createData } from './useField.test';

const createEvent = (checked: any): any => ({ target: { checked } });

describe('useCheckboxField', () => {
  it('should check field with type checkbox', () => {
    const { result } = renderHook(() => useCheckboxField('registered'), {
      wrapper: createData().wrapper,
    });

    expect(result.current.field.checked).toBe(false);

    act(() => {
      result.current.field.onChange(createEvent(true));
    });
    expect(result.current.field.checked).toBe(true);

    act(() => {
      result.current.field.onChange(createEvent(false));
    });
    expect(result.current.field.checked).toBe(false);
  });

  it('should return boolean even if input value are not', () => {
    const { result } = renderHook(() => useCheckboxField('info.firstName'), {
      wrapper: createData().wrapper,
    });

    expect(result.current.field.checked).toBe(true);

    act(() => {
      result.current.field.onChange(createEvent(false));
    });
    expect(result.current.field.checked).toBe(false);
  });
});
