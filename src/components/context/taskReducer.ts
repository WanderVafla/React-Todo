import type { Task } from '../../types';

export function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'load': {
      return action.tasks;
    }
    case 'add': {
      const task: Task = {
        id: action.body.id,
        title: action.body.title,
        content: action.body.content,
        due_date: action.body.due_date,
        done: action.body.done,
      };
      return [...tasks, task];
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}
