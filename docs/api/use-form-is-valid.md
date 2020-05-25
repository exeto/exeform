# useFormIsValid\(\)

This hook returns the current form validity state.

## Import

```javascript
import { useFormIsValid } from 'exeform';
```

## **Types**

```javascript
useFormIsValid(): boolean
```

## Example

```javascript
const Submit = () => {
  const isValid = useFormIsValid();
  
  return (
    <button disabled={!isValid} type="submit">
      Submit
    </button>
  );
};
```

