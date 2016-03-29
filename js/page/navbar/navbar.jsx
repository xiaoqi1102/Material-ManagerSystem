import React from 'react';
//import AppBar from 'material-ui/lib/app-bar';
import {AppBar} from 'material-ui'
const Navbar =React.createClass({
    handleTap(){
        console.log('tap');
    },
    render(){
        return(
            <AppBar
                onLeftIconButtonTouchTap={this.handleTap}
                title="Title"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        )
    }
});

export default Navbar;