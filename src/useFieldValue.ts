import useField from './useField';

const useFieldValue = (name: string) => useField(name).field.value;

export default useFieldValue;
