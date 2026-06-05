import { use } from "react";
import { ErrorContext } from "./context/ErorreContext";

export function ErrorFrame() {
  const errorsConstext = use(ErrorContext)
  const { errors, removeError } = errorsConstext
  if (!errorsConstext) {
    return <p>Error: ItemList must be used within an ItemsProvider</p>;
  }

  return (
    <div id="error-frame">
      {errors.map((error, indexError) => (<ErrorItem index={indexError} error={error} onRemove={removeError} />))}
    </div>
  );
}

function ErrorItem({ index, error, onRemove }: { index: number, error: string, onRemove: (indexError: number) => void }) {
  return <span>
    {error}
    <button id={String(index)} onClick={() => onRemove(index)}>X</button>
    </span>;
}
