import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';

const LeftMenu=React.createClass({
    getInitialState(){
        return{
            open:false
        }
    },
    handleToggle(){
        this.setState({open: !this.state.open});
    },
    handleClose(){
        this.setState({open: false});
    },
   render(){
       return(
           <LeftNav
               docked={false}
               width={200}
               open={this.state.open}
               onRequestChange={open => this.setState({open})}
           >
               <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
               <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
           </LeftNav>
       )
   }
});

module.exports=LeftMenu;