import type { Task } from './types';

export async function getTasks(): Promise<Task[]> {
  const request = await fetch('https://api.todos.in.jt-lab.ch/todos', {
    method: 'GET',
  });
  if (request.ok) {
    return await request.json();
  }
}
