import { use, useEffect, useState, type ChangeEvent } from 'react';
import { TodoItem } from './TodoItem';
import { sortTaks, tasksPromise } from '../../utils';
import { useTasks, useTasksDispatch } from '../../hooks/useTasks';
import { FiltersNames, OrderName, TaskActionTypes } from '../../constants';
import type { SortOption } from '../../types';
import { useFilter } from '../../hooks/useFilter';

const sortsOptions: SortOption[] = Object.values(OrderName);

export function TodoList() {
  const tasksFromAPI = use(tasksPromise);
  const tasksDispatch = useTasksDispatch();

  const [sortState, setSortState] = useState<SortOption>(
    Object.values(OrderName)[0],
  );
  
  const tasks = sortTaks(useTasks(), sortState);
  const [filterState, setFilterState] = useFilter(FiltersNames);

  const handleSelectedOption = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SortOption;
    setSortState(value);
  };

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
          <div id="todos-list-options">
            <label htmlFor="">done:</label>
            <button type="button" onClick={setFilterState}>
              {filterState}
            </button>

            <select
              name="sort-select"
              value={sortState}
              onChange={handleSelectedOption}
            >
              {sortsOptions.map((sortOption) => (
                <option key={sortOption}>{sortOption}</option>
              ))}
            </select>
          </div>
          <hr />
          <div id="todos-list">
            {tasks
              .filter((task) => {
                if (filterState === FiltersNames.trueUp) return task.done;
                if (filterState === FiltersNames.falseDown) return !task.done;
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
