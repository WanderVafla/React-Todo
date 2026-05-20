import { useState } from 'react';

interface TodoType {
  title: string;
  done: boolean;
  content?: string;
  due?: string;
}

export function TodoItem({ title, content, due, done }: TodoType) {
  const [isChecked, setIsChecked] = useState(done);
  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="todo-item">
      <span>
        <div>
          <input type="checkbox" checked={isChecked} onChange={handleChecked} />
          <span>{title}</span>
        </div>
        <span>{!due ? 'no date' : due}</span>
        <div>
          <button type="button">Edit</button>
          <button type="button">Remvoe</button>
        </div>
      </span>
      <div>{content && content}</div>
    </div>
  );
}
