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
      {errors.map(error => (<ErrorItem error={error} />))}
    </div>
  );
}

function ErrorItem({ error }: { error: string }) {
  return <span>{error}</span>;
}
