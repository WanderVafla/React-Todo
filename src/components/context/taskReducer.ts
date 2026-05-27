import type { Task } from '../../types';

export function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'load': {
      return action.tasks;
    }
    case 'add': {
      const task: Task = {
        id: action.task.id,
        title: action.task.title,
        content: action.task.content,
        due_date: action.task.due_date,
        done: action.task.done,
      };
      return [...tasks, task];
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}
