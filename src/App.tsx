import { TodoList } from './components/todoList/TodoList';
import './App.css';
import { FormAddTask } from './components/FormAddTask';
import { SpinnerLoading } from './components/SpinnerLoading';
import { TasksProvider } from './components/context/TasksProvider';
import { Suspense } from 'react';

const App = () => {
  // const [filterTarget, setFilterTarget] = useState<SortDoned>(
  //   Object.values(OrderDoned)[0]
  // );
  return (
    <>
      <div>Error Management Window (hidden)</div>
      <main>
        <h1>React Todos list</h1>
        <TasksProvider>
          <Suspense fallback={<SpinnerLoading />}>
            <FormAddTask />
            <TodoList />
          </Suspense>
        </TasksProvider>
        <button type="button">Delete All</button>
      </main>
    </>
  );
};

export default App;
