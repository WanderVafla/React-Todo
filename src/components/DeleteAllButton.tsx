import { useEffect, useRef, useState } from 'react';
import { useTodosStore } from '../store';
import { ErrorMessage } from '../constants';
import type { Task } from '../types';

export function DeleteAllDialog() {
  const [opened, isOpened] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const tasks: Task[] | null = useTodosStore((state) => state.todos);
  const deleteallTodos = useTodosStore((state) => state.deleteAllTodos);
  const addError = useTodosStore((state) => state.addError);

  useEffect(() => {
    if (dialogRef.current !== null) {
      if (opened) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [opened, dialogRef]);

  return (
    <>
      <button
        id='btn-delete-all'
        type="button"
        onClick={() => {
          if (tasks !== null && tasks.length > 0) {
            isOpened(true);
          } else {
            addError(ErrorMessage.haveNotTasks);
          }
        }}
      >
        Remove All Task
      </button>

      <dialog ref={dialogRef} id="delete-all-modal">
        <span>Want delete all your tasks?</span>
        <div>
          <button
            type="button"
            onClick={() => {
              isOpened(false);
              deleteallTodos();
            }}
          >
            Yes
          </button>
          <button type="button" onClick={() => isOpened(false)}>
            No
          </button>
        </div>
      </dialog>
    </>
  );
}
