import React, { PropsWithChildren } from 'react';

import { FormProvider } from './context';
import { Form as FormType } from './types';

type Props<Values> = JSX.IntrinsicElements['form'] & {
  form: FormType<Values>;
};

const Form = <Values,>(props: PropsWithChildren<Props<Values>>) => {
  const { form, ...rest } = props;

  return (
    <FormProvider value={form}>
      <form {...rest} noValidate />
    </FormProvider>
  );
};

export default Form;
