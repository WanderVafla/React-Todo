import { useEffect, useState, type ChangeEvent } from 'react';
import { TodoItem } from './TodoItem';
import { FiltersNames, OrderName } from '../../constants';
import type { SortOption, Task } from '../../types';
import { useFilter } from '../../hooks/useFilter';
import { useTodosStore } from '../../store';

const sortsOptions: SortOption[] = Object.values(OrderName);

export function TodoList() {
  const tasksOrigin = useTodosStore((state) => state.todos)
  const fetchTasks = useTodosStore((state) => state.getLoadTodos)

  const [sortState, setSortState] = useState<SortOption>(sortsOptions[0]);

  const tasks = sortTasks(tasksOrigin, sortState);
  const [filterState, setFilterState] = useFilter(FiltersNames);

  const handleSelectedOption = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SortOption;
    setSortState(value);
  };
  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])


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

function sortTasks(tasks: Task[], sortOption: SortOption) {
  return [...tasks].sort((a, b) => {
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
}
