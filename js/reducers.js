let reducer = (state = {isShowLeftMenu: false}, action)=> {
    let isShow = state.isShowLeftMenu;
    switch (action.type) {
        case 'show_left_menu':
            return{isShowLeftMenu:!isShow};
        default:
            return state;
    }
};

export default reducer;