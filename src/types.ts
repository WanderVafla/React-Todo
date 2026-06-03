import type { OrderDoned, OrderName, TaskActionTypes } from './constants';

export interface TaskPost {
  title: string;
  content: string | null;
  due_date: string | null;
  done: boolean;
}

export interface Task extends TaskPost {
  id: number;
}

export type ApiReturn = {
  success: boolean;
  message: string | null;
  task: Task | Task[] | null;
};

export type SortDoned = (typeof OrderDoned)[keyof typeof OrderDoned];
export type SortOption = (typeof OrderName)[keyof typeof OrderName];

export type TaskAction = {
  type: (typeof TaskActionTypes)[keyof typeof TaskActionTypes];
  body?: Task | Task[];
  order?: SortOption;
};
