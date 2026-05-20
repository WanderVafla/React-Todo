export function FormAddTask() {
  return (
    <form id="form-add-task">
      <input type="text" id="title-task-input" placeholder="Todo name ..." />
      <div id="form-task-content">
        <textarea
          id="description-area"
          placeholder="Desctiption ..."
        ></textarea>
        <div>
          <input type="submit" />
          <input type="date" />
        </div>
      </div>
    </form>
  );
}
