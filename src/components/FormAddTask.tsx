import { useActionState, useEffect, useRef, useState } from 'react';
import type { TaskPost } from '../types';
import { ErrorMessage } from '../constants';
import { isPassed } from '../utiles';
import { useTodosStore } from '../store';

async function addNewTask(_previousState: null, formData: FormData) {
  const taskTitle = formData.get('title') as string;
  const taskContent = formData.get('content') as string;
  const taskDue = formData.get('due') as string;

  if (taskTitle.trim() === '' || taskTitle === null) {
    useTodosStore.getState().addError(ErrorMessage.missingTaskTitle);
    return {
      success: false,
      message: ErrorMessage.missingTaskTitle,
      task: null,
    };
  }

  if (taskDue && isPassed(taskDue)) {
    useTodosStore.getState().addError(ErrorMessage.dateIsPassed);
  }

  const newTask: TaskPost = {
    title: taskTitle.trim() !== '' ? taskTitle : null,
    content: taskContent.trim() ? taskContent : null,
    due_date: taskDue !== '' ? taskDue : null,
    done: false,
  };

  await useTodosStore.getState().addTodo(newTask);
}

export function FormAddTask() {
  // this need for animation
  const [isContentVisible, setIsContentVisible] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [_state, formAction, isPending] = useActionState(addNewTask, null);
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
