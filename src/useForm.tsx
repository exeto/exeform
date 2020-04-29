import React, { useCallback, useRef, FC } from 'react';

import createForm from './createForm';
import Form from './Form';
import { Options } from './types';

const useForm = <Values,>(options: Options<Values>) => {
  const formRef = useRef(createForm(options));
  const form = formRef.current;

  const FormWithContext: FC<JSX.IntrinsicElements['form']> = useCallback(
    (props) => <Form {...props} form={form} />,
    [form],
  );

  return {
    form,
    Form: FormWithContext,
  };
};

export default useForm;
