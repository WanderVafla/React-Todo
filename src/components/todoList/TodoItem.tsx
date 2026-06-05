import {
  use,
  useActionState,
  useState,
  useTransition,
  type Dispatch,
} from 'react';
import type { ApiReturn, Task, TaskAction } from '../../types';
import { useTasksDispatch } from '../../hooks/useTasks';
import { deleteTask, patchTask } from '../../api';
import { ErrorMessage, TaskActionTypes } from '../../constants';
import { ErrorContext } from '../errorsElements/context/ErorreContext';
import { isPassed } from '../../utiles';

async function updateTask(
  previousState: ApiReturn | null,
  formData: FormData,
  tasksDispatch: Dispatch<TaskAction>,
  setIsEditing: Dispatch<boolean>,
  addError: (error: string) => void,
) {
  const taskTitle = formData.get('title') as string | null;
  const taskContent = formData.get('content') as string | null;
  const taskDue = formData.get('due') as string | null;

  const id = previousState?.message;
  if (!id) {
    addError(ErrorMessage.missingTaksId);
    return {
      success: false,
      message: ErrorMessage.missingTaksId,
    };
  }

  if (isPassed(taskDue)) {
      addError(ErrorMessage.dateIsPassed)
      return {
      success: false,
      message: ErrorMessage.dateIsPassed,
    };
    }

  if (taskTitle === null || taskTitle.trim() === '') {
    addError(ErrorMessage.missingTaskTitle);
    return {
      success: false,
      message: ErrorMessage.missingTaskTitle,
    };
  }

  const newTask: Partial<Task> = {
    title: taskTitle,
    content: taskContent?.trim() ? taskContent : null,
    due_date: taskDue !== '' ? taskDue : null,
  };
  const response: ApiReturn = await patchTask(Number(id), newTask);

  if (response.success && response.task) {
    tasksDispatch({
      type: TaskActionTypes.change,
      body: response.task,
    });
  } else {
    addError(response.message)
  }
  setIsEditing(false);
  return {
    success: response.success,
    message: id,
  };
}

export function TodoItem({ task }: { task: Task }) {
  const [isChecked, setIsChecked] = useState(task.done);
  const [isEditing, setIsEditing] = useState(false);

  const tasksDispatch = useTasksDispatch();
  const { addError } = use(ErrorContext);

  const [isPendingDelete, startTrasition] = useTransition();
  const [_state, formAction, _isPending] = useActionState(
    (previousState, formData) =>
      updateTask(
        previousState,
        formData,
        tasksDispatch,
        setIsEditing,
        addError,
      ),
    {
      success: false,
      message: String(task.id),
      task: task,
    },
  );

  const handleChecked = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.checked;
    setIsChecked(target);

    startTrasition(async () => {
      const response = await patchTask(task.id, { done: target });

      if (response.success) {
        tasksDispatch({
          type: TaskActionTypes.change,
          body: task,
        });
      }
    });
  };

  const remove = async () => {
    startTrasition(async () => {
      const response = await deleteTask(task.id);
      if (response.success) {
        tasksDispatch({
          type: TaskActionTypes.delete,
          body: task,
        });
      } else {
        addError(response.message);
      }
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
