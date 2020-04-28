import { set, getTouched, omitOne, isEmpty, pick } from './utils';
import { Options, Form, Listener, Touched, Errors } from './types';

const defaultValidate = () => ({});

const createForm = <Values>(options: Options<Values>): Form<Values> => {
  const { validate = defaultValidate, initialValues } = options;
  const listeners: Listener[] = [];
  let values = initialValues;
  let touched: Touched = {};
  let errors = validate(initialValues);
  let externalErrors: Errors = {};

  const notify = () => {
    const currentListeners = listeners.slice();

    currentListeners.forEach((listener) => listener());
  };

  const setFieldTouched = (name: string, isTouched = true) => {
    touched = isTouched
      ? { ...touched, [name]: isTouched }
      : omitOne(touched, name);
  };

  const getErrors = () => ({ ...errors, ...externalErrors });

  return {
    get values() {
      return values;
    },

    get touched() {
      return touched;
    },

    get errors() {
      return getErrors();
    },

    get isValid() {
      return isEmpty(getErrors());
    },

    setFieldValue(name, value) {
      values = set(values, name, value);
      errors = validate(values);
      externalErrors = omitOne(externalErrors, name);
      touched = pick(touched, Object.keys(getErrors()));

      notify();
    },

    setFieldTouched(name, isTouched) {
      setFieldTouched(name, isTouched);
      notify();
    },

    setFieldError(name, message) {
      externalErrors = { ...externalErrors, [name]: message };

      setFieldTouched(name);
      notify();
    },

    touchAllFields() {
      touched = getTouched(errors);

      notify();
    },

    subscribe(fn) {
      listeners.push(fn);

      const unsubscribe = () => {
        const index = listeners.indexOf(fn);

        listeners.splice(index, 1);
      };

      return unsubscribe;
    },
  };
};

export default createForm;
