/**
 * Created by yzsoft on 16/4/6.
 */
import React from 'react';
import {render} from 'react-dom';
import  {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './page/app';
import  todoApp from './reducers';

let store =createStore(todoApp);

let rootElement =document.getElementById('content');

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootElement
);