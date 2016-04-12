import React ,{Component} from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';

export default class LeftMenu extends Component{
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
    handleToggle(){
        this.setState({open: !this.state.open});
    }
    handleClose(){
        this.setState({open: false});
    }
}