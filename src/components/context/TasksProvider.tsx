import { useReducer } from 'react';
import { tasksReducer } from './taskReducer';
import { TasksContext, TasksDispacthTasks } from './TasksContext';

export function TasksProvider({ children }) {
  const [tasks, dispacth] = useReducer(tasksReducer, []);

  return (
    <TasksContext value={tasks}>
      <TasksDispacthTasks value={dispacth}>{children}</TasksDispacthTasks>
    </TasksContext>
  );
}
