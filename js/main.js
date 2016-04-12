/**
 * Created by yzsoft on 16/3/29.
 */
import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './app';
import todoApp from './reducers';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
let store =createStore(todoApp);
let rootElement =document.getElementById('content');
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootElement
);
//ReactDom.render(<Navbar onLeftTap={()=>console.log('left tap')}/>,document.getElementById('content'));