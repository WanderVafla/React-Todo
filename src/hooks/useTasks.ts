import { useContext } from 'react';
import {
  TasksContext,
  TasksDispatchContext,
} from '../components/context/TasksContext';
import type { Task } from '../types';

export function useTasks(): Task[] {
  const context = useContext(TasksContext);
  if (context === null) {
    throw new Error('useTasks must be used within a TasksProvider')
  }
  return context
}

export function useTasksDispatch() {
  const context = useContext(TasksDispatchContext);
  if (context === null) {
    throw new Error('useTasksDispatch must be used within a TasksProvider')
  }
  return context
}
