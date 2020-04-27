import React, { useCallback, PropsWithChildren } from 'react';

import { FormProvider } from './context';
import { Form as FormType, FormProps } from './types';

type Props<Values> = FormProps<Values> & {
  form: FormType<Values>;
};

const Form = <Values,>(props: PropsWithChildren<Props<Values>>) => {
  const { form, onSubmit, ...rest } = props;

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      form.touchAllFields();

      if (form.isValid) {
        onSubmit(form.values);
      }
    },
    [onSubmit, form],
  );

  return (
    <FormProvider value={form}>
      <form {...rest} noValidate onSubmit={handleSubmit} />
    </FormProvider>
  );
};

export default Form;
