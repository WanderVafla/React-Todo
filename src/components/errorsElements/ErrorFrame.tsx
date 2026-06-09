import { useTodosStore } from '../../store';

export function ErrorFrame() {
  const errors = useTodosStore((state) => state.errors);
  const removeError = useTodosStore((state) => state.removeError);
  console.log(errors);

  return (
    <div id="error-frame">
      {errors.map((error, indexError) => (
        <ErrorItem
          key={`${indexError}-${error}`}
          index={indexError}
          error={error}
          onRemove={removeError}
        />
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
    <div className="error-item">
      <span>{error}</span>
      <button id={String(index)} onClick={() => onRemove(index)}>
        X
      </button>
    </div>
  );
}
