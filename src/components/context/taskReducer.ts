import { TaskActionTypes } from '../../constants';
import type { Task, TaskAction } from '../../types';

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case TaskActionTypes.load: {
      return Array.isArray(action.body) ? action.body : [];
    }
    case TaskActionTypes.add: {
      if (action.body && !Array.isArray(action.body)) {
        return [action.body, ...tasks];
      }
      return tasks;
    }
    case TaskActionTypes.delete: {
      const target: Task = Array.isArray(action.body)
        ? action.body[0]
        : action.body;
      return [...tasks].filter((task) => task !== target);
    }
    case TaskActionTypes.change: {
      const target: Task = Array.isArray(action.body)
        ? action.body[0]
        : action.body;

      const updatedTasks = tasks.map((task) => {
        if (task.id === target.id) {
          return target;
        }

        return task;
      });

      return updatedTasks;
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}
