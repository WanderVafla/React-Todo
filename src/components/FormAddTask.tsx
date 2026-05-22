import React, { useEffect, useRef, useState } from 'react';
import type { TaskPost } from '../types';
import { postTask } from '../api';

export function FormAddTask({ handlerTasks }) {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const formRef = useRef(null);

  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskContent, setTaskContent] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');

  const handleTaskTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };
  const handleTaskContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskContent(event.target.value);
  };
  const handleTaskDueDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(event.target.value);
  };

  const cleanForm = () => {
    setTaskTitle('');
    setTaskContent('');
    setDueDate('');
    console.log('cleaned');
  };

  const sendNewTask = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newTask: TaskPost = {
      title: taskTitle,
      content: taskContent ? taskContent : null,
      due_date: dueDate,
      done: false,
    };
    const taskReturn = await postTask(newTask);
    handlerTasks(taskReturn);
    cleanForm();
  };

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
    <form ref={formRef} id="form-add-task">
      <input
        type="text"
        id="title-task-input"
        value={taskTitle}
        placeholder="Todo name ..."
        onChange={handleTaskTitle}
      />
      {isContentVisible && (
        <>
          <textarea
            id="description-area"
            placeholder="Desctiption ..."
            value={taskContent}
            onChange={handleTaskContent}
          ></textarea>
          <div>
            <button type="submit" onClick={sendNewTask}>
              Submit
            </button>
            <input type="date" value={dueDate} onChange={handleTaskDueDate} />
          </div>
        </>
      )}
    </form>
  );
}
