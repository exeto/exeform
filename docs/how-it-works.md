# How It Works

The library is built on subscriptions, like redux. When creating a form, an [object](api/form.md) is created that contains the main logic for working with values, errors, and validations.

The form object is stored in the React context. Components [subscribe](api/use-field.md) to change the state of a specific part of the form, which allows you to get maximum performance.

