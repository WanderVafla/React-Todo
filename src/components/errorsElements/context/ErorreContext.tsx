import { createContext } from 'react';
import type { ErrorsContextType } from '../../../types';

export const ErrorContext = createContext<ErrorsContextType | null>(null);
