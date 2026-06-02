import { use, useEffect } from 'react';
import { TodoItem } from './TodoItem';
import { tasksPromise } from '../../utils';
import { useTasks, useTasksDispatch } from '../../hooks/useTasks';
import { SortPanel } from './SortPanel';

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
  console.log(tasks);
  
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


