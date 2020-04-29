import React, { useCallback, PropsWithChildren } from 'react';

import { FormProvider } from './context';
import { Form as FormType } from './types';

type Props<Values> = JSX.IntrinsicElements['form'] & {
  form: FormType<Values>;
};

const Form = <Values,>(props: PropsWithChildren<Props<Values>>) => {
  const { form, onSubmit, ...rest } = props;

  const handleSubmit = useCallback(
    (event) => {
      if (onSubmit) {
        onSubmit(event);
      } else {
        event.preventDefault();
        form.submit();
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
