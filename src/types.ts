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

export type TaskAction = {
  type: 'add' | 'load' | 'delete';
  body: Task | Task[];
};
