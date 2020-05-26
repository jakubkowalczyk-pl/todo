import TodoInterface from "./TodoInterface";

enum Actions {
    TODOS_REQUEST = 'TODOS_REQUEST',
    TODOS_SUCCESS = 'TODOS_SUCCESS',
    TODOS_FAILURE = 'TODOS_FAILURE',

    REMOVE_TODO_REQUEST = 'REMOVE_TODO_REQUEST',
    REMOVE_TODO_SUCCESS = 'REMOVE_TODO_SUCCESS',
    REMOVE_TODO_FAILURE = 'REMOVE_TODO_FAILURE',

    COMPLETE_TODO_REQUEST = 'COMPLETE_TODO_REQUEST',
    COMPLETE_TODO_SUCCESS = 'COMPLETE_TODO_SUCCESS',
    COMPLETE_TODO_FAILURE = 'COMPLETE_TODO_FAILURE',

    CREATE_TODO_REQUEST = 'CREATE_TODO_REQUEST',
    CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS',
    CREATE_TODO_FAILURE = 'CREATE_TODO_FAILURE',
}

export default Actions; 

export interface ActionRemoveTodoRequestInterface {
    type: Actions.REMOVE_TODO_REQUEST,
    payload: { todoId: number },
}

export interface ActionRemoveTodoSuccessInterface {
    type: Actions.REMOVE_TODO_SUCCESS,
    payload: { todoId: number },
}

export interface ActionCompleteTodoRequestInterface {
    type: Actions.COMPLETE_TODO_REQUEST,
    payload: { todoId: number },
}

export interface ActionCompleteTodoSuccessInterface {
    type: Actions.COMPLETE_TODO_SUCCESS,
    payload: { todoId: number },
}

export interface ActionTodosSuccessInterface {
    type: Actions.TODOS_SUCCESS,
    todos: TodoInterface[],
}

export interface ActionCreateTodoRequestInterface {
    type: Actions.CREATE_TODO_REQUEST,
    payload: { todoTitle: string },
}

export interface ActionCreateTodoSuccessInterface {
    type: Actions.CREATE_TODO_SUCCESS,
    payload: { todoId: number, todoTitle: string },
}

export const todosRequest = () => ({ type: Actions.TODOS_REQUEST });
export const todosSuccess = (todos: TodoInterface[]): ActionTodosSuccessInterface => ({ type: Actions.TODOS_SUCCESS, todos });
export const todosFailure = () => ({ type: Actions.TODOS_FAILURE });

export const removeTodoRequest = (todoId: number): ActionRemoveTodoRequestInterface =>
    ({ type: Actions.REMOVE_TODO_REQUEST, payload: { todoId } });
export const removeTodoSuccess = (todoId: number) => ({ type: Actions.REMOVE_TODO_SUCCESS, payload: { todoId } });
export const removeTodoFailure = () => ({ type: Actions.REMOVE_TODO_FAILURE });

export const completeTodoRequest = (todoId: number): ActionCompleteTodoRequestInterface =>
    ({ type: Actions.COMPLETE_TODO_REQUEST, payload: { todoId } });
export const completeTodoSuccess = (todoId: number) => ({ type: Actions.COMPLETE_TODO_SUCCESS, payload: { todoId } });
export const completeTodoFailure = () => ({ type: Actions.COMPLETE_TODO_FAILURE });

export const createTodoRequest = (todoTitle: string): ActionCreateTodoRequestInterface =>
    ({ type: Actions.CREATE_TODO_REQUEST, payload: { todoTitle } });
export const createTodoSuccess = (todoId: number, todoTitle: string): ActionCreateTodoSuccessInterface =>
    ({ type: Actions.CREATE_TODO_SUCCESS, payload: { todoId, todoTitle } });
export const createTodoFailure = () => ({ type: Actions.CREATE_TODO_FAILURE });