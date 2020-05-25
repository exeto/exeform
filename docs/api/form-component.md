# &lt;Form /&gt;

This is a wrapper for the `<form>` element, it adds the form object to the context and disables browser validation. All other props are passed directly through to the DOM node.

## Import

```javascript
import { Form } from 'exeform';
```

## Props

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| children | `node` |  | The content of the form |
| form \* | [`Form`](form.md) |  | The form object |

## Example

```javascript
import { Form, useForm } from 'exeform';

const App = () => {
  const form = useForm({
    initialValues: { name: 'John' },
  });
  
  const handleSubmit = (event) => {
    event.preventDefault();
    form.touchAllFields();

    if (form.isValid) {
      console.log(form.values);
      form.reset();
    }
  };
  
  return <Form form={form} onSubmit={handleSubmit}>...</Form>;
};
```

