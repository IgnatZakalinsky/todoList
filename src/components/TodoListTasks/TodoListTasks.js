import React from 'react';
import '../../App.css';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        let tasksElements = this.props.tasks.map(
            task => <TodoListTask task={task} key={task.id} changeTitle={this.props.changeTitle}
                                  onTaskStatusChanged={this.props.onTaskStatusChanged}/>);

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

