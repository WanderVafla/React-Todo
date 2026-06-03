import { useEffect, useState, type ChangeEvent, type Dispatch } from 'react';
import type { SortDoned, SortOption } from '../../types';
import { useTasksDispatch } from '../../hooks/useTasks';
import { OrderDoned, OrderName, TaskActionTypes } from '../../constants';
import { useFilter } from '../../hooks/useFilter';

// This are the constants they not change!
const sortsOptions: SortOption[] = Object.values(OrderName);

export function SortPanel({ onFilter }: { onFilter: Dispatch<SortDoned> }) {
  const tasksDispatch = useTasksDispatch();
  // Custom hook for control state of filter button
  // Filter Button have 3 state:
  // None -> none filter
  // Complited -> only tasks complited
  // Uncomplited -> only tasks uncomplited
  const [state, setIncrement] = useFilter(OrderDoned);
  const [selectedOption, setSelectedOption] = useState<SortOption>(
    sortsOptions[0],
  );
  useEffect(() => {
    onFilter(state);
  }, [state, onFilter]);

  useEffect(() => {
    tasksDispatch({
      type: TaskActionTypes.order,
      order: selectedOption,
    });
  }, [selectedOption, tasksDispatch]);
  const handleSelectedOption = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SortOption;
    setSelectedOption(value);
    console.log(event.target.value);
  };

  return (
    <div id="todos-list-options">
      <label htmlFor="">done:</label>
      <button type="button" onClick={setIncrement}>
        {state}
      </button>

      <select name="sort-select" id="" onChange={handleSelectedOption}>
        {sortsOptions.map((sortOption) => (
          <option key={sortOption}>{sortOption}</option>
        ))}
      </select>
    </div>
  );
}
