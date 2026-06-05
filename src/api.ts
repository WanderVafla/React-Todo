import type { ApiReturn, Task, TaskPost } from './types';

const todos_url = 'https://api.todos.in.jt-lab.ch/todos';

export async function getTasks(): Promise<Task[]> {
  const request = await fetch(`${todos_url}`, {
    method: 'GET',
  });
  if (!request.ok) {
    const errorBody = await request.json().catch(() => ({}));
    const errorMessage =
      errorBody.message || errorBody.error || `Error Server: ${request.status}`;
    throw new Error(errorMessage);
  }
  return await request.json();
}

export async function postTask(task: TaskPost): Promise<ApiReturn> {
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
      return { success: false, message: error, task: null };
    }
    if (request.status === 201) {
      const response: Task | Task[] = await request.json();
      return {
        success: true,
        message: null,
        task: Array.isArray(response) ? response[0] : response,
      };
    }
    return {
      success: false,
      message: 'Unexpected response status',
      task: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: e instanceof Error ? e.message : 'An unknown error occurred',
      task: null,
    };
  }
}

export async function deleteTask(id: number) {
  try {
    const request = await fetch(`${todos_url}?id=eq.${id}`, {
      method: 'DELETE',
    });
    if (!request.ok) {
      const error = await request.json();
      console.error(error);
      return { success: false, message: error, task: null };
    }
    if (request.status === 204) {
      return {
        success: true,
        message: null,
        task: null,
      };
    }
    return {
      success: false,
      message: 'Unexpected response status',
      task: null,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: e instanceof Error ? e.message : 'An unknown error occurred',
      task: null,
    };
  }
}

export async function patchTask(id: number, body: Partial<Task>) {
  try {
    const request = await fetch(`${todos_url}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
        Accept: 'application/vnd.pgrst.object+json',
      },
      body: JSON.stringify(body),
    });
    const response = await request.json();

    if (!request.ok) {
      console.error(response);
      const errorMessage =
        typeof response === 'object' &&
        response !== null &&
        'message' in response
          ? String(response.message)
          : JSON.stringify(response);
      return { success: false, message: errorMessage, task: null };
    }

    return {
      success: true,
      message: null,
      task: response,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: e instanceof Error ? e.message : 'An unknown error occurred',
      task: null,
    };
  }
}
