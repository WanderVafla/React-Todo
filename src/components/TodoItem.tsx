import { useActionState, useState, type Dispatch } from 'react';
import type { ApiReturn, Task, TaskAction } from '../types';
import { useTasksDispatch } from '../hooks/useTasks';
import { deleteTask, patchTask } from '../api';

async function addNewTask(
  previousState: ApiReturn | null,
  formData: FormData,
  tasksDispatch: Dispatch<TaskAction>,
) {
  const taskTitle = formData.get('title') as string;
  const taskContent = formData.get('content') as string;
  const taskDue = formData.get('due') as string;

  const id = previousState.message;

  // const target: Task = Array.isArray(previousState.task)
  //       ? previousState.task[0]
  //       : previousState.task;

  const newTask: Partial<Task> = {
    title: taskTitle.trim() !== '' ? taskTitle : null,
    content: taskContent.trim() ? taskContent : null,
    due_date: taskDue !== '' ? taskDue : null,
    // done: false,
  };
  const response: ApiReturn = await patchTask(Number(id), newTask);

  if (response.success) {
    tasksDispatch({
      type: 'change',
      body: response.task,
    });
  }

  return {
    success: response.success,
    message: id,
    task: null,
  };
}

export function TodoItem({ task }: { task: Task }) {
  const [isChecked, setIsChecked] = useState(task.done);
  const [isEditing, setIsEdititng] = useState(false);
  const tasksDispatch = useTasksDispatch();

  const [state, formAction, _isPending] = useActionState(
    (previousState, formData) =>
      addNewTask(previousState, formData, tasksDispatch),
    {
      success: null,
      message: task.id,
      task: task,
    },
  );

  if (state.success === true) {
    setIsEdititng(false);
  }

  const handleChecked = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target.checked;
    setIsChecked(target);

    const response = await patchTask(task.id, { done: target });
    if (response.success) {
      tasksDispatch({
        type: 'change',
        body: task,
      });
    }
  };

  const remove = async () => {
    const response = await deleteTask(task.id);
    if (response.success) {
      tasksDispatch({
        type: 'delete',
        body: task,
      });
    }
  };

  const handleEditing = async () => {
    if (isEditing) {
      setIsEdititng(true);
      return;
    }
  };

  // const handleText = (
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   const target = event.target;
  //   const content = target.value;
  // };

  // return (
  //   <div className="todo-item">
  //     <span>
  //       <div>
  //         <input type="checkbox" checked={isChecked} onChange={handleChecked} />
  //         {isEditing
  //           ? <input type="text" value={task.title} />
  //           : <span>{task.title}</span>
  //         }
  //       </div>
  //       {isEditing
  //         ? <input type="date" value={task.due_date} />
  //         :  <span>{!task.due_date ? 'no date' : task.due_date}</span>
  //       }
  //       <div>
  //         {}
  //         <button type="button" onClick={handleEditing}>{isEditing ? 'Save' : 'Edit'}</button>
  //         <button type="button" onClick={remove}>
  //           Remove
  //         </button>
  //       </div>
  //     </span>
  //     {isEditing
  //       ? <textarea value={task.content}></textarea>
  //       :  <div>{task.content && task.content}</div>
  //     }
  //   </div>
  // );

  return (
    <>
      {!isEditing ? (
        <div className="todo-item">
          <span>
            <div>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChecked}
              />

              <span>{task.title}</span>
            </div>
            <span>{!task.due_date ? 'no date' : task.due_date}</span>
            <div>
              <button type="button" onClick={handleEditing}>
                Save
              </button>
              <button type="button" onClick={remove}>
                Remove
              </button>
            </div>
          </span>
          <div>{task.content && task.content}</div>
        </div>
      ) : (
        <form action={formAction}>
          <div className="todo-item">
            <span>
              <div>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleChecked}
                />
                <input type="text" name="title" />
              </div>
              <input type="date" name="due" />
              <div>
                <button type="submit" onClick={handleEditing}>
                  Edit
                </button>
                <button type="button" onClick={remove}>
                  Remove
                </button>
              </div>
            </span>

            <textarea name="content"></textarea>
          </div>
        </form>
      )}
    </>
  );
}
