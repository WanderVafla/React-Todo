import { useEffect, useState } from 'react';
import { TodoItem } from './TodoItem';
import { getTasks } from '../api';
import type { Task } from '../types'
import { SpinnerLoading } from './SpinnerLoading';


export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect( () => {
    const handleTasks = async () => {
      setTasks(await getTasks())
      setIsLoading(false)
    }
    handleTasks()
    
  }, [])
  return (
    <div id="todos-list-border">
      <SortPanel />
      <hr />
      <div id="todos-list">
        {isLoading && <SpinnerLoading /> }
        {tasks ? tasks.map(task => 
        <TodoItem 
        title={task.title} 
        content={task.content} 
        due={task.due} done={task.done} 
        />) : 
        "No task to complete."}
      </div>
    </div>
  );
}

function SortPanel() {
  return (
    <div id="todos-list-options">
      <label htmlFor="">undone:</label>
      <input type="checkbox" />

      <select name="sort-select" id="">
        <option value="">sort</option>
        <option value="due date">due date</option>
        <option value="name">name</option>
      </select>
    </div>
  );
}
