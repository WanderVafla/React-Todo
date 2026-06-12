import { useActionState, useRef, useState } from 'react';
import type { Task } from '../../types';
import { ErrorMessage } from '../../constants';
import { isPassed } from '../../utils;
import { useTodosStore } from '../../store';

export function TodoItem({ task }: { task: Task }) {
  const [isChecked, setIsChecked] = useState(task.done);

  const changeTask = useTodosStore((state) => state.changeTodo);
  const deleteTask = useTodosStore((state) => state.deleteTodo);

  const handleChecked = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.checked;
    setIsChecked(target);
    changeTask(task.id, { done: target });
  };

  const remove = () => {
    deleteTask(task.id);
  };

  return (
    <>
      <div className="todo-item">
        <div className="todo-item-header">
          <h2 className="todo-item-title">{task.title}</h2>
          <div className="todo-item-data">
            <div className="todo-item-data-checked">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChecked}
                aria-label="complited"
              />
              {!task.due_date ? (
                <time dateTime="no date">no date</time>
              ) : (
                <time dateTime={task.due_date}>{task.due_date}</time>
              )}
            </div>
            <div>
              <EditModal
                taskName={task.title}
                due={task.due_date}
                content={task.content}
                taskId={task.id}
              />
              <button type="button" onClick={remove}>
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className="todo-iten-content">{task.content}</div>
      </div>
    </>
  );
}

function EditModal({
  taskName,
  due,
  content,
  taskId,
}: {
  taskName: string;
  due: string | null;
  content: string | null;
  taskId: number;
}) {
  const editModalRef = useRef<HTMLDialogElement | null>(null);
  const [_state, formAction, _isPending] = useActionState(
    (prevState: number, formData: FormData) =>
      updateTask(prevState, formData, editModalRef.current),
    taskId,
  );
  const openEditModal = () => {
    if (editModalRef.current !== null) {
      editModalRef.current.showModal();
    }
  };

  const closeEditModal = () => {
    if (editModalRef.current !== null) {
      editModalRef.current.close();
    }
  };

  return (
    <>
      <button type="button" onClick={openEditModal}>
        Edit
      </button>

      <dialog ref={editModalRef}>
        <form action={formAction}>
          <div className="todo-item-dialog">
            <div className="todo-item-header">
              <input type="text" name="title" defaultValue={taskName} />
              <div className="todo-item-data">
                <input type="date" name="due" defaultValue={due} />
                <div>
                  <button type="submit">Save</button>
                  <button type="button" onClick={closeEditModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="todo-iten-content">
              <textarea
                name="content"
                defaultValue={content}
                placeholder="A litle more about task..."
              />
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
}

async function updateTask(
  previousState: number,
  formData: FormData,
  editModal: HTMLDialogElement | null,
): Promise<number> {
  const taskTitle = formData.get('title') as string | null;
  const taskContent = formData.get('content') as string | null;
  const taskDue = formData.get('due') as string | null;

  if (!previousState) {
    useTodosStore.getState().addError(ErrorMessage.missingTaksId);
    throw new Error(ErrorMessage.missingTaksId);
  }

  const id = previousState;

  if (taskDue && isPassed(taskDue)) {
    useTodosStore.getState().addError(ErrorMessage.dateIsPassed);
    return id;
  }

  if (taskTitle === null || taskTitle.trim() === '') {
    useTodosStore.getState().addError(ErrorMessage.missingTaskTitle);
    return id;
  }

  const newTask: Partial<Task> = {
    title: taskTitle,
    content: taskContent?.trim() ? taskContent : null,
    due_date: taskDue !== '' ? taskDue : null,
  };
  useTodosStore.getState().changeTodo(Number(id), newTask);
  if (editModal) {
    editModal.close();
  }
  return id;
}
