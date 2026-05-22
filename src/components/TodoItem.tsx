import { useState } from 'react';

interface TodoType {
  title: string;
  done: boolean;
  content?: string;
  due?: string;
}

export function TodoItem({ title, content, due, done }: TodoType) {
  const [taskTitle] = useState(title);
  const [taskContent] = useState(content)
  const [dueDate] = useState(due)
  const [isChecked, setIsChecked] = useState(done);
  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="todo-item">
      <span>
        <div>
          <input type="checkbox" checked={isChecked} onChange={handleChecked} />
          <span>{taskTitle}</span>
        </div>
        <span>{!due ? 'no date' : dueDate}</span>
        <div>
          <button type="button">Edit</button>
          <button type="button">Remvoe</button>
        </div>
      </span>
      <div>{taskContent && taskContent}</div>
    </div>
  );
}
