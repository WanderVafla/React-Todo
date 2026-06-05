import { useState, type ReactNode } from 'react';
import { ErrorContext } from './ErorreContext';

export function ErrorProvoder({ children }: { children: ReactNode }) {
  const [errors, setErrors] = useState<string[]>([]);

  const addError = (error: string) => {
    setErrors((prevErrors) => [error, ...prevErrors])
  }
  
  const removeError = (indexError: number) => {
    setErrors((prevErrors) => prevErrors.filter((_, indexPrevError) => indexPrevError !== indexError))
  }
  return (
    <ErrorContext value={{ errors, addError, removeError }}>
      {children}
    </ErrorContext>
  );
}
