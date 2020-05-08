import { createContext } from 'react';

import { FormType } from './types';

export const FormContext = createContext<FormType | null>(null);

export const FormProvider = FormContext.Provider;
