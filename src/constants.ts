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
