import { useRef } from 'react';
import { useTodosStore } from '../store';
import { ErrorMessage } from '../constants';
import type { Task } from '../types';

export function DeleteAllDialog() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const tasks: Task[] | null = useTodosStore((state) => state.todos);
  const deleteallTodos = useTodosStore((state) => state.deleteAllTodos);
  const addError = useTodosStore((state) => state.addError);

  const closeModal = () => {
    if (dialogRef.current !== null) {
      dialogRef.current.close()
    }
  }

  const openModal = () => {
    if (dialogRef.current !== null) {
      dialogRef.current.showModal()
    }
  }

  return (
    <>
      <button
        id='btn-delete-all'
        type="button"
        onClick={() => {
          if (tasks !== null && tasks.length > 0) {
            openModal()
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
              deleteallTodos();
              closeModal();
            }}
          >
            Yes
          </button>
          <button type="button" onClick={closeModal}>
            No
          </button>
        </div>
      </dialog>
    </>
  );
}
