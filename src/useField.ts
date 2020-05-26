import { useCallback, useEffect, useState, ChangeEvent } from 'react';

import { get } from './utils';
import useFormContext from './useFormContext';

type State = {
  value: any;
  error: string | null;
  touched: boolean;
};

const equalState = (a: State, b: State) =>
  a.value === b.value && a.error === b.error && a.touched === b.touched;

const useField = (name: string) => {
  const form = useFormContext();

  const getState = () => ({
    value: get(form.values, name),
    error: form.errors[name] || null,
    touched: form.touched[name] || false,
  });

  const [state, setState] = useState(getState);

  useEffect(() => {
    const unsubscribe = form.subscribe(() => {
      const newState = getState();

      setState((prevState) =>
        equalState(prevState, newState) ? prevState : newState,
      );
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
    field: { name, value: state.value, onChange, onBlur },
    meta: { error: state.error, touched: state.touched },
    helpers: {
      setValue: setValueHelper,
      setTouched: setTouchedHelper,
      setError: setErrorHelper,
    },
  };
};

export default useField;
