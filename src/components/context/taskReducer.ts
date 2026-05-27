import type { Task, TaskAction } from '../../types';

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'load': {
      return Array.isArray(action.body) && action.body;
    }
    case 'add': {
      return [...tasks, !Array.isArray(action.body) && action.body];
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}
