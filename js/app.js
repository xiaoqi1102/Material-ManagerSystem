/**
 * Created by yzsoft on 16/4/11.
 */
import React , {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import Navbar from './page/navbar/navbar.jsx';
import LeftMenu from './page/navbar/leftMenu.jsx'

let mapStateToProps=(state)=>{
    return{isShowLeftMenu:state.isShowLeftMenu}
};

class App extends Component{
    render(){
       return(
           <div>
               <Navbar {...this.props}/>
               <LeftMenu {...this.props}/>
           </div>
       )
    }
}


export default connect(mapStateToProps)(App);