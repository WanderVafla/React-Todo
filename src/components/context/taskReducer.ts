import { OrderDoned, OrderName, TaskActionTypes } from '../../constants';
import type { SortDoned, Task, TaskAction } from '../../types';

export function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case TaskActionTypes.load: {
      return Array.isArray(action.body) && action.body;
    }
    case TaskActionTypes.add: {
      return [!Array.isArray(action.body) && action.body, ...tasks];
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
      switch (action.order.type) {
        case OrderName.newest : {
          // console.log(tasks.sort((a, b) => a.id - b.id));
          const orderedTasks = [...tasks].sort((a, b) => a.id - b.id)
          return sortTasksByDoned(action.order.doned, orderedTasks)
        }
        case OrderName.name: {
          console.log(tasks.sort((a, b) => a.id - b.id));
          const orderedTasks = [...tasks].sort((a, b) => a.title.localeCompare(b.title));
          return sortTasksByDoned(action.order.doned, orderedTasks)
        }
        case OrderName.time: { 
          const orderedTasks = [...tasks].sort((a, b) => {
            if (a.due_date && b.due_date) {
              const dateA = new Date(a.due_date).getTime()
              const dateB = new Date(b.due_date).getTime()
              return dateA - dateB
            } else {
              return -1
            }
            
          })
          return sortTasksByDoned(action.order.doned, orderedTasks)
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

function sortTasksByDoned(orderDoned: SortDoned, tasks: Task[]): Task[] {
  console.log(orderDoned, tasks);
  if (orderDoned === OrderDoned.trueUp) {
    return tasks.sort((a, b) => Number(b.done) - Number(a.done))
  } else if (orderDoned === OrderDoned.falseDown) {
    return tasks.sort((a, b) => Number(a.done) - Number(b.done))
  }
  return tasks
}
