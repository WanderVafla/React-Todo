import type { Task, TaskAction } from '../../types';

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'load': {
      return Array.isArray(action.body) && action.body;
    }
    case 'add': {
      return [...tasks, !Array.isArray(action.body) && action.body];
    }
    case 'delete': {
      const target: Task = Array.isArray(action.body)
        ? action.body[0]
        : action.body;
      return [...tasks].filter((task) => task !== target);
    }
    case 'change': {
      const target: Task = Array.isArray(action.body)
        ? action.body[0]
        : action.body;

      const a = tasks.map((task) => {
        if (task.id === target.id) {
          return target;
        }

        return task;
      });

      return a;
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}
