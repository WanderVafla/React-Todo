import { useReducer } from 'react';
import { tasksReducer } from './taskReducer';
import { TasksContext, TasksDispacthTasks } from './TasksContext';

export function TasksReducer({ children }) {
  const [tasks, dispacth] = useReducer(tasksReducer, null);

  return (
    <TasksContext value={tasks}>
      <TasksDispacthTasks value={dispacth}>{children}</TasksDispacthTasks>
    </TasksContext>
  );
}
