# useFieldValue\(\)

This hook subscribes to the part of the form specified in `name` and returns value.

## Import

```javascript
import { useFieldValue } from 'exeform';
```

## **Types**

```javascript
useFieldValue(name: string): any
```

## Example

For nested values, use `name` as described [here](../guides/nested-structures.md).

```javascript
const Items = () => {
  const items = useFieldValue('items');

  return (
    <div>
      {items.map((item, index) => (
        <Item name={`items[${index}]`} />
      ))}
    </div>
  );
};
```

