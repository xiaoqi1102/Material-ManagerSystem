/**
 * Created by yzsoft on 16/4/11.
 */
import React , {PropTypes,Component} from 'react';
import {connect} from 'react-redux';
import Navbar from './page/navbar/navbar.jsx';
import {showLeftMenu,addTodo, completeTodo, setVisibilityFilter, VisibilityFilters} from './actions';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
class App extends Component{
    render(){
        const {dispatch,visibleTodos} =this.props;
       return(
           <div>
               <Navbar onLeftTap={text =>dispatch(showLeftMenu(text))}/>
               <AddTodo
                   onAddClick={text =>
            dispatch(addTodo(text))
          } />
               <TodoList
                   todos={visibleTodos}
                   onTodoClick={index =>
            dispatch(completeTodo(index))
          } />
           </div>
       )
    }
}
App.propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    visibilityFilter: PropTypes.oneOf([
        'SHOW_ALL',
        'SHOW_COMPLETED',
        'SHOW_ACTIVE'
    ]).isRequired
}

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
}
export default connect(select)(App);