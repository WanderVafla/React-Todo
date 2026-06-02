import { useEffect, useState, type ChangeEvent } from "react";
import type { SortDoned, SortOption } from "../../types";
import { useTasksDispatch } from "../../hooks/useTasks";


const sortDonedTask: SortDoned[] = [0, 1, 2] as const
// const sortsOptions: SortsOptions[] = ['newest', 'due date', 'name', ...sortDonedTask] as const
const sortsOptions: SortOption[] = ['newest', 'due date', 'name'] as const
let sortDonedTaskTarget: number = 0

export function SortPanel() {
    const tasksDispatch = useTasksDispatch();

    const [selectedOption, setSelectedOption] = useState<SortOption>(sortsOptions[0])
    const [stateOrederDoned, setStateOrderDoned] = useState<SortDoned>(sortDonedTask[sortDonedTaskTarget])
    const handleStateOrderDoned = () => {
      sortDonedTaskTarget += 1
      if (sortDonedTaskTarget > 2) {
        sortDonedTaskTarget = 0
      }
      // console.log(sortDonedTaskTarget);
      
      setStateOrderDoned(sortDonedTask[sortDonedTaskTarget])
    }
    useEffect(() => {
      tasksDispatch({
        type: 'order',
        order: {
          type: selectedOption, 
          doned: stateOrederDoned
        },
      })
    }, [selectedOption, stateOrederDoned])
    const handleSelectedOption = (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value as SortOption
      setSelectedOption(value)
      console.log(event.target.value)
    }
    
  return (
    <div id="todos-list-options">
      <label htmlFor="">undone:</label>
      <button type="button" onClick={handleStateOrderDoned}></button>

      <select name="sort-select" id="" onChange={handleSelectedOption}>
        {sortsOptions.map((sortOption) => <option key={sortOption}>{sortOption}</option>)}
      </select>
    </div>
  );
}