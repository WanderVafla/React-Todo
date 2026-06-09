import { ErrorMessage, URLs } from './constants';
import type { ApiReturn, Task, TaskPost } from './types';

export async function postTodo(todo: TaskPost): Promise<ApiReturn> {
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
      return {
        success: 'error',
        error: error,
      };
    }
    const response: Task = await request.json();
    console.log(response);

    const task: Task = Array.isArray(response) ? response[0] : response;

    return {
      success: 'success',
      task: task,
    };
  } catch (error) {
    console.error(error);
    return {
      success: 'loadError',
      error: ErrorMessage.missingLoadTasks,
    };
  }
}

export async function deleteTask(id: number): Promise<ApiReturn> {
  try {
    const request = await fetch(`${URLs.todos}?id=eq.${id}`, {
      method: 'DELETE',
    });
    if (!request.ok) {
      const error = await isError(request);
      console.error(error);
      return {
        success: 'error',
        error: error,
      };
    }
    return {
      success: 'success',
    };
  } catch (error) {
    console.error(error);
    return {
      success: 'loadError',
      error: ErrorMessage.missingLoadTasks,
    };
  }
}

export async function patchTask(id: number, item: Partial<Task>) {
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
      return {
        success: 'error',
        error: error,
      };
    }
    const response: Task = await request.json();

    return {
      success: 'success',
      task: response,
    };
  } catch (error) {
    console.error(error);
    return {
      success: 'loadError',
      error: ErrorMessage.missingLoadTasks,
    };
  }
}

export async function deleteAllTasks() {
  try {
    const request = await fetch(`${URLs.todos}`, {
      method: 'DELETE'
    })
    if (!request.ok) {
      const error = await isError(request);
      return {
        success: 'error',
        error: error,
      };
    }
    return {
      success: 'success',
    };
  } catch (error) {
    console.error(error);
    return {
      success: 'loadError',
      error: ErrorMessage.missingLoadTasks,
    };
  }
}

async function isError(request: Response): Promise<string> {
  const errorBody = await request.json();
  const errorMessage =
    errorBody.message || errorBody.error || `Error Serve: ${errorBody.status}`;
  console.error(errorMessage);
  return errorMessage;
}
