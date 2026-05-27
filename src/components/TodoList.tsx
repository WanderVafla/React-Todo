import { use, useEffect } from 'react';
import { TodoItem } from './TodoItem';
import { tasksPromise } from '../utils';
import { useTasks, useTasksDispatch } from '../hooks/useTasks';

export function TodoList() {
  const tasksDispatch = useTasksDispatch();
  const tasks = useTasks();
  const tasksFromAPI = use(tasksPromise);
  useEffect(() => {
    tasksDispatch({
      type: 'load',
      body: tasksFromAPI,
    });
  }, [tasksDispatch, tasksFromAPI]);
  return (
    <>
      {tasks.length > 0 ? (
        <div id="todos-list-border">
          <SortPanel />
          <hr />
          <div id="todos-list">
            {tasks.map((task) => (
              <TodoItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      ) : (
        'No task to complete.'
      )}
    </>
  );
}

function SortPanel() {
  return (
    <div id="todos-list-options">
      <label htmlFor="">undone:</label>
      <input type="checkbox" />

      <select name="sort-select" id="">
        <option value="">sort</option>
        <option value="due date">due date</option>
        <option value="name">name</option>
      </select>
    </div>
  );
}
