import React ,{PropTypes,Component} from 'react';
import {AppBar} from 'material-ui';
import {show_left_menu} from './../../actions';
export default class  Navbar extends Component{
    handleTap(){
        console.log('tap');
       // console.log(this.props);
        let {dispatch}=this.props;
        dispatch(show_left_menu);
    }
    render(){
        return(
            <AppBar
                onLeftIconButtonTouchTap={this.handleTap.bind(this)}
                title="Title"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        )
    }
}
Navbar.propTypes={
    isShowLeftMenu:PropTypes.bool.isRequired
};

