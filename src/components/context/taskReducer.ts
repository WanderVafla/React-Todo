import { OrderName, TaskActionTypes } from '../../constants';
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
      return tasks
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
    case TaskActionTypes.order: {
      switch (action.order) {
        case OrderName.newest: {
          const orderedTasks = [...tasks].sort((a, b) => a.id - b.id).reverse();
          return orderedTasks;
        }
        case OrderName.name: {
          const orderedTasks = [...tasks].sort((a, b) =>
            a.title.localeCompare(b.title),
          );
          return orderedTasks;
        }
        case OrderName.time: {
          const orderedTasks = [...tasks].sort((a, b) => {
            if (!a.due_date && !b.due_date) return 0;
            if (!a.due_date) return 1
            if (!b.due_date) return -1
            return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
          });
          return orderedTasks;
        }
        default: {
          throw Error(`Unknown SortType: ${action.order}`);
        }
      }
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}