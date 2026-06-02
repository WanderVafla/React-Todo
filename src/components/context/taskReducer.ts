import type { Task, TaskAction } from '../../types';

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'load': {
      return Array.isArray(action.body) && action.body;
    }
    case 'add': {
      return [!Array.isArray(action.body) && action.body, ...tasks];
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

      const updatedTasks = tasks.map((task) => {
        if (task.id === target.id) {
          return target;
        }

        return task;
      });

      return updatedTasks;
    }
    case 'order': {
      switch (action.order) {
        case 'newest' : {
          console.log(tasks.sort((a, b) => a.id - b.id));
          return [...tasks].sort((a, b) => a.id - b.id)
        }
        case 'name': {
          console.log(tasks.sort((a, b) => a.id - b.id));
          return [...tasks].sort((a, b) => a.title.localeCompare(b.title));
        }
        case 'due date': {
          console.log(tasks.sort((a, b) => {
            const dateA = new Date(a.due_date).getTime()
            const dateB = new Date(b.due_date).getTime()
            return dateA - dateB
          }));
          
          return [...tasks].sort((a, b) => {
            if (a.due_date && b.due_date) {
              const dateA = new Date(a.due_date).getTime()
              const dateB = new Date(b.due_date).getTime()
              return dateA - dateB
            } else {
              return -1
            }
            
          })
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
