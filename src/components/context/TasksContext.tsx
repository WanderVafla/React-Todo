import { createContext, type Dispatch } from 'react';
import type { Task, TaskAction } from '../../types';


export const TasksContext = createContext<Task[] | null>(null);
export const TasksDispatchContext = createContext<Dispatch<TaskAction> | null>(null);
