import { create } from 'zustand';
import { ErrorMessage, URLs } from './constants';
import type { Task, TaskPost } from './types';
import { deleteAllTasks, deleteTask, patchTask, postTodo } from './api';

type State = {
  todos: Task[] | null;
  errors: string[];
  promis: Promise<void> | null;
  errorLoading: string | null;
};

type Action = {
  fetchTodos: () => Promise<void>;
  loadTodos: () => Task[];
  addTodo: (todo: TaskPost) => void;
  deleteTodo: (id: number) => void;
  changeTodo: (id: number, item: Partial<Task>) => void;
  addError: (message: string) => void;
  removeError: (indexError: number) => void;
  deleteAllTodos: () => void;
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

  addTodo: async (todo: TaskPost) => {
    const response = await postTodo(todo);
    if (response.success === 'success') {
      set((state) => ({ todos: [response.task, ...state.todos] }));
    }
    if (response.success === 'error') {
      set((state) => ({
        errors: [ErrorMessage.missingAddNewTask, ...state.errors],
      }));
      throw new Error(response.error);
    }
    if (response.success === 'loadError') {
      set({ errorLoading: ErrorMessage.missingLoadTasks });
      throw new Error(response.error);
    }
  },

  deleteTodo: async (id: number) => {
    const response = await deleteTask(id);
    if (response.success === 'success') {
      set((state) => ({
        todos: [...state.todos].filter((task) => task.id !== id),
      }));
    }
    if (response.success === 'error') {
      set((state) => ({
        errors: [ErrorMessage.missingAddNewTask, ...state.errors],
      }));
      throw new Error(response.error);
    }
    if (response.success === 'loadError') {
      set({ errorLoading: ErrorMessage.missingLoadTasks });
      throw new Error(response.error);
    }
  },

  changeTodo: async (id: number, item: Partial<Task>) => {
    const response = await patchTask(id, item);
    if (response.success === 'success') {
      set((state) => ({
        todos: [...state.todos].map((task) =>
          task.id === id ? response.task : task,
        ),
      }));
    }
    if (response.success === 'error') {
      set((state) => ({
        errors: [ErrorMessage.missingAddNewTask, ...state.errors],
      }));
      throw new Error(response.error);
    }
    if (response.success === 'loadError') {
      set({ errorLoading: ErrorMessage.missingLoadTasks });
      throw new Error(response.error);
    }
  },

  deleteAllTodos: async () => {
    const response = await deleteAllTasks();
    if (response.success === 'success') {
      set(({
        todos: [],
      }));
    }
    if (response.success === 'error') {
      set((state) => ({
        errors: [ErrorMessage.missingAddNewTask, ...state.errors],
      }));
      throw new Error(response.error);
    }
    if (response.success === 'loadError') {
      set({ errorLoading: ErrorMessage.missingLoadTasks });
      throw new Error(response.error);
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
