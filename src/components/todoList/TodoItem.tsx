import {
  useActionState,
  useState,
  useTransition,
  type Dispatch,
} from 'react';
import type { Task } from '../../types';
import { ErrorMessage } from '../../constants';
import { isPassed } from '../../utiles';
import { useTodosStore } from '../../store';

async function updateTask(
  previousState: number,
  formData: FormData,
  setIsEditing: Dispatch<boolean>,
): Promise<number> {
  const taskTitle = formData.get('title') as string | null;
  const taskContent = formData.get('content') as string | null;
  const taskDue = formData.get('due') as string | null;

  if (!previousState) {
    useTodosStore.getState().addError(ErrorMessage.missingTaksId)
    throw new Error("Not have task id")
  }

  const id = previousState;

  if (taskDue && isPassed(taskDue)) {
    useTodosStore.getState().addError(ErrorMessage.dateIsPassed)
    return id
  }

  if (taskTitle === null || taskTitle.trim() === '') {
    useTodosStore.getState().addError(ErrorMessage.missingTaskTitle)
    return id;
  }

  const newTask: Partial<Task> = {
    title: taskTitle,
    content: taskContent?.trim() ? taskContent : null,
    due_date: taskDue !== '' ? taskDue : null,
  };
  useTodosStore.getState().changeTodo(Number(id), newTask)

  setIsEditing(false);
  return id;
}

export function TodoItem({ task }: { task: Task }) {
  const [isChecked, setIsChecked] = useState(task.done);
  const [isEditing, setIsEditing] = useState(false);

  const changeTask = useTodosStore((state) => state.changeTodo);
  const deleteTask = useTodosStore((state) => state.deleteTodo);

  const [isPendingDelete, startTrasition] = useTransition();
  const [_state, formAction, _isPending] = useActionState(
    (previousState, formData) =>
      updateTask(
        previousState,
        formData,
        setIsEditing,
      ),
    
      task.id
  );

  const handleChecked = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.checked;
    setIsChecked(target);
    changeTask(task.id, { done: target });
  };

  const remove = async () => {
    startTrasition(async () => {
      deleteTask(task.id);
    });
  };

  const toggleEditing = async () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <>
      {!isEditing ? (
        <div className="todo-item">
          <span>
            <div>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChecked}
              />

              <span>{task.title}</span>
            </div>
            <span>{!task.due_date ? 'no date' : task.due_date}</span>
            {!isPendingDelete ? (
              <div>
                <button type="button" onClick={toggleEditing}>
                  Edit
                </button>
                <button type="button" onClick={remove}>
                  Remove
                </button>
              </div>
            ) : (
              '...'
            )}
          </span>
          <div>{task.content && task.content}</div>
        </div>
      ) : (
        <form action={formAction}>
          <div className="todo-item">
            <span>
              <div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleChecked}
                />
                <input type="text" name="title" defaultValue={task.title} />
              </div>
              <input type="date" name="due" defaultValue={task.due_date} />
              <div>
                <button type="submit">Save</button>
                <button type="button" onClick={toggleEditing}>
                  Cancel
                </button>
              </div>
            </span>

            <textarea name="content" defaultValue={task.content}></textarea>
          </div>
        </form>
      )}
    </>
  );
}
