import { useEffect, useState, type ChangeEvent } from "react";
import type { SortDoned, SortOption } from "../../types";
import { useTasksDispatch } from "../../hooks/useTasks";
import { OrderDoned, OrderName, TaskActionTypes } from "../../constants";

// This are the constants they not change!
const sortsDoned: SortDoned[] = Object.values(OrderDoned)
const sortsOptions: SortOption[] = Object.values(OrderName)
console.log(Object.values(OrderDoned));

let sortDonedTaskTarget = 0

export function SortPanel() {
  const tasksDispatch = useTasksDispatch();
  
  const [selectedOption, setSelectedOption] = useState<SortOption>(sortsOptions[0])
  const [stateOrederDoned, setStateOrderDoned] = useState<SortDoned>(sortsDoned[sortDonedTaskTarget])
  const handleStateOrderDoned = () => {
      sortDonedTaskTarget += 1
      if (sortDonedTaskTarget > 2) {
        sortDonedTaskTarget = 0
      }
      
      setStateOrderDoned(sortsDoned[sortDonedTaskTarget])
    }
    useEffect(() => {
      tasksDispatch({
        type: TaskActionTypes.order,
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
      <label htmlFor="">done:</label>
      <button type="button" onClick={handleStateOrderDoned}>
        {(()=> {
          if (stateOrederDoned === OrderDoned.none) return OrderDoned.none;
          if (stateOrederDoned === OrderDoned.trueUp) return OrderDoned.trueUp;
          if (stateOrederDoned === OrderDoned.falseDown) return OrderDoned.falseDown;
        })()} 
      </button>

      <select name="sort-select" id="" onChange={handleSelectedOption}>
        {sortsOptions.map((sortOption) => <option key={sortOption}>{sortOption}</option>)}
      </select>
    </div>
  );
}