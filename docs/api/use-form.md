# useForm\(\)

This hook creates [`Form`](form.md) and returns it. It does not change during the component's lifecycle.

## Import

```javascript
import { useForm } from 'exeform';
```

## **Types**

```javascript
Values = {
  [key: string]: any
}

Errors = {
  [path: string]: string
}

Validate(values: Values): Errors

Options = {
  initialValues: Values
  validate?: Validate
}

useForm(options: Options): Form
```

## Example

For more information about the validation, see [here](../guides/validation.md).

```javascript
const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'This field is required';
  }

  if (!values.password) {
    errors.password = 'This field is required';
  }

  return errors;
};

const form = useForm({
  validate,
  initialValues: {
    email: '',
    password: '',
  },
});
```

