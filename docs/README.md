# Getting Started

![](.gitbook/assets/logo.svg) 

> Forms with minimum code and maximum performance

## Features

* Maximum out-of-the-box performance
* Modern and minimalistic API
* Small size, [2 KB](https://bundlephobia.com/result?p=exeform) \(minified and gzipped\)
* No dependencies

## Install

Install using `yarn`:

```bash
yarn add exeform
```

Or `npm`:

```javascript
npm install exeform
```

## Basic Example

```javascript
import React from 'react';
import { Form, useForm, useField } from 'exeform';

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
  const form = useForm({
    validate,
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    form.touchAllFields();

    if (form.isValid) {
      console.log(form.values);
      form.reset();
    }
  };

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <TextField name="email" placeholder="email">
      <TextField password="password" placeholder="password">
      <button type="submit">Submit<button>
    </Form>
  );
};
```

## License

[MIT](https://github.com/exeto/exeform/blob/master/LICENSE.md) © [Timofey Dergachev](https://exeto.me/)

