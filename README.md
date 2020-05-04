![exeform](media/logo.svg)

> Forms with minimum code and maximum performance

- Maximum out-of-the-box performance
- Modern and minimalistic API
- Small size, [1.7 KB](https://bundlephobia.com/result?p=exeform) (minified and gzipped)
- No dependencies

## Install

```sh
yarn add exeform
```

## Usage

```js
import { useForm, useField } from 'exeform';

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

const TextField = ({ name, ...rest }) => {
  const { field, meta } = useField(name);
  const error = meta.touched ? meta.error : null;

  return (
    <div>
      <input {...field} {...rest} />
      {error ? <div>{error}</div> : null}
    </div>
  );
};

const Login = () => {
  const { Form } = useForm({
    validate,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Form>
      <TextField name="email" placeholder="email">
      <TextField password="password" placeholder="password">
    </Form>
  );
};
```

## License

[MIT](LICENSE.md) © [Timofey Dergachev](https://exeto.me)
