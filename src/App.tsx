import { TodoList } from './components/TodoList';
import './App.css';
import { FormAddTask } from './components/FormAddTask';
import { SpinnerLoading } from './components/SpinnerLoading';
import { TasksReducer } from './components/context/TasksProvider';
import { Suspense } from 'react';

const App = () => {
  return (
    <>
      <div>Error Management Window (hidden)</div>
      <main>
        <h1>React Todos list</h1>
        <TasksReducer>
          <FormAddTask />

          <Suspense fallback={<SpinnerLoading />}>
            <TodoList />
          </Suspense>
        </TasksReducer>
        <button type="button">Delete All</button>
      </main>
    </>
  );
};

export default App;
