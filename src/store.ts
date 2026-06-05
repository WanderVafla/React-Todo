import { create } from 'zustand';
import { URLs } from './constants';
import type { Task, TaskPost } from './types';

type State = {
    todos: Task[];
    errors: string[];
}

type Action = {
    getLoadTodos: () => void;
    addTodo: (todo: TaskPost) => void;
}

export const useTodosStore = create<State & Action>((set) => ({
    // States
    todos: [],
    errors: [],

    getLoadTodos: async () => {
        try {
            const request = await fetch(URLs.todos)
            if (!request.ok) {
                const error = await isError(request)
                set((state) => ({ errors: [error, ...state.errors] }))
                throw new Error(error)
            }
            const todos = await request.json();
            set({ todos: todos })
        } catch (error) {
            set((state) => ({ errors: [error, ...state.errors] }))
        }
    },

    addTodo: async (todo: TaskPost) => {
        try {
            const request = await fetch(URLs.todos, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Prefer: 'return=representation',
                },
                body: JSON.stringify(todo),
            })
            if (!request.ok) {
                const error = await isError(request)
                set((state) => ({errors: [error, ...state.errors]}))
                throw new Error(error)
            }
            const response: Task = await request.json()
            set((state) => ({todos: [response, ...state.todos]}))
        } catch (error) {
            set((state) => ({errors: [error, ...state.errors]}))
        }
    },
    
}))

async function isError(request: Response): Promise<string> {
    const errorBody = await request.json()
    const errorMessage = errorBody.message || errorBody.error || `Error Serve: ${errorBody.status}`;
    console.error(errorMessage);
    return errorMessage
}