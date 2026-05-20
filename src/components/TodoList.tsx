import { TodoItem } from './TodoItem';

export function TodoList() {
  return (
    <div id="todos-list-border">
      <SortPanel />
      <hr />
      <div id="todos-list">
        <TodoItem title={'Title'} content={'Description doto'} done={false} />
        <TodoItem title={'Title'} content={'Description doto'} done={false} />
        <TodoItem title={'Title'} done={true} />
        <TodoItem title={'Title'} content={'Description doto'} done={false} />
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
