/**
 * Created by yzsoft on 16/3/29.
 */
import React from 'react';
import {render} from 'react-dom';
import App from './app';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
let rootElement =document.getElementById('content');
render(
    <App/>,
    rootElement
);
//ReactDom.render(<Navbar onLeftTap={()=>console.log('left tap')}/>,document.getElementById('content'));