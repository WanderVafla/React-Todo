export interface TaskPost {
  title: string;
  content: string;
  due_date: string;
  done: boolean;
}

export interface Task extends TaskPost {
  id: number;
}

export interface ApiReturn {
  success: boolean;
  message: Task | string;
}
