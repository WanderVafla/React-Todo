import type { Task, TaskPost } from './types';

const todos_url = 'https://api.todos.in.jt-lab.ch/todos';

export async function getTasks(): Promise<Task[]> {
  try {
    const request = await fetch(`${todos_url}`, {
      method: 'GET',
    });
    if (request.ok) {
      return await request.json();
    }
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function postTask(task: TaskPost): Promise<Task> {
  try {
    const request = await fetch(`${todos_url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(task),
    });
    if (!request.ok) {
      const error = await request.json();
      console.error(error);
    }
    if (request.status === 201) {
      const reponse: Task | Task[] = await request.json();
      return Array.isArray(reponse) ? reponse[0] : reponse;
    }
  } catch (e) {
    console.error(e);
  }
}
