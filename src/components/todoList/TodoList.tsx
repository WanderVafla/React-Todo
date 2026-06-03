import { use, useEffect, useState } from 'react';
import { TodoItem } from './TodoItem';
import { sortTaks, tasksPromise } from '../../utils';
import { useTasks, useTasksDispatch } from '../../hooks/useTasks';
import { SortPanel } from './SortPanel';
import { FiltersNames, OrderName, TaskActionTypes } from '../../constants';
import type { FilterDoned, SortOption } from '../../types';

export function TodoList() {
  const tasksFromAPI = use(tasksPromise);
  const tasksDispatch = useTasksDispatch();
  const [filterTarget, setFilterTarget] = useState<FilterDoned>(
    Object.values(FiltersNames)[0],
  );
  const [sortState, setSortState] = useState<SortOption>(
    Object.values(OrderName)[0],
  );
  const tasks = sortTaks(useTasks(), sortState);

  useEffect(() => {
    tasksDispatch({
      type: TaskActionTypes.load,
      body: tasksFromAPI,
    });
  }, [tasksDispatch, tasksFromAPI]);

  return (
    <>
      {tasks.length > 0 ? (
        <div id="todos-list-border">
          <SortPanel onFilter={setFilterTarget} onSort={setSortState} />
          <hr />
          <div id="todos-list">
            {tasks
              .filter((task) => {
                if (filterTarget === FiltersNames.trueUp) return task.done;
                if (filterTarget === FiltersNames.falseDown) return !task.done;
                return true;
              })
              .map((task) => (
                <TodoItem key={task.id} task={task} />
              ))}
          </div>
        </div>
      ) : (
        'No task to complete.'
      )}
    </>
  );
}
