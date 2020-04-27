import { createContext } from 'react';

import { Form } from './types';

export const FormContext = createContext<Form | null>(null);

export const FormProvider = FormContext.Provider;
