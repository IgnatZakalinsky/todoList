import React from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddNewItemForm from "./components/common/AddNewItemForm";
import {todoListAPI} from "./api/api";

class App extends React.Component {
    state = {
        todoList_s: [],
        isFetching: false
    };

    delete = () => {
        let newTasks = this.state.todoList_s;
        newTasks.pop();

        this.setState({
            todoList_s: newTasks
        }, () => this.saveState())
    };
    AddTodoListOld = (newText) => {
        let newTask = {
            id: this.state.todoList_s.reduce((acc, t) => {
                if (acc < t.id) return t.id; else return acc;
            }, 0) + 1,
            title: newText
        };
        let newTasks = [...this.state.todoList_s, newTask];
        this.setState({
            todoList_s: newTasks
        }, () => this.saveState());
    };
    addTodoList = (title) => {
        todoListAPI.createTodoList(title).then(res => {
                let todolist = res.data.data.item;//todolist, котоырй создался на серваке и вернулся нам
                this.setState({todoList_s: [...this.state.todoList_s, todolist]});
            });
    };
    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state', stateAsString);
    };
    restoreStateOld = () => {
        let state = {
            todoList_s: []
        };
        let stateAsString = localStorage.getItem('our-state');
        if (stateAsString != null) state = JSON.parse(stateAsString);
        this.setState(state, () => this.saveState());
    };


    restoreState = () => {
        this.setState({isFetching: true});
        todoListAPI.getTodoLists().then(res => {
                console.log(res.data);
                this.setState({todoList_s: res.data, isFetching: false})
            });
    };


    componentDidMount() {
        this.restoreState();
    }

    render = () => {
        const todoList_s = this.state.todoList_s.map(l => <TodoList id={l.id} title={l.title} key={l.id}/>);

        if (this.state.isFetching) return <img src={'https://vk.com/doc123795798_509829821'} alt={'preloader'}/>;
        return (
            <div>
                <AddNewItemForm delete={this.delete}
                                AddItem={this.addTodoList}/>
                <div className="app">
                    {todoList_s}
                </div>
            </div>
        );
    };
}

export default App;

