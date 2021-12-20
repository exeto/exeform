import createForm from '../src/createForm';

describe('createForm', () => {
  const initialValues = {
    id: 42,
    info: {
      firstName: 'John',
    },
  };

  it('should return initial value', () => {
    const form = createForm({ initialValues });

    expect(form.values).toBe(initialValues);
    expect(form.touched).toEqual({});
    expect(form.errors).toEqual({});
  });

  it('should change field value', () => {
    const form = createForm({ initialValues });

    form.setFieldValue('id', 84);
    expect(form.values).toMatchSnapshot();

    form.setFieldValue('info.firstName', 'Mike');
    expect(form.values).toMatchSnapshot();
  });

  it('should touch field', () => {
    const form = createForm({ initialValues });

    expect(form.touched).toEqual({});

    form.setFieldTouched('id');
    expect(form.touched).toEqual({ id: true });

    form.setFieldTouched('info.firstName');
    expect(form.touched).toEqual({ id: true, 'info.firstName': true });

    form.setFieldTouched('id', false);
    expect(form.touched).toEqual({ 'info.firstName': true });

    form.setFieldTouched('info.firstName', false);
    expect(form.touched).toEqual({});
  });

  it('should add custom error for field', () => {
    const form = createForm({ initialValues });

    expect(form.errors).toEqual({});
    expect(form.isValid).toBe(true);

    form.setFieldError('id', 'id-error');
    expect(form.errors).toEqual({ id: 'id-error' });
    expect(form.touched).toEqual({ id: true });
    expect(form.isValid).toBe(false);

    form.setFieldError('info.firstName', 'info.firstName-error');
    expect(form.errors).toEqual({
      id: 'id-error',
      'info.firstName': 'info.firstName-error',
    });
    expect(form.touched).toEqual({ id: true, 'info.firstName': true });
    expect(form.isValid).toBe(false);
  });

  it('should remove custom error after field change', () => {
    const form = createForm({ initialValues });

    form.setFieldError('id', 'error');
    expect(form.errors).toEqual({ id: 'error' });
    expect(form.touched).toEqual({ id: true });
    expect(form.isValid).toBe(false);

    form.setFieldValue('id', 84);
    expect(form.errors).toEqual({});
    expect(form.touched).toEqual({});
    expect(form.isValid).toBe(true);
  });

  it('should update touched after setFieldValue', () => {
    const form = createForm({
      initialValues: { flag: false, foo: '', bar: '' },
      validate: (values) => (values.flag ? { foo: 'error', bar: 'error' } : {}),
    });

    expect(form.touched).toEqual({});

    form.setFieldValue('flag', true);
    expect(form.touched).toEqual({ foo: false, bar: false });
  });

  it('should touch all fields with error', () => {
    const form = createForm({
      initialValues,
      validate: () => ({ id: 'error', 'info.firstName': 'error' }),
    });

    expect(form.touched).toEqual({});

    form.touchAllFields();
    expect(form.touched).toEqual({ id: true, 'info.firstName': true });

    form.setFieldError('info', 'custom-error');
    form.touchAllFields();
    expect(form.touched).toEqual({
      id: true,
      'info.firstName': true,
      info: true,
    });
  });

  it('should run listeners after change form state', () => {
    const form = createForm({ initialValues });
    const spy1 = jest.fn();
    const spy2 = jest.fn();

    form.subscribe(spy1);
    form.subscribe(spy2);

    expect(spy1).not.toBeCalled();
    expect(spy2).not.toBeCalled();

    form.setFieldValue('id', 84);
    expect(spy1).toBeCalledTimes(1);
    expect(spy2).toBeCalledTimes(1);

    form.setFieldTouched('id');
    expect(spy1).toBeCalledTimes(2);
    expect(spy2).toBeCalledTimes(2);

    form.setFieldError('id', 'error');
    expect(spy1).toBeCalledTimes(3);
    expect(spy2).toBeCalledTimes(3);

    form.touchAllFields();
    expect(spy1).toBeCalledTimes(4);
    expect(spy2).toBeCalledTimes(4);
  });

  it('should unsubscribe listener', () => {
    const form = createForm({ initialValues });
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const spy3 = jest.fn();

    form.subscribe(spy1);

    const unsubscribe = form.subscribe(spy2);

    form.subscribe(spy3);

    unsubscribe();
    form.setFieldValue('id', 84);

    expect(spy1).toBeCalledTimes(1);
    expect(spy2).not.toBeCalled();
    expect(spy3).toBeCalledTimes(1);
  });

  it('should check validate', () => {
    const form = createForm({
      initialValues: {
        id: null,
        info: {
          firstName: null,
        },
      },
      validate: (values) => {
        const errors: { [key: string]: any } = {};

        if (!values.id) {
          errors.id = 'error';
        }

        if (!values.info.firstName) {
          errors['info.firstName'] = 'error';
        }

        return errors;
      },
    });

    expect(form.errors).toEqual({ id: 'error', 'info.firstName': 'error' });
    expect(form.isValid).toBe(false);

    form.setFieldValue('info.firstName', 'John');
    expect(form.errors).toEqual({ id: 'error' });

    form.setFieldError('id', 'custom-error');
    expect(form.errors).toEqual({ id: 'custom-error' });

    form.setFieldValue('id', 42);
    expect(form.errors).toEqual({});
    expect(form.isValid).toBe(true);
  });

  it('should reset form', () => {
    const customInitialValues = { firstName: 'John' };

    const form = createForm({
      initialValues: customInitialValues,
      validate: (values) => (values.firstName ? {} : { firstName: 'error' }),
    });

    form.setFieldValue('firstName', 'Mike');
    form.setFieldError('firstName', 'external-error');

    const listener = jest.fn();

    form.subscribe(listener);
    form.reset();

    expect(listener).toBeCalledTimes(1);
    expect(form.values).toBe(customInitialValues);
    expect(form.errors).toEqual({});
    expect(form.touched).toEqual({});
  });
});
