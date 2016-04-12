import React ,{PropTypes,Component} from 'react';
//import AppBar from 'material-ui/lib/app-bar';
import {AppBar} from 'material-ui'
export default class  Navbar extends Component{
    handleTap(){
        console.log('tap');
    }
    render(){
        return(
            <AppBar
                onLeftIconButtonTouchTap={this.handleTap}
                title="Title"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        )
    }
}
Navbar.propTypes={
    onLeftTap:PropTypes.func.isRequired
};
