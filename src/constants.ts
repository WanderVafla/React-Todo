export enum TaskActionTypes {
    add = 'add',
    load = 'load',
    delete = 'delete',
    change = 'change',
    order = 'order',
}

export enum OrderName {
    newest = 'newest',
    time = 'due',
    name = 'name'
}

export enum OrderDoned {
    none = 'None',
    trueUp = 'Up',
    falseDown = 'Down',
}