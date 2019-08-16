import React from 'react';
import {connect} from "react-redux";
import AddNewItemForm from "../components/common/AddNewItemForm";
import TodoList from "../components/TodoList";
import {todoListAPI} from "../api/api";
import ReduxTodoList from "./ReduxTodoList";

class ReduxApp extends React.Component {

    state = {
        isFetching: false
    };

    addTodoList = (title) => {
        todoListAPI.createTodoList(title).then(res => {
            let todolist = res.data.data.item;
            this.props.addTodoList(todolist);
        });
    };

    restoreState = () => {
        this.setState({isFetching: true});
        todoListAPI.getTodoLists().then(res => {
            console.log(res.data);
            this.setState({isFetching: false});
            this.props.setTodoLists({todoList_s: res.data})
        });
    };


    componentDidMount() {
        this.restoreState();
    }

    render() {
        const todoList_s = this.props.todoList_s.map(l => <ReduxTodoList id={l.id} title={l.title} key={l.id}
        tasks={this.props.tasks[l.id]}/>);

        if (this.state.isFetching) return <img src={'https://vk.com/doc123795798_509829821'} alt={'preloader'}/>;
        return <div>
            <AddNewItemForm delete={this.props.delete} AddItem={this.addTodoList}/>
            {todoList_s}
        </div>
    }
}

let mapStateToProps = (state) => {
    return {
        todoList_s: state.todoList_s,
        tasks: state.tasks
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: (todoList_s) => {
            let action = {
                type: "ADD-TODO-LIST",
                todoList_s: todoList_s
            };
            dispatch(action);
        },
        setTodoLists: (todoList_s) => {
            let action = {
                type: "SET-TODO-LISTS",
                todoList_s: todoList_s
            };
            dispatch(action);
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxApp);
