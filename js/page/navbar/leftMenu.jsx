import React ,{Component} from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import {show_left_menu} from './../../actions';
export default class LeftMenu extends Component{
    render(){
        let {isShowLeftMenu,dispatch}=this.props;
        return(
            <LeftNav
                docked={false}
                width={200}
                open={isShowLeftMenu}
                onRequestChange={() =>dispatch(show_left_menu)}
            >
                <MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item</MenuItem>
                <MenuItem onTouchTap={this.handleClose.bind(this)}>Menu Item 2</MenuItem>
            </LeftNav>
        )
    }
    handleToggle(){
        this.setState({open: !this.state.open});
    }
    handleClose(){
        //console.log(this.props);
        let {dispatch}=this.props;
        dispatch(show_left_menu,true);
    }
}