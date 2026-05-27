import type { Task, TaskAction } from '../../types';

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'load': {
      return Array.isArray(action.body) && action.body;
    }
    case 'add': {
      // const task: Task = {
      //   id: action.body.id,
      //   title: action.body.title,
      //   content: action.body.content,
      //   due_date: action.body.due_date,
      //   done: action.body.done,
      // };
      return [...tasks, !Array.isArray(action.body) && action.body];
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}
