import { useState, type ChangeEvent } from 'react';
import type { Task } from '../types';

export function TodoItem({ task }: { task: Task }) {
  const [isChecked, setIsChecked] = useState(task.done);

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
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
          <button type="button">Remvoe</button>
        </div>
      </span>
      <div>{task.content && task.content}</div>
    </div>
  );
}
