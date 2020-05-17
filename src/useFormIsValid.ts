import { useState, useEffect } from 'react';

import useFormContext from './useFormContext';

const useFormIsValid = () => {
  const form = useFormContext();
  const [isValid, setIsValid] = useState(form.isValid);

  useEffect(() => {
    const unsubscribe = form.subscribe(() => setIsValid(form.isValid));

    return unsubscribe;
  }, [form]);

  return isValid;
};

export default useFormIsValid;
