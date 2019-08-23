import React from 'react';
import './../App.css';
import TodoListHeader from "./../components/header/TodoListHeader";
import TodoListTasks from "./../components/TodoListTasks/TodoListTasks";
import TodoListFooter from "./../components/footer/TodoListFooter";
import {todoListAPI} from "../api/api";
import {connect} from "react-redux";
import ReduxTodoListView from "./ReduxTodoListView";
import {addTask, setTasks} from "./reducer";

class ReduxTodoList extends React.Component {
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
            this.props.addTask(res.data.data.item, this.props.id);
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
        let newTasks = this.props.tasks.map(t => {
            if (t.id !== taskId) return t;
            else return {...t, ...obj}
        });
        /////////////////////////////////////////////////////////////////
        this.props.setTasks(newTasks, this.props.id);
        /*this.setState({
            tasks: newTasks
        });*/
        //, () => this.saveState());
    };
    onTaskStatusChanged = (taskId, status) => {
        const task = this.props.tasks.find(t => t.id === taskId);
        todoListAPI.updateTask({...task, status: status}).then(res => {
            console.log(res);
            this.changeTasks(taskId, res.data.data.item)
        });

        //this.changeTasks(taskId, {isDone: isDone})
    };
    changeTitle = (taskId, title) => {
        const task = this.props.tasks.find(t => t.id === taskId);
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
            this.setState({isFetching: false});
            //this.props.setState({tasks: res.data.items, isFetching: false});
            this.props.setTasks(res.data.items, this.props.id);
        });
    };

    componentDidMount() {
        this.restoreState();
    }

    render = () => {
        let fixedTasks = this.props.tasks || [];

        if (this.state.isFetching) return <img src={'https://vk.com/doc123795798_509829821'} alt={'preloader'}/>;
        return (
            <ReduxTodoListView AddTask={this.AddTask} delete={this.deleteShift} title={this.props.title}
                               tasks={fixedTasks.filter(this.taskFilter)} changeTitle={this.changeTitle}
                               onTaskStatusChanged={this.onTaskStatusChanged} filterValue={this.state.filterValue}
                               onFilterChanged={this.onFilterChanged}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        //tasks: state.tasks[this.props.id]
    }
};

/*let mapDispatchToProps = (dispatch) => {
    return {
        addTask: (task, id) => {
            let action = {
                type: "ADD-TASK",
                id: id,
                task: task
            };
            dispatch(action);
        },
        setTasks: (tasks, id) => {
            let action = {
                type: "SET-TASKS",
                id: id,
                tasks: tasks
            };
            dispatch(action);
        }
    }
};*/

export default connect(mapStateToProps, {addTask, setTasks})(ReduxTodoList);

