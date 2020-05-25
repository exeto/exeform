# Nested Structures

The library supports nested structures. Getting an object property is done through a dot, getting an array element through square brackets.

A flat structure is used for `values` and `errors`. The `values` retain their initial structure.

```javascript
const initialValues = {
  text: 'Hello, world!',
  author: {
    firstName: 'John',
    lastName: null,
  },
  comments: [
    {
      text: 'Hello',
    },
    {
      text: null,
    },
  ],
};

const form = useForm({ initialValues });

// form.touched
{
  'text': true,
  'author.firstName': true,
  'comments[0].text': true,
};

// form.errors
{
  'text': 'Something',
  'author.firstName': 'Field is required',
  'comments[1].text': 'Field is required',
};
```

