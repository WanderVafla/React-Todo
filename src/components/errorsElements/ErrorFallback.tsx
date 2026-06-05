import { getErrorMessage, type FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  // console.log(error);

  return (
    <div className="error-frame" role="alert">
      <p>We can't charge your tasks</p>
      <pre>{getErrorMessage(error)}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}
