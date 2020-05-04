![exeform](media/logo.svg)

[![npm](https://flat.badgen.net/npm/v/exeform)](https://www.npmjs.com/package/exeform)
[![npm bundle size](https://flat.badgen.net/bundlephobia/minzip/exeform)](https://bundlephobia.com/result?p=exeform)
[![coverage](https://flat.badgen.net/codecov/c/github/exeto/exeform)](https://codecov.io/gh/exeto/exeform)
[![license](https://flat.badgen.net/github/license/exeto/exeform)](LICENSE.md)

> Forms with minimum code and maximum performance

- Maximum out-of-the-box performance
- Modern and minimalistic API
- Small size, [2 KB](https://bundlephobia.com/result?p=exeform) (minified and gzipped)
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
      <button type="submit">Submit<button>
    </Form>
  );
};
```

## License

[MIT](LICENSE.md) © [Timofey Dergachev](https://exeto.me)
