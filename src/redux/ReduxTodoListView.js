import React from 'react';
import './../App.css';
import TodoListHeader from "./../components/header/TodoListHeader";
import TodoListTasks from "./../components/TodoListTasks/TodoListTasks";
import TodoListFooter from "./../components/footer/TodoListFooter";

const ReduxTodoListView = (props) => {
    return (
        <div className="todoList">
            <TodoListHeader AddTask={props.AddTask}
                            delete={props.delete}
                            title={props.title}/>
            <TodoListTasks tasks={props.tasks} deleteTask={props.deleteTask} id={props.id}
                           changeTitle={props.changeTitle}
                           onTaskStatusChanged={props.onTaskStatusChanged}/>
            <TodoListFooter filterValue={props.filterValue} onFilterChanged={props.onFilterChanged}/>
        </div>
    );
};

export default ReduxTodoListView;

