import { useCallback, ChangeEvent } from 'react';

import useField from './useField';

const useCheckboxField = (name: string) => {
  const { field, meta, helpers } = useField(name);
  const { value, ...rest } = field;

  const onChange = useCallback(({ target }: ChangeEvent<any>) => {
    helpers.setValue(target.checked);
  }, []);

  return {
    field: {
      ...rest,
      checked: Boolean(value),
      onChange,
    },
    meta,
    helpers,
  };
};

export default useCheckboxField;
