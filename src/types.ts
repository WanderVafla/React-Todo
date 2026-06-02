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

export type SortsOptions = ('newest' | 'due date' | 'name')

export type TaskAction = {
  type: 'add' | 'load' | 'delete' | 'change' | 'order';
  body?: Task | Task[];
  order?: SortsOptions;
};
