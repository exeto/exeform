# useCheckboxField\(\)

This hook subscribes to the part of the form specified in `name` and returns props for checkbox field, meta information, and helpers.

## Import

```javascript
import { useCheckboxField } from 'exeform';
```

## **Types**

The returned value is almost identical to [`Field`](field.md). The only difference is that the `checked` field is present instead of `value`.

### `useCheckboxField`

```javascript
useCheckboxField(name: string): CheckboxField
```

### `field.checked`

```javascript
boolean
```

## Example

For nested values, use `name` as described [here](../guides/nested-structures.md).

```javascript
const Checkbox = ({ name, ...rest }) => {
  const { field, meta, helpers } = useCheckboxField(name);
  const error = meta.touched ? meta.error : null;

  return (
    <div>
      <input {...field} {...rest} type="checkbox" />
      {error ? <div>{error}</div> : null}
    </div>
  );
};

<Checkbox name="activated" />
```

