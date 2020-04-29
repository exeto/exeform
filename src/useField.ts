import { useCallback, useEffect, useState, ChangeEvent } from 'react';

import { get } from './utils';
import useFormContext from './useFormContext';
import { FieldOptions, Field } from './types';

const useField = (name: string, options?: FieldOptions) => {
  const form = useFormContext();
  const [value, setValue] = useState(get(form.values, name));
  const [error, setError] = useState(form.errors[name] || null);
  const [touched, setTouched] = useState(form.touched[name] || false);
  const type = options?.type || 'generic';
  const isCheckbox = type === 'checkbox';

  useEffect(() => {
    const unsubscribe = form.subscribe(() => {
      setValue(get(form.values, name));
      setError(form.errors[name] || null);
      setTouched(form.touched[name] || false);
    });

    return unsubscribe;
  }, [name, form]);

  const setValueHelper = useCallback(
    (value) => {
      form.setFieldValue(name, value);
    },
    [form, name],
  );

  const setTouchedHelper = useCallback(
    (isTouched = true) => {
      form.setFieldTouched(name, isTouched);
    },
    [form, name],
  );

  const setErrorHelper = useCallback(
    (message: string) => {
      form.setFieldError(name, message);
    },
    [form, name],
  );

  const onChange = useCallback(
    ({ target }: ChangeEvent<any>) => {
      setValueHelper(isCheckbox ? target.checked : target.value);
    },
    [isCheckbox, setValueHelper],
  );

  const onBlur = useCallback(() => {
    setTouchedHelper();
  }, []);

  const getGenericField = (): Field => ({ name, value, onChange, onBlur });

  const getCheckboxField = (): Field => ({
    ...getGenericField(),
    value: undefined,
    checked: value,
  });

  return {
    field: isCheckbox ? getCheckboxField() : getGenericField(),
    meta: { error, touched },
    helpers: {
      setValue: setValueHelper,
      setTouched: setTouchedHelper,
      setError: setErrorHelper,
    },
  };
};

export default useField;
