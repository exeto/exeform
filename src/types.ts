import { ChangeEvent } from 'react';

export type Touched = {
  [path: string]: boolean;
};

export type Errors = {
  [path: string]: string;
};

export type Validate<Values> = (values: Values) => Errors;

export type Options<Values> = {
  initialValues: Values;
  onSubmit(values: Values): void;
  validate?: Validate<Values>;
};

export type FieldOptions = {
  type: 'generic' | 'checkbox';
};

export type Field = {
  name: string;
  value: any;
  checked?: boolean;
  onChange: ({ target }: ChangeEvent<any>) => void;
  onBlur: () => void;
};

export type Listener = () => void;

export type Unsubscribe = () => void;

export type Form<Values = any> = {
  values: Values;
  touched: Touched;
  errors: Errors;
  isValid: boolean;
  setFieldValue(name: string, value: any): void;
  setFieldTouched(name: string, isTouched?: boolean): void;
  setFieldError(name: string, message: string): void;
  touchAllFields(): void;
  submit(): void;
  subscribe(listener: Listener): Unsubscribe;
};
