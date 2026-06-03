import { use, useEffect, useState } from 'react';
import { TodoItem } from './TodoItem';
import { tasksPromise } from '../../utils';
import { useTasks, useTasksDispatch } from '../../hooks/useTasks';
import { SortPanel } from './SortPanel';
import { OrderDoned, TaskActionTypes } from '../../constants';
import type { SortDoned } from '../../types';

export function TodoList() {
  const tasksDispatch = useTasksDispatch();
  const tasks = useTasks();
  const [filterTarget, setFilterTarget] = useState<SortDoned>(
    Object.values(OrderDoned)[0],
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
            {tasks.map((task) => {
              if (filterTarget === OrderDoned.none) {
                return <TodoItem key={task.id} task={task} />;
              }
              if (filterTarget === OrderDoned.trueUp) {
                console.log(filterTarget);
                return task.done && <TodoItem key={task.id} task={task} />;
              }
              if (filterTarget === OrderDoned.falseDown) {
                console.log(filterTarget);
                return !task.done && <TodoItem key={task.id} task={task} />;
              }
            })}
          </div>
        </div>
      ) : (
        'No task to complete.'
      )}
    </>
  );
}
