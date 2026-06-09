import { TodoList } from './components/todoList/TodoList';
import './App.css';
import { FormAddTask } from './components/FormAddTask';
import { SpinnerLoading } from './components/SpinnerLoading';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/errorsElements/ErrorFallback';
import { ErrorFrame } from './components/errorsElements/ErrorFrame';

const App = () => {
  return (
    <>
      <ErrorFrame />
      <main>
        <h1>React Todos list</h1>
        <Suspense fallback={<SpinnerLoading />}>
          <FormAddTask />
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, info) => {
              console.error(error);
              console.info(info);
            }}
          >
            <TodoList />
          </ErrorBoundary>
        </Suspense>
        <button type="button">Delete All</button>
      </main>
    </>
  );
};

export default App;
