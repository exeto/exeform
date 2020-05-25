# useFormContext\(\)

This hook returns [Form](form.md)

## Import

```javascript
import { useFormContext } from 'exeform';
```

## **Types**

```javascript
useFormContext(): Form
```

## Example

```javascript
const Errors = () => {
  const form = useFormContext();
  const [errors, setErrors] = useState(form.errors);

  useEffect(() => {
    const unsubscribe = form.subscribe(() => {
      setErrors(form.errors);
    });

    return unsubscribe;
  }, [form]);

  return (
    <div>
      {Object.entries(errors).map(([name, error]) => (
        <p key={name}>
          {name}: {error}
        </p>
      ))}
    </div>
  );
};
```

