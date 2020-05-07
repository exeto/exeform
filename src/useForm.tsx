import { useRef } from 'react';

import createForm from './createForm';
import { Options } from './types';

const useForm = <Values,>(options: Options<Values>) => {
  const formRef = useRef(createForm(options));
  const form = formRef.current;

  return form;
};

export default useForm;
