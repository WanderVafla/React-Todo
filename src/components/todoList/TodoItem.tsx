import { useActionState, useRef, useState } from 'react';
import type { Task } from '../../types';
import { ErrorMessage } from '../../constants';
import { isPassed } from '../../utiles';
import { useTodosStore } from '../../store';

export function TodoItem({ task }: { task: Task }) {
  const [isChecked, setIsChecked] = useState(task.done);

  const changeTask = useTodosStore((state) => state.changeTodo);
  const deleteTask = useTodosStore((state) => state.deleteTodo);

  const handleChecked = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.checked;
    setIsChecked(target);
    changeTask(task.id, { done: target });
  };

  const remove = () => {
    deleteTask(task.id);
  };

  return (
    <>
        <div className="todo-item">
            <div className='todo-item-header'>
            <span className='todo-item-title'>
            {task.title}
            </span>
            <div className='todo-item-data'>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChecked}
              />
              <span>{!task.due_date ? 'no date' : task.due_date}</span>
              <div>
                <EditModal taskName={task.title} due={task.due_date} content={task.content} taskId={task.id} />
                <button type="button" onClick={remove}>
                  Remove
                </button>
              </div>
            </div>
            </div>
            <div className='todo-iten-content'>
              {task.content}
          </div>
        </div>
    </>
  );
}


function EditModal({ taskName, due, content, taskId }: { taskName: string, due: string | null, content: string | null, taskId: number }) {
  const [_state, formAction, _isPending] = useActionState(
    updateTask, taskId,
  );

  const editModalRef = useRef<HTMLDialogElement | null>(null)
  const openEditModal = () => {
    if (editModalRef.current !== null) {
      editModalRef.current.showModal();
    }
  }

  const closeEditModal = () => {
    if (editModalRef.current !== null) {
      editModalRef.current.close();
    }
  }
  return (
    <>
    <button type='button' onClick={openEditModal}>Edit</button>
      
      <dialog ref={editModalRef}>
        <form action={formAction}>
          <div className="todo-item">
            <div className='todo-item-header'>
              
              <input type='text' name='title' defaultValue={taskName} />
              <div className='todo-item-data'>
                
              <input type='date' name='due' defaultValue={due} />
              <div>
                <button type="submit">
                  Save
                </button>
                <button type="button" onClick={closeEditModal}>
                  Cancel
                </button>
            </div>
              </div>
            <div className='todo-iten-content'>
              <textarea name='content' defaultValue={content} />
          </div>
            </div>
          </div>
        </form>
    </dialog>
    </>
  )
}

async function updateTask(
  previousState: number,
  formData: FormData,
): Promise<number> {
  const taskTitle = formData.get('title') as string | null;
  const taskContent = formData.get('content') as string | null;
  const taskDue = formData.get('due') as string | null;

  if (!previousState) {
    useTodosStore.getState().addError(ErrorMessage.missingTaksId);
    throw new Error(ErrorMessage.missingTaksId);
  }

  const id = previousState;

  if (taskDue && isPassed(taskDue)) {
    useTodosStore.getState().addError(ErrorMessage.dateIsPassed);
    return id;
  }

  if (taskTitle === null || taskTitle.trim() === '') {
    useTodosStore.getState().addError(ErrorMessage.missingTaskTitle);
    return id;
  }

  const newTask: Partial<Task> = {
    title: taskTitle,
    content: taskContent?.trim() ? taskContent : null,
    due_date: taskDue !== '' ? taskDue : null,
  };
  useTodosStore.getState().changeTodo(Number(id), newTask);

  return id;
}