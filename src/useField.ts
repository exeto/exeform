import { useCallback, useEffect, useState, ChangeEvent } from 'react';

import { get } from './utils';
import useFormContext from './useFormContext';

const useField = (name: string) => {
  const form = useFormContext();
  const [value, setValue] = useState(get(form.values, name));
  const [error, setError] = useState(form.errors[name] || null);
  const [touched, setTouched] = useState(form.touched[name] || false);

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
      setValueHelper(target.value);
    },
    [setValueHelper],
  );

  const onBlur = useCallback(() => {
    setTouchedHelper();
  }, []);

  return {
    field: { name, value, onChange, onBlur },
    meta: { error, touched },
    helpers: {
      setValue: setValueHelper,
      setTouched: setTouchedHelper,
      setError: setErrorHelper,
    },
  };
};

export default useField;
