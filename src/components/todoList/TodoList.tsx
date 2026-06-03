import { use, useEffect, useState } from 'react';
import { TodoItem } from './TodoItem';
import { tasksPromise } from '../../utils';
import { useTasks, useTasksDispatch } from '../../hooks/useTasks';
import { SortPanel } from './SortPanel';
import { FiltersNames, TaskActionTypes } from '../../constants';
import type { FilterDoned } from '../../types';

export function TodoList() {
  const tasksDispatch = useTasksDispatch();
  const tasks = useTasks();
  const [filterTarget, setFilterTarget] = useState<FilterDoned>(
    Object.values(FiltersNames)[0],
  );

  const tasksFromAPI = use(tasksPromise);
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
          <SortPanel onFilter={setFilterTarget} />
          <hr />
          <div id="todos-list">
            {tasks
            .filter((task) => {
              if (filterTarget === FiltersNames.trueUp) return task.done;
              if (filterTarget === FiltersNames.falseDown) return !task.done
              return true
            })
            .map((task) => (
              <TodoItem key={task.id} task={task}/>
            )
              // if (filterTarget === FiltersNames.none) {
              //   return <TodoItem key={task.id} task={task} />;
              // }
              // if (filterTarget === FiltersNames.trueUp) {
              //   console.log(filterTarget);
              //   return task.done && <TodoItem key={task.id} task={task} />;
              // }
              // if (filterTarget === FiltersNames.falseDown) {
              //   console.log(filterTarget);
              //   return !task.done && <TodoItem key={task.id} task={task} />;
              // }
            )}
          </div>
        </div>
      ) : (
        'No task to complete.'
      )}
    </>
  );
}
