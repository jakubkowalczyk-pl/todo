import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Todos from './Todos';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import todosReducer from './reducers';
import saga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(todosReducer, applyMiddleware(sagaMiddleware));

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Todos/>
        </Provider>,
        document.getElementById('root')
    );
};

sagaMiddleware.run(saga);
render();
store.subscribe(render);