export function FormAddTask() {
    return (
        <form id='form-add-task'>
            <input type="text" name="title-task-input" placeholder="Todo name ..." />
            <textarea name="description-area" placeholder="Desctiption ..."></textarea>
            <div>
                <input type="submit" />
                <input type="date" />
            </div>
        </form>
    )
}