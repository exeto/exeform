# Form

A form object that contains the core library logic.

## Properties

### `values`

```typescript
{ [key: string]: any }
```

This is a getter that returns current values

### `touched`

```typescript
{ [path: string]: boolean }
```

This is a getter that returns current touched. These values are needed when you want to show errors only after the user has touched the field. Usually marked as touched after calling the `onBlur` event. The values are flat, see [detail](../guides/nested-structures.md).

### `errors`

```typescript
{ [path: string]: string }
```

This is a getter that returns current errors. The values are flat, see [detail](../guides/nested-structures.md).

### `isValid`

```typescript
boolean
```

## Methods

### `setFieldValue`

```typescript
setFieldValue(name: string, value: any): void
```

Sets a new value, starts validations and notifies all subscribers. For nested values, use `name` as described [here](../guides/nested-structures.md).

### `setFieldTouched`

```typescript
setFieldTouched(name: string, isTouched?: boolean): void
```

Marks the field as touched or not and notifies all subscribers. Value by default is `true`. For nested values, use `name` as described [here](../guides/nested-structures.md).

### `setFieldError`

```typescript
setFieldError(name: string, message: string): void
```

This sets an external error for the field, marks the field as touched, and notifies all subscribers. After changing the field value, this error is reset. For nested values, use `name` as described [here](../guides/nested-structures.md).

### `touchAllFields`

```typescript
touchAllFields(): void
```

Marks all fields with errors as touched and notifies all subscribers. This is useful after trying to submit a form.

### `reset`

```typescript
reset(): void
```

Sets the initial values for the `values`, `touched`, `errors`, and notifies all subscribers.

### `subscribe`

```typescript
Listener(): void
Unsubscribe(): void

subscribe(listener: Listener): Unsubscribe
```

Adds a subscriber and returns the unsubscribe function.

**Please note:** the list of subscribers remains unchanged until all subscribers are called. You should keep this in mind when one of the subscribers may initiate the unsubscription of another subscriber. 

