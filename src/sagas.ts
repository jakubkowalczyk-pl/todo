import { put, call, takeLatest, all } from 'redux-saga/effects';
import Actions, { todosRequest, todosSuccess, todosFailure, removeTodoSuccess, removeTodoFailure, ActionRemoveTodoRequestInterface, ActionCompleteTodoRequestInterface, completeTodoSuccess, completeTodoFailure, ActionCreateTodoRequestInterface, createTodoSuccess, createTodoFailure } from './actions';
import TodoInterface from './TodoInterface';

const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

function* watchTodosSaga() {
    yield takeLatest(Actions.TODOS_REQUEST, fetchTodos);
}

function* watchRemoveTodoSaga() {
    yield takeLatest(Actions.REMOVE_TODO_REQUEST, removeTodo);
}

function* watchCompleteTodoSaga() {
    yield takeLatest(Actions.COMPLETE_TODO_REQUEST, completeTodo);
}

function* watchCreateTodoSaga() {
    yield takeLatest(Actions.CREATE_TODO_REQUEST, createTodo);
}

function* fetchTodos() {
    try {
        const response = yield call(() => fetch(apiUrl));
        const todos: TodoInterface[] = yield call(() => response.json());
        yield put(todosSuccess(todos.slice(0, 10)));
    }
    catch(e) {
        yield put(todosFailure());
    }
}

function* removeTodo(action: ActionRemoveTodoRequestInterface) {
    try {
        yield call(() => fetch(apiUrl+action.payload.todoId, { method: 'DELETE' }));
        yield put(removeTodoSuccess(action.payload.todoId));
    }
    catch(e) {
        yield put(removeTodoFailure());
    }
}

function* completeTodo(action: ActionCompleteTodoRequestInterface) {
    try {
        yield call(() => fetch(apiUrl+action.payload.todoId, {
            method: 'PUT',
            body: JSON.stringify({
                completed: true,
            })
        }));
        yield put(completeTodoSuccess(action.payload.todoId));
    }
    catch(e) {
        yield put(completeTodoFailure());
    }
}

function* createTodo(action: ActionCreateTodoRequestInterface) {
    try {
        const response = yield call(() => fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({
                title: action.payload.todoTitle,
            })
        }));
        const data: { id: number } = yield call(() => response.json());
        yield put(createTodoSuccess(data.id, action.payload.todoTitle));
    }
    catch(e) {
        yield put(createTodoFailure());
    }
}

export default function* saga() {
    yield all([
        watchTodosSaga(),
        watchRemoveTodoSaga(),
        watchCompleteTodoSaga(),
        watchCreateTodoSaga(),
    ]);
}