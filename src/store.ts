import { create } from 'zustand';
import { ErrorMessage, URLs } from './constants';
import type { Task, TaskPost } from './types';

type State = {
  todos: Task[] | null;
  errors: string[];
  promis: Promise<void> | null;
  errorLoading: string | null;
};

type Action = {
  fetchTodos: () => Promise<void>;
  loadTodos: () => Task[];
  addTodo: (todo: TaskPost) => Promise<Task>;
  deleteTodo: (id: number) => void;
  changeTodo: (id: number, item: Partial<Task>) => void;
  addError: (message: string) => void;
  removeError: (indexError: number) => void;
};

export const useTodosStore = create<State & Action>((set, get) => ({
  // States
  todos: null,
  errors: [],
  promis: null,
  errorLoading: null,

  fetchTodos: () => {
    try {
      if (get().promis) return get().promis;
      const fetchPromis = fetch(URLs.todos)
        .then((res) => {
          if (!res.ok) {
            throw new Error(ErrorMessage.missingLoadTasks);
          }
          return res.json();
        })
        .then((data) => set({ todos: data }));
      set({ promis: fetchPromis });

      return fetchPromis;
    } catch (error) {
      console.log(error);
      set({ promis: null });
      set({ errorLoading: ErrorMessage.missingLoadTasks });
    }
  },

  loadTodos: () => {
    const { todos, fetchTodos } = get();
    if (todos) return todos;
    throw fetchTodos();
  },

  addTodo: async (todo: TaskPost): Promise<Task | null> => {
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
        const error = await isError(request);
        set((state) => ({
          errors: [ErrorMessage.missingAddNewTask, ...state.errors],
        }));
        throw new Error(error);
      }
      const response: Task = await request.json();
      console.log(response);

      const task: Task = Array.isArray(response) ? response[0] : response;

      set((state) => ({ todos: [task, ...state.todos] }));
      return task;
    } catch (error) {
      console.error(error);
      set({ errorLoading: ErrorMessage.missingLoadTasks });
    }
  },

  deleteTodo: async (id: number) => {
    try {
      const request = await fetch(`${URLs.todos}?id=eq.${id}`, {
        method: 'DELETE',
      });
      if (!request.ok) {
        const error = await isError(request);
        set((state) => ({
          errors: [ErrorMessage.missingDeleteTask, ...state.errors],
        }));
        throw new Error(error);
      }
      set((state) => ({
        todos: [...state.todos].filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error(error);
      set({ errorLoading: ErrorMessage.missingLoadTasks });
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
        set((state) => ({
          errors: [ErrorMessage.missingEditTask, ...state.errors],
        }));
        throw new Error(error);
      }
      const response: Task = await request.json();

      set((state) => ({
        todos: [...state.todos].map((task) =>
          task.id === response.id ? response : task,
        ),
      }));
    } catch (error) {
      console.error(error);
      set({ errorLoading: ErrorMessage.missingLoadTasks });
    }
  },

  addError: (message: string) => {
    set((state) => ({ errors: [message, ...state.errors] }));
  },

  removeError: (indexError: number) => {
    set((state) => ({
      errors: [...state.errors].filter((_, index) => indexError !== index),
    }));
  },
}));

async function isError(request: Response): Promise<string> {
  const errorBody = await request.json();
  const errorMessage =
    errorBody.message || errorBody.error || `Error Serve: ${errorBody.status}`;
  console.error(errorMessage);
  return errorMessage;
}
