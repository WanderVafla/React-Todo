import { use, useEffect } from 'react';
import { TodoItem } from './TodoItem';
import { promisTasks } from '../utils';
import { useTasks, useTasksDispatch } from '../hooks/useTasks';

export function TodoList() {
  const tasksDispath = useTasksDispatch();
  const tasks = useTasks();
  const tasksFromAPI = use(promisTasks);
  useEffect(() => {
    tasksDispath({
      type: 'load',
      tasks: tasksFromAPI,
    });
  }, [tasksDispath, tasksFromAPI]);
  return (
    <div id="todos-list-border">
      <SortPanel />
      <hr />

      <div id="todos-list">
        {tasks
          ? tasks.map((task) => (
              <TodoItem
                key={task.id}
                title={task.title}
                content={task.content}
                due={task.due_date}
                done={task.done}
              />
            ))
          : 'No task to complete.'}
      </div>
    </div>
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
