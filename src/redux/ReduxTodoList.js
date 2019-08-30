import React from 'react';
import './../App.css';
import {connect} from "react-redux";
import ReduxTodoListView from "./ReduxTodoListView";
import {addTask, createTask, deleteTask, getTasks, setTasks, updateTask} from "./reducer";

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
        this.props.createTask(newText, this.props.id);
    };
    deleteShiftOld = () => {
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
        this.props.updateTask(this.props.tasks, taskId, {status}, this.props.id);
    };
    changeTitle = (taskId, title) => {
        this.props.updateTask(this.props.tasks, taskId, {title}, this.props.id);
        // const task = this.props.tasks.find(t => t.id === taskId);
        // todoListAPI.updateTask({...task, title: title}).then(res => {
        //     console.log(res);
        //     this.changeTasks(taskId, res.data.data.item)
        // });
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
        this.props.getTasks(this.props.id);
        /*this.setState({isFetching: true});
        todoListAPI.getTasks(this.props.id).then(res => {
            this.setState({isFetching: false});
            //this.props.setState({tasks: res.data.items, isFetching: false});
            this.props.setTasks(res.data.items, this.props.id);
        });*/
    };

    componentDidMount() {
        this.restoreState();
    }

    render = () => {
        let fixedTasks = this.props.tasks || [];

        if (this.props.isFetchings[this.props.id]) return <img src={'https://vk.com/doc123795798_509829821'}
                                                               alt={'preloader'}/>;

        return (
            <ReduxTodoListView AddTask={this.AddTask} title={this.props.title} id={this.props.id}
                               deleteTask={this.props.deleteTask}
                               tasks={fixedTasks.filter(this.taskFilter)} changeTitle={this.changeTitle}
                               onTaskStatusChanged={this.onTaskStatusChanged} filterValue={this.state.filterValue}
                               onFilterChanged={this.onFilterChanged} delete={this.props.delete}/>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isFetchings: state.isFetchings
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

export default connect(mapStateToProps, {
    addTask,
    setTasks,
    getTasks,
    createTask,
    updateTask,
    deleteTask
})(ReduxTodoList);

