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
export type SortDoned = (0 | 1 | 2)
export type SortOption = ('newest' | 'due date' | 'name')
export type SortType = {type: SortOption; doned: SortDoned}

export type TaskAction = {
  type: 'add' | 'load' | 'delete' | 'change' | 'order';
  body?: Task | Task[];
  order?: SortType;
};
