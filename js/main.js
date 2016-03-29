/**
 * Created by yzsoft on 16/3/29.
 */
import React from 'react';
import ReactDom from 'react-dom';
import Navbar from './page/navbar/navbar.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
ReactDom.render(<Navbar/>,document.getElementById('content'));