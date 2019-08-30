import React from 'react';
import {connect} from "react-redux";
import {todoListAPI} from "../api/api";
import ReduxTodoList from "./ReduxTodoList";
import ReduxAppView from "./ReduxAppView";
import {addTodoList, createTodoList, deleteTodoList, getTodoLists, setTodoLists} from "./reducer";

class ReduxApp extends React.Component {

    state = {
        isFetching: false
    };

    addTodoList = (title) => {
        this.props.createTodoList(title);
        // todoListAPI.createTodoList(title).then(res => {
        //     let todolist = res.data.data.item;
        //     this.props.addTodoList(todolist);
        // });
    };

    restoreState = () => {
        this.props.getTodoLists();
        /*this.setState({isFetching: true});
        todoListAPI.getTodoLists().then(res => {
            console.log(res.data);
            this.setState({isFetching: false});
            this.props.setTodoLists({todoList_s: res.data})
        });*/
    };


    componentDidMount() {
        this.restoreState();
    }

    render() {
        const todoList_s = this.props.todoList_s.map(l => <ReduxTodoList id={l.id} title={l.title} key={l.id}
        tasks={this.props.tasks[l.id]} delete={() => this.props.deleteTodoList(l.id)}/>);

        if (this.props.isFetching) return <img src={'https://vk.com/doc123795798_509829821'} alt={'preloader'}/>;
        return <ReduxAppView addTodoList={this.addTodoList} todoList_s={todoList_s}/>
    }
}

let mapStateToProps = (state) => {
    return {
        todoList_s: state.todoList_s,
        tasks: state.tasks,
        isFetching: state.isFetching
    }
};

/*let mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: (todoList_s) => dispatch(addTodoList(todoList_s)),
        setTodoLists: (todoList_s) => dispatch(setTodoLists(todoList_s))
        setTodoLists: (id) => dispatch(getTodoLists),
    }
};*/

export default connect(mapStateToProps, {addTodoList, setTodoLists, getTodoLists, createTodoList, deleteTodoList})(ReduxApp);
