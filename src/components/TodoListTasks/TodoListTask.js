import React from 'react';
import s from './TodoListTask.module.css'

class TodoListTask extends React.Component {
    onIsDoneChanged = (e) => {
        //alert(e.currentTarget.checked);
        this.props.onTaskStatusChanged(this.props.task.id, e.currentTarget.checked == true ? 2 : 0);
    };

    state = {
        editMode: false,
        title: this.props.task.title
    };
    priority = ['Low', 'Midle', 'Hi', 'Urgently', 'Later'];

    activateEditMode = () => {
        this.setState({editMode: true});
    };
    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.changeTitle(this.props.task.id, this.state.title);
    };
    onTitleChange = (e) => {
        //this.props.changeTitle(this.props.task.id, e.currentTarget.value);
        this.setState({title: e.currentTarget.value});
    };

    render = () => {
        return (
            <div className={`todoList-task ${this.props.task.status == 2 ? s.cheked : undefined}`}>
                <input type="checkbox" checked={this.props.task.status == 2}
                       onChange={this.onIsDoneChanged}/>
                {this.state.editMode
                    ? <input autoFocus={true} value={this.state.title}
                             onChange={this.onTitleChange} onBlur={this.deactivateEditMode}/>
                    : <span onClick={this.activateEditMode}>{this.props.task.title}</span>}
                <span>, priority: {this.priority[this.props.task.priority]}</span>
            </div>
        )
    }
}

export default TodoListTask;

