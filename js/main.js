/**
 * Created by yzsoft on 16/3/29.
 */
import React from 'react';
import {render} from 'react-dom';
import App from './app';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {createStore} from 'redux';
import  reducer from './reducers'
let store =createStore(reducer);
import {Provider} from 'react-redux';
injectTapEventPlugin();
let rootElement =document.getElementById('content');
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootElement
);
//ReactDom.render(<Navbar onLeftTap={()=>console.log('left tap')}/>,document.getElementById('content'));