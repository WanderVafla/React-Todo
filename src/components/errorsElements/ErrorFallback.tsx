import { getErrorMessage, type FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="error-fallback">
      <h2>We can't charge your tasks</h2>
      <pre>{getErrorMessage(error)}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}
