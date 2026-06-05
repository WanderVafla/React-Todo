import {
  use,
  useActionState,
  useEffect,
  useRef,
  useState,
  type Dispatch,
} from 'react';
import type { ApiReturn, TaskAction, TaskPost } from '../types';
import { postTask } from '../api';
import { useTasksDispatch } from '../hooks/useTasks';
import { TaskActionTypes } from '../constants';
import { ErrorContext } from './errorsElements/context/ErorreContext';

async function addNewTask(
  _previousState: ApiReturn | null,
  formData: FormData,
  tasksDispatch: Dispatch<TaskAction>,
  addError: (error: string) => void,
) {
  const taskTitle = formData.get('title') as string;
  const taskContent = formData.get('content') as string;
  const taskDue = formData.get('due') as string;

  if (taskTitle.trim() === '' || taskTitle === null) {
    return addError('you mush have a title a title');
  }

  const newTask: TaskPost = {
    title: taskTitle.trim() !== '' ? taskTitle : null,
    content: taskContent.trim() ? taskContent : null,
    due_date: taskDue !== '' ? taskDue : null,
    done: false,
  };
  const response: ApiReturn = await postTask(newTask);
  if (response.success) {
    tasksDispatch({
      type: TaskActionTypes.add,
      body: Array.isArray(response.task) ? response.task[0] : response.task,
    });
  }
  if (!response.success) {
    addError(response.message);
  }

  return response;
}

export function FormAddTask() {
  // this need for animation
  const [isContentVisible, setIsContentVisible] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const tasksDispatch = useTasksDispatch();
  const errorsContext = use(ErrorContext);

  const { addError } = errorsContext;
  const [_state, formAction, isPending] = useActionState(
    (previousState, formData) =>
      addNewTask(previousState, formData, tasksDispatch, addError),
    {
      success: null,
      message: '',
      task: null,
    },
  );
  // useEffect also for do animation
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
