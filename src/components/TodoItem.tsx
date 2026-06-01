import {
  useActionState,
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
} from 'react';
import type { ApiReturn, Task, TaskAction } from '../types';
import { useTasksDispatch } from '../hooks/useTasks';
import { deleteTask, patchTask } from '../api';

async function updateTask(
  previousState: ApiReturn | null,
  formData: FormData,
  tasksDispatch: Dispatch<TaskAction>,
) {
  const taskTitle = formData.get('title') as string | null;
  const taskContent = formData.get('content') as string | null;
  const taskDue = formData.get('due') as string | null;

  const id = previousState?.message;
  if (!id) {
    return {
      success: false,
      message: 'Task ID is missing',
      task: null
    }
  }

  if (taskTitle === null || taskTitle.trim() === '' ) {
    return {
      success: false,
      message: 'Missing Title of task'
    }
  }

  const newTask: Partial<Task> = {
    title: taskTitle,
    content: taskContent?.trim() ? taskContent : null,
    due_date: taskDue !== '' ? taskDue : null,
  };
  const response: ApiReturn = await patchTask(Number(id), newTask);

  if (response.success && response.task) {
    tasksDispatch({
      type: 'change',
      body: response.task,
    });
  }

  return {
    success: response.success,
    message: id,
    task: null,
  };
}

export function TodoItem({ task }: { task: Task }) {
  const [isChecked, setIsChecked] = useState(task.done);
  const [isEditing, setIsEditing] = useState(false);
  const tasksDispatch = useTasksDispatch();

  const [state, formAction, _isPending] = useActionState(
    (previousState, formData) =>
      updateTask(previousState, formData, tasksDispatch),
    {
      success: false,
      message: String(task.id),
      task: task,
    },
  );
  useEffect(() => {
    if (state.success === true) {
      setIsEditing(false);
    }
  }, [state]);

  const handleChecked = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.checked;
    setIsChecked(target);

    const response = await patchTask(task.id, { done: target });
    if (response.success) {
      tasksDispatch({
        type: 'change',
        body: task,
      });
    }
  };

  const remove = async () => {
    const response = await deleteTask(task.id);
    if (response.success) {
      tasksDispatch({
        type: 'delete',
        body: task,
      });
    }
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
            <div>
              <button type="button" onClick={toggleEditing}>
                Edit
              </button>
              <button type="button" onClick={remove}>
                Remove
              </button>
            </div>
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
                <button type="submit">
                  Save
                </button>
                <button type='button' onClick={toggleEditing}>
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
