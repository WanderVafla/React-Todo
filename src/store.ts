import { create } from 'zustand';
import { ErrorMessage, URLs } from './constants';
import type { Task, TaskPost } from './types';

type State = {
  todos: Task[];
  errors: string[];
};

type Action = {
  getLoadTodos: () => void;
  addTodo: (todo: TaskPost) => Promise<Task>;
  deleteTodo: (id: number) => void;
  changeTodo: (id: number, item: Partial<Task>) => void;
  removeError: (indexError: number) => void;
};

export const useTodosStore = create<State & Action>((set) => ({
  // States
  todos: [],
  errors: [],

  getLoadTodos: async () => {
    try {
      const request = await fetch(URLs.todos);
      if (!request.ok) {
        const error = await isError(request);
        set((state) => ({ errors: [ErrorMessage.missingLoadTasks, ...state.errors] }));
        throw new Error(error);
      }
      const todos = await request.json();
      set({ todos: todos });
    } catch (error) {
      set((state) => ({ errors: [error.message, ...state.errors] }));
    }
  },

  addTodo: async (todo: TaskPost): Promise<Task> => {
    try {
      const request = await fetch(URLs.todos, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify(todo),
      });
      if (!request.ok) {
        const error = await isError(request)[0];
        set((state) => ({ errors: [error, ...state.errors] }));
        throw new Error(error);
      }
      const response: Task = await request.json();
      console.log(response);
      
      const task: Task = Array.isArray(response) ? response[0] : response
      console.log(task);
      
      
      set((state) => ({ todos: [task, ...state.todos] }));
      return task
    } catch (error) {
      set((state) => ({ errors: [error, ...state.errors] }));
    }
  },

  deleteTodo: async (id: number) => {
    try {
      const request = await fetch(`${URLs.todos}?id=eq.${id}`, {
        method: 'DELETE',
      });
      if (!request.ok) {
        const error = await isError(request);
        set((state) => ({ errors: [error, ...state.errors] }));
        throw new Error(error);
      }
      set((state) => ({
        todos: [...state.todos].filter((task) => task.id !== id),
      }));
      console.log('tasks deleted');
    } catch (error) {
      set((state) => ({ errors: [error, ...state.errors] }));
    }
  },

  changeTodo: async (id: number, item: Partial<Task>) => {
    try {
      const request = await fetch(`${URLs.todos}?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
          Accept: 'application/vnd.pgrst.object+json',
        },
        body: JSON.stringify(item),
      });
      if (!request.ok) {
        const error = await isError(request);
        set((state) => ({ errors: [error, ...state.errors] }));
        throw new Error(error);
      }
      const response: Task = await request.json();

      set((state) => ({
        todos: [...state.todos].map((task) =>
          task.id === response.id ? response : task,
        ),
      }));
    } catch (error) {
      set((state) => ({ errors: [error, ...state.errors] }));
    }
  },

  removeError: (indexError: number) => {
    set((state) => ({ errors: [...state.errors].filter((_, index) => indexError !== index) }))
  }
}));

async function isError(request: Response): Promise<string> {
  const errorBody = await request.json();
  const errorMessage =
    errorBody.message || errorBody.error || `Error Serve: ${errorBody.status}`;
  console.error(errorMessage);
  return errorMessage;
}
