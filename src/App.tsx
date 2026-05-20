import { TodoList } from './components/TodoList';
import './App.css';
import { FormAddTask } from './components/FormAddTask';

const App = () => {
  return (
    <>
      <div>Error Management Window (hidden)</div>
      <main>
        <h1>React Todos list</h1>
        <FormAddTask />
        <TodoList />

        <button type="button">Delete All</button>
      </main>
    </>
  );
};

export default App;
