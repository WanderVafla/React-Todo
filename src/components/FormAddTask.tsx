import { useActionState, useEffect, useRef, useState } from 'react';
import type { ApiReturn, TaskPost } from '../types';
import { postTask } from '../api';
import { useTasksDispatch } from '../hooks/useTasks';

async function addNewTask(
  _previousState,
  formData,
  tasksDispatch,
): Promise<ApiReturn> {
  const taskTitle = formData.get('title') as string;
  const taskContent = formData.get('content') as string;
  const taskDue = formData.get('due');

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
      task: response.message,
    });
  }

  return response;
}

export function FormAddTask() {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const formRef = useRef(null);
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
