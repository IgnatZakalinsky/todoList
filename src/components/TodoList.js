import React from 'react';
import './../App.css';
import TodoListHeader from "./header/TodoListHeader";
import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListFooter from "./footer/TodoListFooter";
import {todoListAPI} from "../api/api";

class TodoList extends React.Component {
    state = {
        tasks: [],
        filterValue: 'All',
        isFetching: false
    };

    AddTaskOld = (newText) => {
        let newTask = {
            id: this.state.tasks.reduce((acc, t) => {
                if (acc < t.id) return t.id; else return acc;
            }, 0) + 1,
            title: newText,
            isDone: false,
            priority: 'medium'
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({
            tasks: newTasks
        }, () => this.saveState());
    };
    AddTask = (newText) => {
        todoListAPI.createTask(newText, this.props.id).then(res => {
            let newTask = res.data.data.item;//task, который создался на серваке и вернулся нам
            this.setState({tasks: [...this.state.tasks, newTask]});
        });

    };
    deleteShift = () => {
        let newTasks = this.state.tasks;
        newTasks.pop();

        this.setState({
            tasks: newTasks
        }, () => this.saveState())
    };

    onFilterChanged = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        }, () => this.saveState())
    };

    taskFilter = (t) => {
        switch (this.state.filterValue) {
            case 'All':
                return true;
            case 'Completed':
                return t.status == 2;
            case 'Active':
                return t.status != 2;
            default:
                alert('error! [' + this.state.filterValue + ']');
                return true;
        }
    };

    changeTasks = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) return t;
            else return {...t, ...obj}
        });
        this.setState({
            tasks: newTasks
        });
        //, () => this.saveState());
    };
    onTaskStatusChanged = (taskId, status) => {
        const task = this.state.tasks.find(t => t.id === taskId);
        todoListAPI.updateTask({...task, status: status}).then(res => {
            console.log(res);
            this.changeTasks(taskId, res.data.data.item)
        });

        //this.changeTasks(taskId, {isDone: isDone})
    };
    changeTitle = (taskId, title) => {
        const task = this.state.tasks.find(t => t.id === taskId);
        todoListAPI.updateTask({...task, title: title}).then(res => {
            console.log(res);
            this.changeTasks(taskId, res.data.data.item)
        });
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state-' + this.props.id, stateAsString);
    };
    restoreStateOld = () => {
        let state = {
            tasks: [],
            filterValue: 'All'
        };
        let stateAsString = localStorage.getItem('our-state-' + this.props.id);
        if (stateAsString != null) state = JSON.parse(stateAsString);
        this.setState(state, () => this.saveState());
    };
    restoreState = () => {
        this.setState({isFetching: true});
        todoListAPI.getTasks(this.props.id).then(res => {
            console.log(res.data);
            this.setState({tasks: res.data.items, isFetching: false});
        });
    };

    componentDidMount() {
        this.restoreState();
    }

    render = () => {
        if (this.state.isFetching) return <img src={'https://vk.com/doc123795798_509829821'} alt={'preloader'}/>;
        return (
            <div className="todoList">
                <TodoListHeader AddTask={this.AddTask}
                                delete={this.deleteShift}
                                title={this.props.title}/>
                <TodoListTasks tasks={this.state.tasks.filter(this.taskFilter)}
                               changeTitle={this.changeTitle}
                               onTaskStatusChanged={this.onTaskStatusChanged}/>
                <TodoListFooter filterValue={this.state.filterValue} onFilterChanged={this.onFilterChanged}/>
            </div>
        );
    }
}

export default TodoList;

