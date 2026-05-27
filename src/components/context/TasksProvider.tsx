import { useReducer, type ReactNode } from 'react';
import { tasksReducer } from './taskReducer';
import { TasksContext, TasksDispatchContext } from './TasksContext';

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>{children}</TasksDispatchContext>
    </TasksContext>
  );
}
