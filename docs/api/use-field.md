# useField\(\)

This hook subscribes to the part of the form specified in `name` and returns props for text field, meta information, and helpers.

## Import

```javascript
import { useField } from 'exeform';
```

## **Types**

See the API for `Field` [here](field.md).

```javascript
useField(name: string): Field
```

## Example

For nested values, use `name` as described [here](../guides/nested-structures.md).

```javascript
const TextField = ({ name, ...rest }) => {
  const { field, meta, helpers } = useField(name);
  const error = meta.touched ? meta.error : null;

  return (
    <div>
      <input {...field} {...rest} />
      {error ? <div>{error}</div> : null}
    </div>
  );
};

<TextField name="author.firstName" />
```

