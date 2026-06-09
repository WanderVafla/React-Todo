export enum TaskActionTypes {
  add = 'add',
  load = 'load',
  delete = 'delete',
  change = 'change',
  order = 'order',
}

export const OrderName = {
  newest: 'newest',
  time: 'due',
  name: 'name',
};

export const FiltersNames = {
  none: 'None',
  trueUp: 'Completed',
  falseDown: 'Incomplete',
};

export const ErrorMessage = {
  missingTaksId: 'Task ID is missing',
  missingTaskTitle: 'You must provide a title',
  dateIsPassed: 'Date is passed or missing',
  missingAddNewTask:
    'A task is nod added. Please check your connection to Internet and try again!',
  missingEditTask:
    'A task modified is not saved. Please check your connection to Internet and try again!',
  missingDeleteTask:
    'A task is not be delete. Please check your connection to Internet and try again!',
  missingLoadTasks:
    'The tasks in be loading. Please check your connection to Internet and try again!',
  haveNotTasks: 'Have not the tasks in list!'
};

export const URLs = {
  todos: 'https://api.todos.in.jt-lab.ch/todos',
};
