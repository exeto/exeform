import { Errors, Touched } from './types';

const isNull = (value: any) => value === null;

const isObject = (value: any): value is object =>
  !isNull(value) && typeof value === 'object';

const isNumber = (value: any): value is number => typeof value === 'number';

const parseKey = (key: string) => {
  const int = Number(key);

  return Number.isNaN(int) ? key : int;
};

export const get = <Values>(values: Values, name: string) => {
  const getInner = (keys: string[], valuesInner: any): any => {
    if (!keys.length) {
      return valuesInner;
    }

    const [key, ...restKeys] = keys;
    const value = valuesInner[key];

    if (Array.isArray(value) || isObject(value)) {
      return getInner(restKeys, value);
    }

    return restKeys.length ? undefined : value;
  };

  return getInner(name.split('.'), values);
};

export const set = <Values>(
  values: Values,
  name: string,
  value: any,
): Values => {
  const setInner = (keys: string[], valuesInner: any): any => {
    if (!keys.length) {
      return value;
    }

    const [key, ...restKeys] = keys;
    const valueInner = valuesInner[key];

    if (isObject(valuesInner)) {
      return {
        ...valuesInner,
        [key]: setInner(restKeys, valueInner),
      };
    }

    if (Array.isArray(valuesInner)) {
      const copy = valuesInner.slice();

      copy[Number(key)] = setInner(restKeys, valueInner);

      return copy;
    }

    const empty = isNumber(parseKey(key)) ? [] : {};

    return setInner(restKeys, empty);
  };

  return setInner(name.split('.'), values);
};

export const getTouched = (errors: Errors) =>
  Object.keys(errors).reduce((acc, key) => {
    acc[key] = true;

    return acc;
  }, {} as Touched);

export const omitOne = <T extends any>(values: T, key: string): T => {
  const copy = { ...values };

  delete copy[key];

  return copy;
};

export const isEmpty = (value: {}) => Boolean(Object.keys(value).length);

export const pick = <T extends any>(values: T, keys: string[]) =>
  keys.reduce((acc, key) => {
    acc[key] = values[key];

    return acc;
  }, {} as T);
