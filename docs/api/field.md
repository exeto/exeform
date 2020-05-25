# Field

This contains props for text fields, meta information, and helpers.

## field

Props for text field

### `name`

```typescript
string
```

Field name

### `value`

```typescript
any
```

Field value from values by `name` path

### `onChange`

```typescript
onChange(event: ChangeEvent<any>): void
```

Change event handler

### `onBlur`

```typescript
onBlur(): void
```

Blur event handler

## meta

### `error`

```typescript
string | null
```

Field error from errors by `name` path

### `touched`

```typescript
boolean
```

Field touched from all touched by `name` path

## helpers

### `setValue`

```typescript
setValue(value: any): void
```

Sets a new value for the field

### `setTouched`

```typescript
setTouched(isTouched?: boolean): void
```

Sets a new touched status for the field. Value by default is `true`.

### `setError`

```typescript
setError(message: string): void
```

Sets an external error for the field

