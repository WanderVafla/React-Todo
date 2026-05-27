import { useContext, type Dispatch } from 'react';
import {
  TasksContext,
  TasksDispatchContext,
} from '../components/context/TasksContext';
import type { Task, TaskAction } from '../types';

export function useTasks(): Task[] {
  const context = useContext(TasksContext);
  if (context === null) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}

export function useTasksDispatch(): Dispatch<TaskAction> {
  const context = useContext(TasksDispatchContext);
  if (context === null) {
    throw new Error('useTasksDispatch must be used within a TasksProvider');
  }
  return context;
}
