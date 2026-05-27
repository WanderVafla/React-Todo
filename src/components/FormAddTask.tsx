import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type Dispatch,
} from 'react';
import type { ApiReturn, Task, TaskPost } from '../types';
import { postTask } from '../api';
import { useTasksDispatch } from '../hooks/useTasks';

type TaskAction = {
  type: 'add' | 'load';
  body: Task | Task[];
};

async function addNewTask(
  _previousState: ApiReturn | null,
  formData: FormData,
  tasksDispatch: Dispatch<TaskAction>,
): Promise<ApiReturn> {
  const taskTitle = formData.get('title') as string;
  const taskContent = formData.get('content') as string;
  const taskDue = formData.get('due') as string;

  const newTask: TaskPost = {
    title: taskTitle.trim() !== '' ? taskTitle : null,
    content: taskContent.trim() ? taskContent : null,
    due_date: taskDue !== '' ? taskDue : null,
    done: false,
  };
  const response: ApiReturn = await postTask(newTask);
  if (response.success) {
    tasksDispatch({
      type: 'add',
      body: Array.isArray(response.task) ? response.task[0] : response.task,
    });
  }

  return response;
}

export function FormAddTask() {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const tasksDispatch = useTasksDispatch();

  const [, formAction, isPending] = useActionState(
    (previousState, formData) =>
      addNewTask(previousState, formData, tasksDispatch),
    {
      success: null,
      message: '',
      task: null,
    },
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsContentVisible(false);
      } else if (
        formRef.current &&
        formRef.current.contains(event.target as Node)
      ) {
        setIsContentVisible(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form ref={formRef} action={formAction} id="form-add-task">
      <input
        type="text"
        id="title-task-input"
        name="title"
        placeholder="Todo name ..."
      />
      {isContentVisible && (
        <>
          <textarea
            id="description-area"
            placeholder="Desctiption ..."
            name="content"
          ></textarea>
          <div>
            <button type="submit" disabled={isPending}>
              Submit
            </button>
            <input type="date" name="due" />
          </div>
        </>
      )}
    </form>
  );
}
