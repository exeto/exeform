export type Touched = {
  [path: string]: boolean | undefined;
};

export type Errors = {
  [path: string]: string | undefined;
};

export type Validate<Values> = (values: Values) => Errors;

export type Options<Values> = {
  initialValues: Values;
  validate?: Validate<Values>;
};

export type Listener = () => void;

export type Unsubscribe = () => void;

export type FormType<Values = any> = {
  values: Values;
  touched: Touched;
  errors: Errors;
  isValid: boolean;
  setFieldValue(name: string, value: any): void;
  setFieldTouched(name: string, isTouched?: boolean): void;
  setFieldError(name: string, message: string): void;
  touchAllFields(): void;
  subscribe(listener: Listener): Unsubscribe;
};
