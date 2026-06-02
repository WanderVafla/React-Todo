import { useEffect, useState, type ChangeEvent } from "react";
import type { SortsOptions } from "../../types";
import { useTasksDispatch } from "../../hooks/useTasks";


const sortsOptions: SortsOptions[] = ['newest', 'due date', 'name']

export function SortPanel() {
    const tasksDispatch = useTasksDispatch();

    const [selectedOption, setSelectedOption] = useState<SortsOptions>(sortsOptions[0])
    useEffect(() => {
      tasksDispatch({
        type: 'order',
        order: selectedOption
      })
    }, [selectedOption])
    const handleSelectedOption = (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value as SortsOptions
      setSelectedOption(value)
      console.log(event.target.value)
    }
    
  return (
    <div id="todos-list-options">
      <label htmlFor="">undone:</label>
      <input type="checkbox" />

      <select name="sort-select" id="" onChange={handleSelectedOption}>
        {sortsOptions.map((sortOption) => <option key={sortOption}>{sortOption}</option>)}
      </select>
    </div>
  );
}