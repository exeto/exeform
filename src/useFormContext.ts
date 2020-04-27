import { useContext } from 'react';

import { FormContext } from './context';

const useFormContext = () => {
  const form = useContext(FormContext);

  if (!form) {
    throw new Error(
      'Could not find exeform context value; please ensure the component is wrapped in a <Form>',
    );
  }

  return form;
};

export default useFormContext;
