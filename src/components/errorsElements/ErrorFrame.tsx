import { use } from 'react';
import { ErrorContext } from './context/ErorreContext';

export function ErrorFrame() {
  const errorsConstext = use(ErrorContext);
  const { errors, removeError } = errorsConstext;

  return (
    <div id="error-frame">
      {errors.map((error, indexError) => (
        <ErrorItem key={`${indexError}-${error}`} index={indexError} error={error} onRemove={removeError} />
      ))}
    </div>
  );
}

function ErrorItem({
  index,
  error,
  onRemove,
}: {
  index: number;
  error: string;
  onRemove: (indexError: number) => void;
}) {
  return (
    <div className='error-item'>
      <span>
        {error}
      </span>
      <button id={String(index)} onClick={() => onRemove(index)}>
        X
      </button>
    </div>
  );
}
