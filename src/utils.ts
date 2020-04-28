import { Errors, Touched } from './types';

const isNull = (value: any) => value === null;

const isObject = (value: any): value is { [key: string]: any } =>
  !isNull(value) && typeof value === 'object';

const isNumber = (value: any): value is number => typeof value === 'number';

const isString = (value: any): value is string => typeof value === 'string';

const parseName = (name: string) =>
  name.split('.').reduce((acc: (string | number)[], key) => {
    const match = key.match(/(.+)\[(\d+)\]$/);

    if (match) {
      acc.push(match[1], Number(match[2]));
    } else {
      acc.push(key);
    }

    return acc;
  }, []);

export const get = <Values>(values: Values, name: string) => {
  const getInner = (keys: (string | number)[], valuesInner: any): any => {
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

  return getInner(parseName(name), values);
};

export const set = <Values>(
  values: Values,
  name: string,
  value: any,
): Values => {
  const setInner = (keys: (string | number)[], valuesInner: any): any => {
    if (!keys.length) {
      return value;
    }

    const [key, ...restKeys] = keys;

    if (!isObject(valuesInner) && !Array.isArray(valuesInner)) {
      valuesInner = isNumber(key) ? [] : {};
    }

    if (isString(key) && isObject(valuesInner)) {
      return {
        ...valuesInner,
        [key]: setInner(restKeys, valuesInner[key]),
      };
    }

    const arr = valuesInner.slice();

    arr[key] = setInner(restKeys, valuesInner[key]);

    return arr;
  };

  return setInner(parseName(name), values);
};

export const getTouched = (errors: Errors) =>
  Object.keys(errors).reduce((acc: Touched, key) => {
    acc[key] = true;

    return acc;
  }, {});

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
