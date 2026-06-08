import type { FiltersNames, OrderName, TaskActionTypes } from './constants';

export interface TaskPost {
  title: string;
  content: string | null;
  due_date: string | null;
  done: boolean;
}

export interface Task extends TaskPost {
  id: number;
}

export type FilterDoned = (typeof FiltersNames)[keyof typeof FiltersNames];
export type SortOption = (typeof OrderName)[keyof typeof OrderName];

export type TaskAction = {
  type: (typeof TaskActionTypes)[keyof typeof TaskActionTypes];
  body?: Task | Task[];
  order?: SortOption;
};

export interface ErrorsContextType {
  errors: string[];
  addError: (error: string) => void;
  removeError: (indexError: number) => void;
}
