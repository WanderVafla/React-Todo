import { TodoList } from './components/todoList/TodoList';
import './App.css';
import { FormAddTask } from './components/FormAddTask';
import { SpinnerLoading } from './components/SpinnerLoading';
import { TasksProvider } from './components/context/TasksProvider';
import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/errorsElements/ErrorFallback';
import { ErrorFrame } from './components/errorsElements/ErrorFrame';
import { ErrorProvoder } from './components/errorsElements/context/ErrorProvider';
import { getTasks } from './api';

const App = () => {
  const [todosPromis] = useState(() => getTasks());

  return (
    <>
      <ErrorProvoder>
        <ErrorFrame />
        <main>
          <h1>React Todos list</h1>
          <TasksProvider>
            <Suspense fallback={<SpinnerLoading />}>
              <FormAddTask />
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onError={(error, info) => {
                  console.error(error);
                  console.info(info);
                }}
                onReset={() => {
                  console.log('reset');
                }}
              >
                <TodoList tasksPromise={todosPromis} />
              </ErrorBoundary>
            </Suspense>
          </TasksProvider>
          <button type="button">Delete All</button>
        </main>
      </ErrorProvoder>
    </>
  );
};

export default App;
