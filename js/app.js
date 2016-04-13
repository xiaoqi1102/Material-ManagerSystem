/**
 * Created by yzsoft on 16/4/11.
 */
import React , {PropTypes,Component} from 'react';
import {connect,Provider} from 'react-redux';
import Navbar from './page/navbar/navbar.jsx';
import {showLeftMenu} from './actions';
import {createStore} from 'redux';
import  reducer from './reducers'
let store =createStore(reducer);
let mapStateToProps=(state)=>{
    return{isShowLeftMenu:state.isShowLeftMenu}
};
let Content =connect(mapStateToProps)(Navbar)
class App extends Component{
    render(){
       return(
           <Provider store={store}>
               <Content/>
           </Provider>
       )
    }
}


export default App;