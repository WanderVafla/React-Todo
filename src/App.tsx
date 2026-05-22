import { TodoList } from './components/TodoList';
import './App.css';
import { FormAddTask } from './components/FormAddTask';
import { useState } from 'react';
import type { Task } from './types';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTasks = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };
  return (
    <>
      <div>Error Management Window (hidden)</div>
      <main>
        <h1>React Todos list</h1>
        <FormAddTask handlerTasks={handleTasks} />
        <TodoList tasks={tasks} setTasks={setTasks} />

        <button type="button">Delete All</button>
      </main>
    </>
  );
};

export default App;
