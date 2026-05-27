import { TodoList } from './components/TodoList';
import './App.css';
import { FormAddTask } from './components/FormAddTask';
import { SpinnerLoading } from './components/SpinnerLoading';
import { TasksProvider } from './components/context/TasksProvider';
import { Suspense } from 'react';

const App = () => {
  return (
    <>
      <div>Error Management Window (hidden)</div>
      <main>
        <h1>React Todos list</h1>
        <TasksProvider>
          <FormAddTask />

          <Suspense fallback={<SpinnerLoading />}>
            <TodoList />
          </Suspense>
        </TasksProvider>
        <button type="button">Delete All</button>
      </main>
    </>
  );
};

export default App;
