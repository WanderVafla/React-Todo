import { useContext } from 'react';
import {
  TasksContext,
  TasksDispacthTasks,
} from '../components/context/TasksContext';

export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispacthTasks);
}
