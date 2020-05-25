# Validation

Validation runs in the process of updating the `values`. Validate is a function that returns an object with `errors`, where the key is represented in a flat form.

## Example

```javascript
// Without errors
const validate = (values) => ({});

// For simple values
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

// For nested values
const validate = (values) => {
  const errors = {};

  if (!values.author.firstName) {
    errors['author.firstName'] = 'This field is required';
  }

  if (!values.comments[1].text) {
    errors['comments[1].text'] = 'This field is required';
  }

  return errors;
};
```

