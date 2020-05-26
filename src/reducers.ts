import ReduxStateInterface from "./ReduxStateInterface";
import { Action, combineReducers } from "redux";
import ActionTypes, { ActionTodosSuccessInterface, ActionRemoveTodoSuccessInterface, ActionCompleteTodoSuccessInterface, ActionCreateTodoSuccessInterface } from "./actions";

const initialState: ReduxStateInterface = {
    todos: [],
    loading: false,
    error: false,
};

const reducers: Array<[ActionTypes, (state: ReduxStateInterface, action: Action<ActionTypes>) => ReduxStateInterface]> = [
    [ActionTypes.TODOS_REQUEST, state => ({ ...state, todos: [], error: false, loading: true })],
    [ActionTypes.TODOS_SUCCESS, (state, action: ActionTodosSuccessInterface) => {
        return { ...state, todos: action.todos, error: false, loading: false };
    }],
    [ActionTypes.TODOS_FAILURE, state => ({ ...state, todos: [], error: true, loading: false })],

    [ActionTypes.REMOVE_TODO_REQUEST, state => ({ ...state, error: false, loading: true })],
    [ActionTypes.REMOVE_TODO_SUCCESS, (state, action: ActionRemoveTodoSuccessInterface) => {
        return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload.todoId), error: false, loading: false };
    }],
    [ActionTypes.REMOVE_TODO_FAILURE, state => ({ ...state, error: true, loading: false })],
    
    [ActionTypes.COMPLETE_TODO_REQUEST, state => ({ ...state, error: false, loading: true })],
    [ActionTypes.COMPLETE_TODO_SUCCESS, (state, action: ActionCompleteTodoSuccessInterface) => {
        return { ...state, todos: state.todos.map(todo => ({
            ...todo,
            completed: todo.id === action.payload.todoId ? true : todo.completed,
        })), error: false, loading: false };
    }],
    [ActionTypes.COMPLETE_TODO_FAILURE, state => ({ ...state, error: true, loading: false })],
    
    [ActionTypes.CREATE_TODO_REQUEST, state => ({ ...state, error: false, loading: true })],
    [ActionTypes.CREATE_TODO_SUCCESS, (state, action: ActionCreateTodoSuccessInterface) => {
        return { ...state, todos: [...state.todos, { id: action.payload.todoId, title: action.payload.todoTitle }], error: false, loading: false };
    }],
    [ActionTypes.CREATE_TODO_FAILURE, state => ({ ...state, error: true, loading: false })],
];

function todosReducer(state = initialState, action: Action<ActionTypes>) {
    const reducer = reducers.find(([actionType]) => action.type === actionType);

    return reducer ? reducer[1](state, action) : initialState;
}

export default todosReducer;