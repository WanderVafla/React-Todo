import { getTasks } from './api';
import { OrderName } from './constants';
import type { SortOption } from './types';

export const tasksPromise = getTasks();

export function sortTaks(tasks, sortOption: SortOption) {
  tasks.sort((a, b) => {
    if (sortOption === OrderName.newest) {
      return b.id - a.id;
    }
    if (sortOption === OrderName.time) {
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    }
    if (sortOption === OrderName.name) {
      return a.title.localeCompare(b.title);
    }
  });

  return tasks;
}
