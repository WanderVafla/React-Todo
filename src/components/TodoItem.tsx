import { useState, type ChangeEvent } from 'react';
import type { Task } from '../types';
import { useTasksDispatch } from '../hooks/useTasks';
import { deleteTask } from '../api';

export function TodoItem({ task }: { task: Task }) {
  const [isChecked, setIsChecked] = useState(task.done);
  const tasksDispatch = useTasksDispatch();

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
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

  return (
    <div className="todo-item">
      <span>
        <div>
          <input type="checkbox" checked={isChecked} onChange={handleChecked} />
          <span>{task.title}</span>
        </div>
        <span>{!task.due_date ? 'no date' : task.due_date}</span>
        <div>
          <button type="button">Edit</button>
          <button type="button" onClick={remove}>
            Remvoe
          </button>
        </div>
      </span>
      <div>{task.content && task.content}</div>
    </div>
  );
}
